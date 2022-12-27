import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { SchemaService } from './schema/schema.service';
import { SchemaModule } from './schema/schema.module';

@Module({
  imports: [SchemaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, SchemaService],
})
export class AppModule {}
