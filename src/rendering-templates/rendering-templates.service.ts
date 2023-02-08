import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Template } from '@prisma/client';
import { template } from 'handlebars';
import { type } from 'os';
import { PrismaService } from 'src/prisma.service';
import { AddTemplateDTO } from './dto/addTemplate.dto';
import { VerifyTemplateService } from './verify-template.service';

@Injectable()
export class RenderingTemplatesService {
  constructor(private prisma: PrismaService,private readonly verifier: VerifyTemplateService) {}

  async getTemplateBySchemaID(schemaID: string): Promise<Template[]> {
    try {
      return await this.prisma.template.findMany({
        where: { schema: schemaID },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getTemplateById(id: string): Promise<Template> {
    try {
      return await this.prisma.template.findUnique({
        where: { id: id },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async addTemplate(addTemplateDto: AddTemplateDTO): Promise<Template> {
    try {
      if(await this.verifier.verify(addTemplateDto.template, addTemplateDto.schema)){
        return await this.prisma.template.create({
          data: {
            schema: addTemplateDto.schema,
            template: addTemplateDto.template,
            type: addTemplateDto.type,
          },
        });
      }
      else{
        return {
          id: "",
        schema:  "",
        template: "",
        type:"Template-Schema mismatch. Please make sure template fields adhere to required schema fields."
        };
      }

      
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async updateTemplate(
    id: string,
    updateTemplateDto: AddTemplateDTO,
  ): Promise<Template> {
    try {
      return await this.prisma.template.update({
        where: { id: id },
        data: {
          schema: updateTemplateDto.schema,
          template: updateTemplateDto.template,
          type: updateTemplateDto.type,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
