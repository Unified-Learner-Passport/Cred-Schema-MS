import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, VerifiableCredentialSchema } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import schemas from './schemas';
import { validate } from '../utils/schema.validator';
import { DefinedError } from 'ajv';
import { VCSchema } from '../types/VCSchema';
import { CreateCredentialDTO } from './dto/create-credentials.dto';

@Injectable()
export class SchemaService {
  constructor(private readonly prisma: PrismaService) {}

  getSchema(fileName: string): JSON {
    if (Object.keys(schemas).indexOf(fileName) === -1) {
      throw new NotFoundException(
        `Resource ${fileName}.json does not exist on the server`,
      );
    }

    const data = schemas[fileName];
    return data;
  }

  async credentialSchemas(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.VerifiableCredentialSchemaWhereUniqueInput;
    where?: Prisma.VerifiableCredentialSchemaWhereInput;
    orderBy?: Prisma.VerifiableCredentialSchemaOrderByWithRelationInput;
  }): Promise<VerifiableCredentialSchema[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.verifiableCredentialSchema.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async credentialSchema(
    userWhereUniqueInput: Prisma.VerifiableCredentialSchemaWhereUniqueInput,
  ): Promise<VerifiableCredentialSchema | null> {
    return this.prisma.verifiableCredentialSchema.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createCredentialSchema(
    createCredentialDTO: CreateCredentialDTO,
  ): Promise<VerifiableCredentialSchema> {
    const data = createCredentialDTO.vcSchema;
    // verify the Credential Schema
    if (validate(data)) {
      // const schemaObject = JSON.parse(data.schema as string);
      return this.prisma.verifiableCredentialSchema.create({
        data: {
          id: data.id,
          type: data?.type as string,
          version: data.version,
          name: data.name as string,
          author: data.author as string,
          authored: data.authored,
          schema: data.schema as Prisma.JsonValue,
          proof: data?.proof as Prisma.JsonValue,
          tags: data?.tags as string[],
        },
      });
    } else {
      for (const err of validate.errors as DefinedError[]) {
        throw new Error(err.message);
      }
    }
  }

  async updateCredentialSchema(params: {
    where: Prisma.VerifiableCredentialSchemaWhereUniqueInput;
    data: VCSchema;
  }): Promise<VerifiableCredentialSchema> {
    const { where, data } = params;
    const currentSchema =
      await this.prisma.verifiableCredentialSchema.findUnique({
        where,
      });

    if (currentSchema) {
      if (validate(data)) {
        return this.prisma.verifiableCredentialSchema.update({
          where,
          data: {
            id: data.id,
            type: data?.type as string,
            version: data.version,
            name: data.name as string,
            author: data.author as string,
            authored: data.authored,
            schema: data.schema as Prisma.JsonValue,
            proof: data?.proof as Prisma.JsonValue,
            tags: data?.tags as string[],
          },
        });
      } else {
        for (const err of validate.errors as DefinedError[]) {
          throw new Error(err.message);
        }
      }
    } else {
      throw new Error('Credential Schema not found');
    }
  }
}
