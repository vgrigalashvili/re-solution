/*
 *
 * Users Controller.
 *
 */

// ! Dependencies.
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
import { JwtGuard, AdminGuard, UpdateGuard } from './guard';
import { CurrentUser } from './decorator';

@UseGuards(JwtGuard)
@Controller('api/v1/users')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}
  /**
   * * @Desc        : Get current user info.
   * * @Req. Data   : me
   * * @Route       : GET /api/v1/users/me
   * * @Access      : Private
   */
  @Get('/me')
  async getMe(@CurrentUser() user: UserDto) {
    return user;
  }

  // * @Desc        : Find user by id.
  // * @Req. Data   : id
  // * @Route       : GET /api/v1/users/:id
  // * @Access      : admin
  @UseGuards(AdminGuard)
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const user = await this.usersService.findById(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // * @Desc        : Find user by email.
  // * @Req. Data   : email.
  // * @Route       : GET /api/v1/users/?email=
  // * @Access      : admin.
  @UseGuards(AdminGuard)
  @Get()
  findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  // * @Desc        : Delete user
  // * @Req. Data   : id
  // * @Route       : DELETE /api/v1/users/:id
  // * @Access      : admin
  @UseGuards(AdminGuard)
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  // * @Desc        : Update user details.
  // * @Req. Data   : id && opt: email
  // * @Route       : PATCH /api/v1/users/:id
  // * @Access      : Admin / Private
  @UseGuards(UpdateGuard)
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
