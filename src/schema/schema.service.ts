import { Injectable } from '@nestjs/common';
import schemas from './schemas';

@Injectable()
export class SchemaService {
  getSchema(fileName: string) {
    const data = schemas[fileName];
    return data;
  }
}
