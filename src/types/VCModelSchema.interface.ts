// export interface VCSModelSchemaInterface {
//   type: string;
//   version: string;
//   id: string;
//   name: string;
//   author: string;
//   authored: string;
//   schema: {
//     $id: string;
//     $schema: string;
//     description: string;
//     name?: string;
//     type: string;
//     properties: {
//       [k: string]: unknown;
//     };
//     required: [] | [string];
//     additionalProperties: boolean;
//   };
//   proof?: {
//     [k: string]: unknown;
//   };
// }

import { Status } from "@prisma/client";

//For adhereing to docs

export interface VCSModelSchemaInterface {
  schema: {
    type: string;
    version: string;
    id: string;
    name: string;
    author: string;
    authored: string;
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
    };
  };
  tags: [] | [string];
  status: Status 
}



