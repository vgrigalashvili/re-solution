/*
 *
 * Auth Controller.
 *
 */

// ! Dependencies.
import { Body, Controller, Post, Get } from '@nestjs/common';

import { CreateUserDto, UserDto } from '../users/dto';
import { AuthService } from './auth.service';
import { Serialize } from '../interceptors';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // * @Desc        : User signUp.
  // ! @Req. Data   : email, password.
  // ! @Route       : POST /api/v1/auth/signup.
  // * @Access      : Public.
  @Post('/signup')
  @Serialize(UserDto)
  signUp(@Body() body: CreateUserDto) {
    const { email, password } = body;
    const user = this.authService.signUp(email, password);
    return user;
  }

  // * @Desc        : User signIn.
  // ! @Req. Data   : email, password.
  // ! @Route       : POST /api/v1/auth/signin.
  // * @Access      : Public.
  @Post('/signin')
  async signIn(@Body() body: CreateUserDto) {
    const { email, password } = body;
    return await this.authService.signIn(email, password);
  }

  // * @Desc        : User signOut.
  // ! @Req. Data   : email, password.
  // ! @Route       : POST /api/v1/auth/signOut.
  // * @Access      : Public.
  // TODO: implement signOut method.
  @Get('/signout')
  async signOut(@Body() body: any) {
    console.log(body);
  }
}
