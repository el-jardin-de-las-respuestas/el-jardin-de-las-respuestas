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

  const isDev = process.env.ENVIRONMENT !== 'production';
  if (isDev) {
    console.log(`La app está corriendo en: http://localhost:${port}`);
  } else {
    console.log(`La app está corriendo en el puerto: ${port}`);
  }
}
bootstrap();
