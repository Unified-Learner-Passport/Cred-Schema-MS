import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SchemaType } from 'src/types/SchemaType';
import { SchemaService } from './schema.service';

@Controller('schema')
export class SchemaController {
  constructor(private readonly schemaService: SchemaService) {}

  // this should be public
  @Get(':id')
  getSchema(@Param('id') id: string) {
    return this.schemaService.getSchema(id);
  }

  // TODO: Add role based guards here
  @Get()
  getCredentialSchema(@Query() query) {
    console.log('id: ', query.id);
    return this.schemaService.credentialSchema({ id: query.id });
  }

  // TODO: Add role based guards here
  @Post()
  createCredentialSchema(@Body() body: SchemaType) {
    return this.schemaService.createCredentialSchema(body);
  }

  // TODO: Add role based guards here
  @Patch()
  updateCredentialSchema(@Query() query, @Body() data: SchemaType) {
    console.log('id: ', query.id);
    console.log('body: ', data);
    return this.schemaService.updateCredentialSchema({
      where: { id: query.id },
      data,
    });
  }
}
