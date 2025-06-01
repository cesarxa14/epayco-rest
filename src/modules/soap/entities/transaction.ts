import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wallet } from "./wallet";

// src/entities/transaction.entity.ts
@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  sessionId: string;

  @Column()
  token: string;

  @Column()
  amount: number;

  @Column()
  email: string;

  @ManyToOne(() => Wallet)
  wallet: Wallet;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ default: true })
  isTokenActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}

