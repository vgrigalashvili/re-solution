import { IsArray, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsUrl()
  url: string;

  @IsString()
  protocol: string;

  @IsString()
  method: string;

  @IsArray()
  successCodes: number;

  @IsNumber()
  timeoutSeconds: number;
}
