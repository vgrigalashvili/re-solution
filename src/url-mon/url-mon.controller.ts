import {
  Body,
  Controller,
  Post,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';

import { UrlMonService } from './url-mon.service';
import { CreateUrlDto } from './dto';
import { JwtGuard, AdminGuard } from '../users/guard';
import { CurrentUser } from '../users/decorator';
import { User } from '../users/user.entity';
import { UrlDto, ApproveUrlDto } from './dto';
import { Serialize } from '../interceptor';

@UseGuards(JwtGuard)
@Controller('api/v1/url-mon')
export class UrlMonController {
  constructor(private urlMonService: UrlMonService) {}

  @Post()
  @Serialize(UrlDto)
  createUrl(@Body() body: CreateUrlDto, @CurrentUser() user: User) {
    return this.urlMonService.addUrl(body, user);
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  approveUrl(@Param('id') id: number, @Body() body: ApproveUrlDto) {
    return this.urlMonService.approveUrl(id, body.approved);
  }
}
