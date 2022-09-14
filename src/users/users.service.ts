/*
 *
 * Users Services.
 *
 */

// ! Dependencies.
import { Injectable, NotFoundException } from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private config: ConfigService,
    private jwtService: JwtService,
  ) {}

  // * @Method  : Create user.
  async create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    // ! Check if this is the first user.
    const isFirstUser = await this.countUsers();

    // ! If first, set role to admin.
    isFirstUser === 0 ? (user.role = 'admin') : 'user';

    return this.repo.save(user);
  }

  // * @Method  : Count users.
  countUsers() {
    return this.repo.count();
  }

  // * @Method : Find user by ID.
  findById(id: number) {
    return this.repo.findOne({ where: { id: id } });
  }

  // * @Method : Find user by email.
  findByEmail(email: string) {
    return this.repo.findOne({ where: { email: email } });
  }

  // * @Method  : Update user details.
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    if (attrs.password) {
      attrs.password = await argon.hash(attrs.password);
    }

    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  // * @Method  : Delete user.
  async remove(id: number) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return this.repo.remove(user);
  }
}
