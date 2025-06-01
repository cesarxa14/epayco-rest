// src/clientes/clientes.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { SoapService } from '../soap/soap.service';
import { CreateCustomerDto } from '../soap/dtos/create-cliente.dto';
import { RechargeWalletDto } from '../soap/dtos/recharge-balance.dto';
import { PayDto } from '../soap/dtos/pay.dto';
import { ConfirmPaymentDto } from '../soap/dtos/confirm-payment.dto';
import { CheckBalanceDto } from '../soap/dtos/check-balance.dto';
import { RestService } from './rest.service';

@Controller('rest')
export class RestController {
  constructor(private readonly restService: RestService) {}

  
  @Post('')
  async createCustomer(@Body() dto: CreateCustomerDto) {
    return this.restService.createCustomer(dto);
  }


  @Post('recharge')
  async recharge(@Body() dto: RechargeWalletDto) {
    return this.restService.rechargeWallet(dto);
  }

  @Post('pay')
  initPayment(@Body() dto: PayDto) {
    return this.restService.initPayment(dto);
  }

  @Post('confirm-payment')
  confirmPayment(@Body() dto: ConfirmPaymentDto) {
    return this.restService.confirmPayment(dto);
  }

  @Post('check-balance')
  checkBalance(@Body() dto: CheckBalanceDto) {
    return this.restService.checkBalance(dto);
  }
}
