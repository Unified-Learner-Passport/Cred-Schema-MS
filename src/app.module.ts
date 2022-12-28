import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchemaService } from './schema/schema.service';
import { SchemaModule } from './schema/schema.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SchemaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
      max: 1000,
    }), // using in memory cache for now
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, SchemaService],
})
export class AppModule {}
