/*
 *
 * Users Controller.
 *
 */

// Dependencies.
import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto, UserDto } from './dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors';
import { JwtGuard, AdminGuard } from './guard';
import { CurrentUser } from './decorator';

@UseGuards(JwtGuard)
@Controller('api/v1/users')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @desc        : Get current user info.
  // @Req. Data   : me
  // @route       : GET /api/v1/users/me
  // @access      : Private
  @Get('/me')
  async getMe(@CurrentUser() user: UserDto) {
    return user;
  }

  // @desc        : Find user by id.
  // @Req. Data   : id
  // @route       : GET /api/v1/users/:id
  // @access      : admin
  @UseGuards(AdminGuard)
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const user = await this.usersService.findById(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // @desc        : Find user by email.
  // @Req. Data   : email.
  // @route       : GET /api/v1/users/?email=
  // @access      : admin.
  @UseGuards(AdminGuard)
  @Get()
  findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  // @desc        : Delete user
  // @Req. Data   : id
  // @route       : DELETE /api/v1/users/:id
  // @access      : admin
  @UseGuards(AdminGuard)
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  // @desc        : Update user details.
  // @Req. Data   : id && opt: email || password
  // @route       : PATCH /api/v1/users/:id
  // @access      : Private
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
