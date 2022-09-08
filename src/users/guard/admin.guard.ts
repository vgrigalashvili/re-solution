import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
      return false;
    }
    if (request.user.role === 'admin') {
      return true;
    } else {
      return false;
    }
  }
}
