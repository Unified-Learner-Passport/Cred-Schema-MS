import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { VerifiableCredentialSchema, Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  async credentialSchema(
    userWhereUniqueInput: Prisma.VerifiableCredentialSchemaWhereUniqueInput,
  ): Promise<VerifiableCredentialSchema | null> {
    return this.prisma.verifiableCredentialSchema.findUnique({
      where: userWhereUniqueInput,
    });
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

  async createCredentialSchema(
    data: Prisma.VerifiableCredentialSchemaCreateInput,
  ): Promise<VerifiableCredentialSchema> {
    // verify the Credential Schema
    const schemaObject = JSON.parse(data.schema as string);

    return this.prisma.verifiableCredentialSchema.create({
      data,
    });
  }

  async updateCredentialSchema(params: {
    where: Prisma.VerifiableCredentialSchemaWhereUniqueInput;
    data: Prisma.VerifiableCredentialSchemaUpdateInput;
  }): Promise<VerifiableCredentialSchema> {
    const { where, data } = params;
    const currentSchema =
      await this.prisma.verifiableCredentialSchema.findUnique({
        where,
      });
    if (currentSchema) {
      return this.prisma.verifiableCredentialSchema.create({
        data: {
          name: data.name as string,
          description: data.description as string,
          type: data.type as string,
          schema: data.schema as string,
          tags: data.tags as string[],
          version: currentSchema.version + 1,
        },
      });
    } else {
      throw new Error('Credential Schema not found');
    }
  }
}
