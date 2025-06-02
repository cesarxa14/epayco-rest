import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PayDto {
  @IsNotEmpty({ message: 'Document is required' })
  @IsString()
  document: string;

  @IsNotEmpty({ message: 'Phone is required' })
  @IsString()
  phone: string;

  @IsNotEmpty({ message: 'Amount is required' })
  @IsNumber()
  amount: number;
}