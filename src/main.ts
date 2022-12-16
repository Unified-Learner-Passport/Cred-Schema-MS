import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// This application can suppor the following databases due to Prisma
// https://www.prisma.io/docs/reference/database-reference/supported-databases
