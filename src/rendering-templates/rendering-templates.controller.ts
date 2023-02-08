import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AddTemplateDTO } from './dto/addTemplate.dto';
import { UpdateTemplateDTO } from './dto/updateTemplate.dto';
import { RenderingTemplatesService } from './rendering-templates.service';
import { VerifyTemplateService } from './verify-template.service';

@Controller('rendering-template')
export class RenderingTemplatesController {
  constructor(
    private readonly renderingTemplateService: RenderingTemplatesService,
  ) {}

  @Get(':schemaId')
  getTemplateBySchemaID(@Param('schemaId') schemaId: string) {
    return this.renderingTemplateService.getTemplateBySchemaID(schemaId);
  }

  @Get()
  getTemplateById(@Query('id') id: string) {
    return this.renderingTemplateService.getTemplateById(id);
  }

  @Post()
  addTemplate(@Body() addTemplateDto: AddTemplateDTO, verifier: VerifyTemplateService) {
    if(verifier.verify(addTemplateDto.template, addTemplateDto.schema)){
      return this.renderingTemplateService.addTemplate(addTemplateDto);
    }
    else{
      return "Template could not be verified against Schema";
    }
  }

  @Put()
  updateTemplate(@Body() updateTemplateDto: UpdateTemplateDTO) {
    return this.renderingTemplateService.updateTemplate(
      updateTemplateDto.id,
      updateTemplateDto,
    );
  }
}
