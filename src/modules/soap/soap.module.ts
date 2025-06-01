import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoapService } from './soap.service';
import { MailService } from './mail/mail.service';
import { Customer } from './entities/customer';
import { Wallet } from './entities/wallet';
import { Transaction } from './entities/transaction';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    MailModule,
    TypeOrmModule.forFeature([Customer, Wallet, Transaction]), 
  ],
  controllers: [],
  providers: [SoapService, MailService],
})
export class SoapModule {}
