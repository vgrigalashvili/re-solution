import { IsBoolean } from 'class-validator';

export class ApproveUrlDto {
  @IsBoolean()
  approved: boolean;
}
