import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Template } from '@prisma/client';
import { template } from 'handlebars';
import { type } from 'os';
import { PrismaService } from 'src/prisma.service';
import { AddTemplateDTO } from './dto/addTemplate.dto';
import { TEMPLATE_STATUS } from './enums/templateStatus.enum';
import { ValidateTemplateService } from './validate-template.service';

@Injectable()
export class RenderingTemplatesService {
  constructor(private prisma: PrismaService,private readonly verifier: ValidateTemplateService) {}

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
      return await this.prisma.template.findFirst({
        where: {
            id: id,
            deleted: false,
        },
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
        throw new InternalServerErrorException("Template-Schema mismatch, please check if fields in the incoming template match the fields in corresponding schema")
      }

      
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async updateTemplate(
    id: string,
    updateTemplateDto: AddTemplateDTO,
  ): Promise<{'count': number}> { //returns the number of records affected by updatemany
    try {
      return await this.prisma.template.updateMany({
        where: {
          id: id,
          deleted: false,
        },
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
  async deleteTemplate(
    id: string
  ): Promise<Template> {
    try{
      const templateToBeDeleted = await this.prisma.template.findUnique({
        where: {
          id: id,
        }
      })
      if (templateToBeDeleted.deleted == true) {
        throw new HttpException('Record not found', HttpStatus.NOT_FOUND )
      }
      return await this.prisma.template.update({
        where: {
            id: id
        } ,
        data: {
          deleted: true,
        },
      })
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
