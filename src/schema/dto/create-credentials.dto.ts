import { ApiProperty } from '@nestjs/swagger';
import { VCSchema } from 'src/types/VCSchema';
import { VCItem } from '../entities/VCItem.entity';

export class CreateCredentialDTO {
  vcSchema: VCSchema;
}
