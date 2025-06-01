// src/clientes/dto/recargar-billetera.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RechargeWalletDto {
  @IsNotEmpty()
  @IsString()
  document: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}
