/*
 *
 * Users Services.
 *
 */

// Dependencies.
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  // @Service: Create user.
  async create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    // Check if this is the first user.
    const isFirstUser = await this.countUsers();

    // If first, set role to admin.
    isFirstUser === 0 ? (user.role = 'admin') : 'user';

    return this.repo.save(user);
  }

  // @Service: Count users.
  countUsers() {
    return this.repo.count();
  }

  // @Service: Find user by ID.
  findById(id: number) {
    return this.repo.findOne({ where: { id: id } });
  }

  // @Service: Find user by email.
  findByEmail(email: string) {
    return this.repo.findOne({ where: { email: email } });
  }

  // @Service: Update user details.
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  // @Service: Delete user.
  async remove(id: number) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return this.repo.remove(user);
  }
}
