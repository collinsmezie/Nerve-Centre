// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Roles } from '../decorators/roles.decorator';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   // TypeScript
//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;

//     if (!user || !user.roles) {
//       // Handle the case where user or user.roles is undefined
//       return true;
//     }

//     // Your existing logic to check roles
//     return true;
//   }
// }
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

// Define a proper interface for the user
interface RequestUser {
  id: string;
  email: string;
  roles: string[];
}

// Interface to extend Express Request type
interface RequestWithUser extends Request {
  user?: RequestUser;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get required roles from the @Roles decorator
    const requiredRoles = this.reflector.get<string[]>(
      Roles,
      context.getHandler(),
    );

    // If no roles are required, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Get the request and user with proper typing
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    // If there's no user or the user has no roles, deny access
    if (!user || !Array.isArray(user.roles)) {
      return false;
    }

    // Check if the user has at least one of the required roles
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
