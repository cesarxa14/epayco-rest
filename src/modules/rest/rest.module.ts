import { Module } from '@nestjs/common';
import { RestController } from './rest.controller';
import { RestService } from './rest.service';
import { SoapService } from '../soap/soap.service';
import { SoapModule } from '../soap/soap.module';
import { MailService } from '../soap/mail/mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../soap/entities/customer';
import { Wallet } from '../soap/entities/wallet';
import { Transaction } from '../soap/entities/transaction';

@Module({
  imports: [
    SoapModule,
    TypeOrmModule.forFeature([Customer, Wallet, Transaction]), 
    
  ],
  controllers: [RestController],
  providers: [RestService, SoapService, MailService],
})
export class RestModule {}