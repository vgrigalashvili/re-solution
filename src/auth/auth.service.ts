/*
 *
 * auth Service.
 *
 */

// Dependencies.
import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  // @Service: User SignUp.
  async signUp(email: string, password: string) {
    // Check if email is in use.
    let user = await this.usersService.findByEmail(email);
    if (user) {
      throw new BadRequestException('email already taken!');
    }
    // Hash the users password.
    const hash = await argon.hash(password);
    // Create a new user and save.
    user = await this.usersService.create(email, hash);
    // Return the user.
    return user;
  }

  // @Service: User SignIn.
  async signIn(email: string, password: string) {
    // Find the user by email.
    const user = await this.usersService.findByEmail(email);
    // If user does not exist throw an exepton.
    if (!user) {
      throw new BadRequestException('Invalid credentials!');
    }
    // Compare passwords.
    const pwMatches = await argon.verify(user.password, password);
    // If password incorrect trow exeption.
    if (!pwMatches) {
      throw new BadRequestException('Invalid credentials!');
    }
    // Return the user.
    return this.signToken(user.id, user.email, user.role);
  }

  async signToken(
    userId: number,
    email: string,
    role: string,
  ): Promise<{ access_token: string }> {
    const payload = { id: userId, email: email, role: role };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return { access_token: token };
  }
}
