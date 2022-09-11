import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { UsersService } from '../users.service';

@Injectable()
export class UpdateGuard implements CanActivate {
  constructor(private usersService: UsersService) {}
  async canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();

    const id = await this.usersService.findById(parseInt(request.params.id));

    if (id === null) {
      throw new BadRequestException('User not found!');
    }

    if (!request.user) {
      return false;
    }

    if (request.user.id === id || request.user.role === 'admin') {
      return true;
    } else {
      return false;
    }
  }
}
