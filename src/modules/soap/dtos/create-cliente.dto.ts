// src/clientes/dto/create-cliente.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'Document is required' })
  @IsString()
  document: string;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Phone is required' })
  @IsString()
  phone: string;
}
