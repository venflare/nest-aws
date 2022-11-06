import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;

  await app.listen(port);
};

bootstrap();
