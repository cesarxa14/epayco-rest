import { IsNotEmpty, IsString } from "class-validator";

export class ConfirmPaymentDto {
  @IsString()
  @IsNotEmpty({ message: 'Session ID is required' })
  sessionId: string;

  @IsString()
  @IsNotEmpty({ message: 'Token is required' })
  token: string;
}