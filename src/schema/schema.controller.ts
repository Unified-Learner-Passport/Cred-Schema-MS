import { Controller, Get, Param } from '@nestjs/common';
import { SchemaService } from './schema.service';

@Controller('schema')
export class SchemaController {
  constructor(private readonly schemaService: SchemaService) {}

  @Get(':id')
  getSchema(@Param('id') id: string) {
    return this.schemaService.getSchema(id);
  }
}
