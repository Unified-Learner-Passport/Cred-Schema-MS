import { Body, ConsoleLogger, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AddTemplateDTO } from './dto/addTemplate.dto';
import { UpdateTemplateDTO } from './dto/updateTemplate.dto';
import { RenderingTemplatesService } from './rendering-templates.service';

@Controller('template')
export class RenderingTemplatesController {
  constructor(
    private readonly renderingTemplateService: RenderingTemplatesService,
  ) {}

  @Get(':schemaId')
  getTemplateBySchemaID(@Param('schemaId') schemaId: string) {
    return this.renderingTemplateService.getTemplateBySchemaID(schemaId);
  }

  @Get(':id')
  getTemplateById(@Param('id') id: string) {
    return this.renderingTemplateService.getTemplateById(id);
  }

  @Post()
  addTemplate(@Body() addTemplateDto: AddTemplateDTO) {
    return this.renderingTemplateService.addTemplate(addTemplateDto); 
  }

  @Put(':id')
  updateTemplate(@Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDTO) {
    return this.renderingTemplateService.updateTemplate(
      id,
      updateTemplateDto,
    );
  }
  @Delete(':id')
  deleteTemplate(@Param('id') id:string) {
    return this.renderingTemplateService.deleteTemplate(id);
  }
}
