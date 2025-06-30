import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

// import * as fs from 'fs';
// const favicon = fs.readFileSync('./public/favicon.ico');
// fs.writeFileSync(
//   'data.json',
//   `data:image/x-icon;base64,${favicon.toString('base64')}`,
// );

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(path.join(__dirname, '..', 'public'));

  app.setGlobalPrefix('api');

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
    customfavIcon: '/favicon.ico',
    customSiteTitle: 'Cybele Nerve Centre API Docs',
  });

  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
