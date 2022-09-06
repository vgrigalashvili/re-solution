/*
 *
 * Users Controller.
 *
 */

// Dependencies.
import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto, UpdateUserDto, UserDto } from './dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors';

@Controller('api/v1/auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @desc        : User signup.
  // @Req. Data   : email, password.
  // @route       : POST /api/v1/auth/signup.
  // @access      : Public.
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    this.usersService.create(email, password);
  }

  // @desc        : Find user by id.
  // @Req. Data   : id
  // @route       : GET /api/v1/auth/:id
  // @access      : Public
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findById(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // @desc        : Find user by email.
  // @Req. Data   : email.
  // @route       : GET /api/v1/auth?email=
  // @access      : Public.
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  // @desc        : Delete user
  // @Req. Data   : id
  // @route       : DELETE /api/v1/auth/:id
  // @access      : Public
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  // @desc        : Update user details.
  // @Req. Data   : id && opt: email || password
  // @route       : DELETE /api/v1/auth/:id
  // @access      : Public
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
