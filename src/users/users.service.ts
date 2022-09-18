/*
 *
 * Users Services.
 *
 */

// ! Dependencies.
import { Injectable, NotFoundException } from '@nestjs/common';
import * as argon from 'argon2';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private dataSource: DataSource, // ! To handle TypeORM transactions.
  ) {}

  // * @Method  : Create user.
  async create(email: string, password: string) {
    const user = this.userRepo.create({ email, password });

    // ! Check if this is the first user.
    const isFirstUser = await this.countUsers();

    // ! If first, set role to admin.
    isFirstUser === 0 ? (user.role = 'admin') : 'user';

    return this.userRepo.save(user);
  }

  // * @Method  : Count users.
  countUsers() {
    return this.userRepo.count();
  }

  // * @Method : Find user by ID.
  findById(id: number) {
    return this.userRepo.findOne({ where: { id: id } });
  }

  // * @Method : Find user by email.
  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email: email } });
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

    return this.userRepo.save(user);
  }

  // * @Method  : Delete user.
  async remove(id: number) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return this.userRepo.remove(user);
  }
}
