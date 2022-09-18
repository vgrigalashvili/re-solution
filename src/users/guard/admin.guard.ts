import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();

    // ! If no user return false.
    if (!request.user) {
      return false;
    }

    // ! If user role is Admin return true else return false.
    if (request.user.role === 'admin') {
      return true;
    } else {
      return false;
    }
  }
}
