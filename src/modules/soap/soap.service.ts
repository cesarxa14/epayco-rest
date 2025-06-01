// src/clientes/clientes.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer';
import { CreateCustomerDto } from './dtos/create-cliente.dto';
import { RechargeWalletDto } from './dtos/recharge-balance.dto';
import { Wallet } from './entities/wallet';
import { PayDto } from './dtos/pay.dto';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from './entities/transaction';
import { MailService } from './mail/mail.service';
import { CheckBalanceDto } from './dtos/check-balance.dto';


@Injectable()
export class SoapService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    @InjectRepository(Wallet)
    private readonly walletRepo: Repository<Wallet>,
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    private readonly mailService: MailService,
  ) {}

  async createCustomer(data: CreateCustomerDto): Promise<Customer> {
    try{
      const nuevoCliente = this.customerRepo.create(data);
      console.log('nuevo Cliente: ', nuevoCliente)
      return this.customerRepo.save(nuevoCliente);
    }catch(err){
      console.log('Error: ', err)
      throw new Error(err);
    }
    
  }



  async rechargeWallet(dto: RechargeWalletDto): Promise<string> {
    try{
      console.log('dto: ', dto)
       const customer = await this.customerRepo.findOne({
        where: { document: dto.document, phone: dto.phone },
      });

      console.log('customer', customer)
      if (!customer) {
        throw new Error('Customer not found');
      }

      let wallet = await this.walletRepo.findOne({ where: { customer: { id: customer.id } }, relations: ['customer'] });

      console.log('wallet', wallet)
      if (!wallet) {
        wallet = this.walletRepo.create({ customer, balance: 0 });
      }

      const rechargeAmount = Number(dto.value)

      console.log('rechargeAmount: ', rechargeAmount)
      wallet.balance = Number(wallet.balance) + rechargeAmount;
      console.log('wallet: ', wallet)
      await this.walletRepo.save(wallet);

      return `Recarga exitosa. Saldo actual: $${wallet.balance}`;
    }catch(err) {
      throw new Error(err)
    }
   
  }

  async initPayment(dto: PayDto) {
    try{
      const { document, phone, amount } = dto;
      const customer = await this.customerRepo.findOne({ where: { document, phone } });
      if (!customer) throw new Error('Customer not found');

      const wallet = await this.walletRepo.findOne({ where: { customer }, relations: ['customer'] });
      if (!wallet || wallet.balance < amount) throw new Error('Saldo insuficiente');

      const token = Math.floor(100000 + Math.random() * 900000).toString(); // 6 dígitos
      const sessionId = uuidv4();

      const transation = this.transactionRepo.create({
        sessionId,
        token,
        amount,
        email: wallet.customer.email,
        wallet,
      });

      console.log('transation', transation)
      await this.transactionRepo.save(transation);

      await this.mailService.sendTokenEmail(customer.email, token);

      return { message: `Token enviado al correo: ${wallet.customer.email}.`, sessionId };
    }catch(err) {
      console.log('Error: ', err)
      throw new Error(err);
    }
  
  }

  async confirmPayment(sessionId: string, token: string) {
    try{
      console.log('sessionId: ', sessionId)
      const trans = await this.transactionRepo.findOne({
        where: { sessionId, token },
        relations: ['wallet'],
      });

      console.log('trans: ', trans)
      if (!trans) throw new Error('Token inválido o sesión no encontrada');
      if (trans.confirmed) throw new Error('Transacción ya confirmada');

      const now = new Date();
      const expirationTime = new Date(trans.createdAt.getTime() + 15 * 60000);

      if (now > expirationTime) {
        trans.isTokenActive = false;
        await this.transactionRepo.save(trans);
        throw new Error('El token ha expirado');
      }

      const wallet = trans.wallet;

      if (wallet.balance < trans.amount) throw new Error('Saldo insuficiente');

      // Descontar y confirmar
      wallet.balance -= trans.amount;
      await this.walletRepo.save(wallet);

      trans.confirmed = true;
      await this.transactionRepo.save(trans);

      return { message: 'Pago exitoso' };
    }catch(err){
      throw new Error(err);
    }
    
  }

  async checkBalance(dto: CheckBalanceDto){
    try{
      const customer = await this.customerRepo.findOne({ where: { document: dto.document, phone: dto.phone } });

      if (!customer) {
        throw new Error('Customer not found');
      }

      const wallet = await this.walletRepo.findOne({ where: { customer }, relations: ['customer'] });
      if (!wallet) {
        throw new Error('Wallet not found');
      }

      return `Current balance: $${wallet.balance}`;

    }catch(err){
      throw new Error(err);
    }
  }

}
