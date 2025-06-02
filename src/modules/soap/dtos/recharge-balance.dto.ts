// src/clientes/dto/recargar-billetera.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RechargeWalletDto {
  @IsNotEmpty({ message: 'Document is required' })
  @IsString()
  document: string;

  @IsNotEmpty({ message: 'Phone is required' })
  @IsString()
  phone: string;

  @IsNotEmpty({ message: 'Value is required' })
  @IsNumber()
  value: number;
}
