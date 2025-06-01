import { Injectable } from "@nestjs/common";
import * as soap from 'soap';
import { CreateCustomerDto } from "../soap/dtos/create-cliente.dto";
import { RechargeWalletDto } from "../soap/dtos/recharge-balance.dto";
import { CheckBalanceDto } from "../soap/dtos/check-balance.dto";
import { PayDto } from "../soap/dtos/pay.dto";
import { ConfirmPaymentDto } from "../soap/dtos/confirm-payment.dto";

@Injectable()
export class RestService {
    private readonly soapUrl = 'http://localhost:3000/soap?wsdl';
    

    private async getSoapClient() {
        return await soap.createClientAsync(this.soapUrl);
    }

    async createCustomer(payload: CreateCustomerDto) {
      const client = await this.getSoapClient();
      console.log('cliente: ', client)
      const [result] = await client.createCustomerAsync(payload);
      return result;
    }

    async rechargeWallet(payload: RechargeWalletDto) {
      const client = await this.getSoapClient();
      console.log('cliente: ', client)
      const [result] = await client.rechargeWalletAsync(payload);
      return result;
    }

    async initPayment(payload: PayDto) {
      const client = await this.getSoapClient();
      console.log('cliente: ', client)
      const [result] = await client.initPaymentAsync(payload);
      return result;
    }

    async confirmPayment(payload: ConfirmPaymentDto) {
      console.log('payload: ', payload)
      const client = await this.getSoapClient();
      console.log('cliente: ', client)
      const [result] = await client.confirmPaymentAsync(payload);
      return result;
    }

    

    async checkBalance(payload: CheckBalanceDto) {
      const client = await this.getSoapClient();
      console.log('cliente: ', client)
      const [result] = await client.checkBalanceAsync(payload);
      return result;
    }

    
}