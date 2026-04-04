import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'http://localhost:3000',
    'https://el-jardin-de-las-respuestas.netlify.app',
    'https://jardinrespuestas.netlify.app',
  ];

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);

  const url = process.env.APP_URL ?? `http://localhost:${port}`;
  console.log(`La app está corriendo en: ${url}`);
}
bootstrap();
