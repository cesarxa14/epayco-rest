// src/clientes/entities/billetera.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Customer)
  @JoinColumn()
  customer: Customer;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance: number;
}
