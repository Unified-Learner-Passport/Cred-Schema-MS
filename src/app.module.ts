import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchemaService } from './schema/schema.service';
import { SchemaModule } from './schema/schema.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [SchemaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, SchemaService],
})
export class AppModule {}
