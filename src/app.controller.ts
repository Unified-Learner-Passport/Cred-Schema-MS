import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // get the credential schema
  @Get()
  getCredentialSchema() {
    return this.appService.getCredentialSchema();
  }



}
