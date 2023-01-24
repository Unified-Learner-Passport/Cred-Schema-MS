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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { VerifiableCredentialSchema } from '@prisma/client';
import { Cache } from 'cache-manager';

import { VCSModelSchemaInterface } from 'src/types/VCModelSchema.interface';
import { CreateCredentialDTO } from './dto/create-credentials.dto';
import { VCItem } from './entities/VCItem.entity';
import { VCModelSchema } from './entities/VCModelSchema.entity';
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
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'name of the json schema files stored on the server',
  })
  @ApiOkResponse({ type: VCModelSchema })
  @ApiNotFoundResponse({
    status: 404,
    description:
      'The record with the passed query param id has not been found.',
  })
  getSchema(@Param('id') id: string) {
    return this.schemaService.getSchema(id);
  }

  // TODO: Add role based guards here
  @Get('/jsonld')
  @ApiQuery({ name: 'id', required: true, type: String })
  @ApiOperation({ summary: 'Get a Verifiable Credential Schema by id (did)' })
  @ApiOkResponse({
    status: 200,
    description: 'The record has been successfully created.',
    type: VCItem,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'The record has not been found.',
  })
  getCredentialSchema(@Query() query) {
    console.log('id: ', query.id);
    return this.schemaService.credentialSchema({ id: query.id });
  }

  @Get()
  @ApiQuery({ name: 'id', required: true, type: String })
  @ApiOperation({ summary: 'Get a Verifiable Credential Schema by id (did)' })
  @ApiOkResponse({
    status: 200,
    description: 'The record has been successfully created.',
    type: VCItem,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'The record has not been found.',
  })
  getCredentialSchemaByTags(@Query() query) {
    console.log('tags: ', query.tags);
    console.log('typeof tags: ', typeof query.tags);
    console.log(query.tags instanceof Array);
    return this.schemaService.getSchemaByTags(
      query.tags.slice(1, -1).split(','),
    );
  }

  // TODO: Add role based guards here
  @Post()
  @ApiOperation({ summary: 'Create a new Verifiable Credential Schema' })
  @ApiBody({
    type: VCModelSchema,
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: VCItem,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'There was some prioblem with the request.',
  })
  createCredentialSchema(
    @Body() body: CreateCredentialDTO,
  ): Promise<VerifiableCredentialSchema> {
    return this.schemaService.createCredentialSchema(body);
  }

  // TODO: Add role based guards here
  @Patch()
  @ApiQuery({ name: 'id', required: true, type: String })
  @ApiBody({
    type: VCModelSchema,
  })
  @ApiOperation({
    summary: 'Update a Verifiable Credential Schema by id (did)',
  })
  @ApiOkResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VCItem,
  })
  @ApiNotFoundResponse({
    status: 404,
    description:
      'The record with the passed query param id has not been found.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'There was some prioblem with the request.',
  })
  updateCredentialSchema(
    @Query() query,
    @Body() data: VCSModelSchemaInterface,
  ) {
    console.log('id: ', query.id);
    console.log('body: ', data);
    return this.schemaService.updateCredentialSchema({
      where: { id: query.id },
      data,
    });
  }
}
