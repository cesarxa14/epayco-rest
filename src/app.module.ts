import { Module } from '@nestjs/common';
import { RestModule } from './modules/rest/rest.module';
import { SoapModule } from './modules/soap/soap.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './modules/soap/entities/customer';
import { Wallet } from './modules/soap/entities/wallet';
import { Transaction } from './modules/soap/entities/transaction';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RestModule,
    SoapModule,
    ConfigModule.forRoot({
      isGlobal: true, // Para que esté disponible en todo el proyecto
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Wallet, Customer, Transaction],
      synchronize: true, // En producción pon esto en false
    })
  ]
})
export class AppModule {}
