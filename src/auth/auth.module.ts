// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { UsersModule } from '../users/users.module';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
// import { JwtStrategy } from './jwt.strategy';
// import { AuthController } from './auth.controller';

// @Module({
//   imports: [
//     UsersModule,
//     PassportModule,
//     JwtModule.register({
//       secret: jwtConstants.secret,
//       signOptions: { expiresIn: '60s' },
//     }),
//   ],
//   providers: [AuthService, JwtStrategy],
//   exports: [AuthService],
//   controllers: [AuthController],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Access JWT_SECRET from environment
        // should expire in 1 day
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
