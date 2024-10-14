import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    
    if (!request.session || !request.session.user) {
      throw new UnauthorizedException('User not logged in');
    }
    
    const user = request.session.user;
      if (!user.isAdmin) {
      throw new ForbiddenException('User does not have admin privileges');
    }
    
    return true;
  }
}
