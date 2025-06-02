
import { IsString, IsNotEmpty } from 'class-validator';

export class CheckBalanceDto {
  @IsString()
  @IsNotEmpty({ message: 'Document is required' })
  document: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;
}
