import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto';

@Controller('api/v1/auth')
export class UsersController {
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
  }
}
