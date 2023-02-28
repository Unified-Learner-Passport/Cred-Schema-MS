import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, VerifiableCredentialSchema } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import schemas from './schemas';
import { validate } from '../utils/schema.validator';
import { DefinedError } from 'ajv';
import { VCSModelSchemaInterface } from '../types/VCModelSchema.interface';
import { VCModelSchema } from './entities/VCModelSchema.entity';
import { CreateCredentialDTO } from './dto/create-credentials.dto';

@Injectable()
export class SchemaService {
  constructor(private readonly prisma: PrismaService) {}

  // getSchema(fileName: string): JSON {
  //   if (Object.keys(schemas).indexOf(fileName) === -1) {
  //     throw new NotFoundException(
  //       `Resource ${fileName}.json does not exist on the server`,
  //     );
  //   }

  //   return schemas[fileName];
  // }

  /*  async credentialSchemas(params: {
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
    }*/

  async credentialSchema(
    userWhereUniqueInput: Prisma.VerifiableCredentialSchemaWhereUniqueInput,
  ): Promise<VerifiableCredentialSchema> {

    const schema = await this.prisma.verifiableCredentialSchema.findUnique({
      where: userWhereUniqueInput,
    });

    if (schema) return schema;
    else throw new NotFoundException('Schema not found');
  }

  async createCredentialSchema(
    createCredentialDto: CreateCredentialDTO,
  ): Promise<VerifiableCredentialSchema> {
    // verify the Credential Schema
    const data = createCredentialDto.schema;
    const tags = createCredentialDto.tags;
    if (validate(data)) {
      try {
        // generate DID using identity MS

        return await this.prisma.verifiableCredentialSchema.create({
          data: {
            id: data.id,
            type: data?.type as string,
            version: data.version,
            name: data.name as string,
            author: data.author as string,
            authored: data.authored,
            schema: data.schema as Prisma.JsonValue,
            proof: data?.proof as Prisma.JsonValue,
            tags: tags as string[],
          },
        });
      } catch (err) {
        throw new BadRequestException(err.message);
      }
    } else {
      for (const err of validate.errors as DefinedError[]) {
        throw new BadRequestException(err.message);
      }
    }
  }

  async updateCredentialSchema(params: {
    where: Prisma.VerifiableCredentialSchemaWhereUniqueInput;
    data: VCSModelSchemaInterface;
  }): Promise<VerifiableCredentialSchema> {
    const { where, data } = params;
    const currentSchema =
      await this.prisma.verifiableCredentialSchema.findUnique({
        where,
      });
    if (currentSchema) {
      if (validate(data)) {
        try {
          return await this.prisma.verifiableCredentialSchema.update({
            where,
            data: {
              // not updating ID, since ID should not be changed
              type: data?.type as string,
              version: data.version,
              name: data.name as string,
              author: data.author as string,
              authored: data.authored,
              schema: data.schema as Prisma.JsonValue,
              proof: data?.proof as Prisma.JsonValue,
            },
          });
        } catch (err) {
          throw new BadRequestException(err.message);
        }
      } else {
        for (const err of validate.errors as DefinedError[]) {
          throw new BadRequestException(err.message);
        }
      }
    } else {
      throw new NotFoundException('Credential Schema not found');
    }
  }

  async getSchemaByTags(tags: string[]): Promise<VerifiableCredentialSchema[]> {
    console.log('tags in service: ', tags);
    return await this.prisma.verifiableCredentialSchema.findMany({
      where: {
        tags: {
          hasSome: [...tags],
        },
      },
    });
  }
}
