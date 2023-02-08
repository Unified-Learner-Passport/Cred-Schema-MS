import { Module } from '@nestjs/common';
import { RenderingTemplatesService } from './rendering-templates.service';
import { RenderingTemplatesController } from './rendering-templates.controller';
import { PrismaService } from 'src/prisma.service';
import { VerifyTemplateService } from './verify-template.service';

@Module({
  providers: [RenderingTemplatesService, PrismaService, VerifyTemplateService],
  controllers: [RenderingTemplatesController],
})
export class RenderingTemplatesModule {}
