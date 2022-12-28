import { ApiProperty } from '@nestjs/swagger';
import { VCSModelSchemaInterface } from 'src/types/VCModelSchema.interface';
import { VCItem } from '../entities/VCItem.entity';

export class CreateCredentialDTO {
  vcSchema: VCSModelSchemaInterface;
}
