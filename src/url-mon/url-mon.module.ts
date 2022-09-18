import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UrlMonController } from './url-mon.controller';
import { UrlMonService } from './url-mon.service';
import { Url } from './url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  controllers: [UrlMonController],
  providers: [UrlMonService],
})
export class UrlMonModule {}
