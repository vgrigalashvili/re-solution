import { Expose, Transform } from 'class-transformer';

export class UrlDto {
  @Expose()
  id: number;

  @Expose()
  url: string;

  @Expose()
  protocol: string;

  @Expose()
  method: string;

  @Expose()
  successCodes: number;

  @Expose()
  timeoutSeconds: number;

  @Expose()
  approved: boolean;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
