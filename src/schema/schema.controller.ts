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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VerifiableCredentialSchema } from '@prisma/client';
import { Cache } from 'cache-manager';

import { VCSchema } from 'src/types/VCSchema';
import { CreateCredentialDTO } from './dto/create-credentials.dto';
import { VCItem } from './entities/VCItem.entity';
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
  @ApiOperation({ summary: 'Create a new Verifiable Credential Schema' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
    type: VCItem,
  })
  getCredentialSchema(@Query() query) {
    console.log('id: ', query.id);
    return this.schemaService.credentialSchema({ id: query.id });
  }

  // TODO: Add role based guards here
  @Post()
  @ApiOperation({ summary: 'Create a new Verifiable Credential Schema' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: VCItem,
  })
  createCredentialSchema(
    @Body() body: CreateCredentialDTO,
  ): Promise<VerifiableCredentialSchema> {
    return this.schemaService.createCredentialSchema(body);
  }

  // TODO: Add role based guards here
  @Patch()
  @ApiOperation({ summary: 'Create a new Verifiable Credential Schema' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VCItem,
  })
  updateCredentialSchema(@Query() query, @Body() data: VCSchema) {
    console.log('id: ', query.id);
    console.log('body: ', data);
    return this.schemaService.updateCredentialSchema({
      where: { id: query.id },
      data,
    });
  }
}
