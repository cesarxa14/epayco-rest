// src/clientes/entities/cliente.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  document: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;
}
