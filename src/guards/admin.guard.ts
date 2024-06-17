import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    
    // Check if the user session exists
    if (!request.session || !request.session.user) {
      throw new UnauthorizedException('User not logged in');
    }
    
    const user = request.session.user;
    
    // Check if the user has an admin role
    if (!user.isAdmin) {
      throw new ForbiddenException('User does not have admin privileges');
    }
    
    return true;
  }
}
