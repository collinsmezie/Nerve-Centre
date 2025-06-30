import {
  MiddlewareConsumer,
  Module,
  NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersController } from './users/users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesModule } from './companies/companies.module';
import { AssetsModule } from './assets/assets.module';
import { ICEContactsModule } from './ice-contacts/ice-contact.module';
import { RolesGuard } from './common/guards/roles.guard';
import { DriversModule } from './drivers/drivers.module';
import { EventsModule } from './events/events.module';
import { GeoFenceModule } from './geo-fence/geo-fence.module';
import { GeoFenceGroupModule } from './geo-fence-group/geo-fence-group.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('DATABASE_URI') ||
          'mongodb://localhost:27017/cybele_dev',
      }),
    }),
    AuthModule,
    UsersModule,
    CompaniesModule,
    AssetsModule,
    ICEContactsModule,
    DriversModule,
    EventsModule,
    GeoFenceModule,
    GeoFenceGroupModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .forRoutes({ path: 'sessions', method: RequestMethod.POST });
      // .exclude(
      //   { path: 'sessions', method: RequestMethod.GET },
      //   { path: 'sessions/:id', method: RequestMethod.DELETE }
      // )
      .forRoutes(UsersController);
  }
}
