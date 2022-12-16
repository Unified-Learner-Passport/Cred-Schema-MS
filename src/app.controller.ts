import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // get the credential schema
  @Get()
  getCredentialSchema(
    @Param('id') id: Prisma.VerifiableCredentialSchemaWhereUniqueInput,
  ) {
    return this.appService.credentialSchema(id);
  }

  @Post()
  createCredentialSchema(
    @Body() body: Prisma.VerifiableCredentialSchemaCreateInput,
  ) {
    return this.appService.createCredentialSchema(body);
  }
}
