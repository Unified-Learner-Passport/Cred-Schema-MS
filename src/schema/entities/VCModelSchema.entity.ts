import { ApiProperty } from '@nestjs/swagger';
import { VCSchema } from 'src/types/VCSchema';

export class VCModelSchema implements VCSchema {
  @ApiProperty({ type: String, description: 'id' })
  type: string;
  @ApiProperty({ type: String, description: 'version' })
  version: string;
  @ApiProperty({ type: String, description: 'id' })
  id: string;
  @ApiProperty({ type: String, description: 'name' })
  name: string;
  @ApiProperty({ type: String, description: 'author' })
  author: string;
  @ApiProperty({ type: String, description: 'authored' })
  authored: string;
  @ApiProperty({ type: JSON, description: 'schema' })
  schema: {
    $id: string;
    $schema: string;
    description: string;
    name?: string;
    type: string;
    properties: {
      [k: string]: unknown;
    };
    required: [] | [string];
    additionalProperties: boolean;
    [k: string]: unknown;
  };
  proof?: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
