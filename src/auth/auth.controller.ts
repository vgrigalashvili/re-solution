/*
 *
 * Auth Controller.
 *
 */

// Dependencies.
import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto, UserDto } from '../users/dto';
import { AuthService } from './auth.service';
import { Serialize } from '../interceptors';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @desc        : User signup.
  // @Req. Data   : email, password.
  // @route       : POST /api/v1/auth/signup.
  // @access      : Public.
  @Post('/signup')
  @Serialize(UserDto)
  signUp(@Body() body: CreateUserDto) {
    const { email, password } = body;
    const user = this.authService.signUp(email, password);
    return user;
  }

  // @desc        : User signup.
  // @Req. Data   : email, password.
  // @route       : POST /api/v1/auth/signin.
  // @access      : Public.
  @Post('/signin')
  async signIn(@Body() body: CreateUserDto) {
    const { email, password } = body;
    return await this.authService.signIn(email, password);
  }
}
