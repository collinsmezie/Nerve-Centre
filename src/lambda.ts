import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

const BASE64_FAVICON =
  'data:image/x-icon;base64,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';

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
  const expressApp = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.useStaticAssets(path.join(__dirname, '..', 'public'));

  // Keep the same configuration as your main.ts
  app.setGlobalPrefix('api');

  // Swagger setup (optional in Lambda, but keeping for consistency)
  // ✅ Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Cybele Nerve Centre API')
    .setDescription(
      'This API provides a comprehensive backend for managing fleet data, including vehicles, drivers, routes, and real-time tracking. It supports secure authentication, CRUD operations, and integration with IoT/GPS devices. Built with NestJS and designed for scalability and performance.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customCss: `.topbar { display: none; }`,
    customfavIcon: BASE64_FAVICON, //'/favicon.ico',
    customSiteTitle: 'Cybele Nerve Centre API Docs',
  });

  // CORS settings
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.init();

  // eslint-disable-next-line
  return createServer(expressApp);
}

export const handler: Handler = async (event: any, context: Context) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  // eslint-disable-next-line
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
