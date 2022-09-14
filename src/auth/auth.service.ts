/*
 *
 * auth Service.
 *
 */

// ! Dependencies.
import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private config: ConfigService,
    private jwt: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  // * @Method: User SignUp.
  async signUp(email: string, password: string) {
    // ! Check if email is in use.
    let user = await this.usersService.findByEmail(email);
    if (user) {
      throw new BadRequestException('Email already taken!');
    }
    // ! Hash the users password.
    const hash = await argon.hash(password);

    // ! Create a new user and save.
    user = await this.usersService.create(email, hash);

    // Temporary, for testing purposes.
    this.mailerService
      .sendMail({
        to: user.email, // list of receivers
        // text: 'Welcome to re:solution', // plaintext body
        html: '<b>Welcome to re:solution</b>', // HTML body content
      })
      .then(() => {
        console.log('Success');
      })
      .catch((ex) => {
        console.log('Error:', ex);
      });

    return user;
  }

  // * @Method: User SignIn.
  async signIn(email: string, password: string) {
    // ! Find the user by email.
    const user = await this.usersService.findByEmail(email);

    // ! If user does not exist throw an exception.
    if (!user) {
      throw new BadRequestException('Invalid credentials!');
    }

    // ! Compare passwords.
    const pwMatches = await argon.verify(user.password, password);

    // ! If password incorrect trow exception.
    if (!pwMatches) {
      throw new BadRequestException('Invalid credentials!');
    }
    // ! Return the users signed token.
    return this.signToken(user.id, user.email, user.role);
  }

  // * @Method: signToken.
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
