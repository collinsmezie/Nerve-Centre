import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // Import ConfigService
import { UsersService } from 'src/users/users.service';

// Define interface for JWT payload
interface JwtPayload {
  sub: string;
  email: string;
  roles: string[];
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') as string, // Use ConfigService to get JWT_SECRET
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOneBy(payload.sub);
    return { userId: payload.sub, email: payload.email, roles: user.roles };
  }
}
