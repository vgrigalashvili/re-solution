import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Url } from './url.entity';
import { CreateUrlDto } from './dto';
import { User } from '../users/user.entity';

@Injectable()
export class UrlMonService {
  constructor(
    @InjectRepository(Url) private urlRepo: Repository<Url>,
    private dataSource: DataSource, // ! To handle TypeORM transactions.
  ) {}

  addUrl(urlDto: CreateUrlDto, user: User) {
    const url = this.urlRepo.create(urlDto);

    url.user = user;

    return this.urlRepo.save(url);
  }

  async approveUrl(id: number, approved: boolean) {
    const url = await this.urlRepo.findOne({ where: { id: id } });
    if (!url) {
      throw new NotFoundException('URL with the given id does not exist!');
    }
    url.approved = approved;
    return this.urlRepo.save(url);
  }
}
