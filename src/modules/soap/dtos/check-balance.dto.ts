
import { IsString, IsNotEmpty } from 'class-validator';

export class CheckBalanceDto {
  @IsString()
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
