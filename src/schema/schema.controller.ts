import {
  Body,
  CacheInterceptor,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

import { VCSchema } from 'src/types/VCSchema';
import { SchemaService } from './schema.service';

@Controller('schema')
@UseInterceptors(CacheInterceptor)
export class SchemaController {
  constructor(
    private readonly schemaService: SchemaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

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
  createCredentialSchema(@Body() body: VCSchema) {
    return this.schemaService.createCredentialSchema(body);
  }

  // TODO: Add role based guards here
  @Patch()
  updateCredentialSchema(@Query() query, @Body() data: VCSchema) {
    console.log('id: ', query.id);
    console.log('body: ', data);
    return this.schemaService.updateCredentialSchema({
      where: { id: query.id },
      data,
    });
  }
}
