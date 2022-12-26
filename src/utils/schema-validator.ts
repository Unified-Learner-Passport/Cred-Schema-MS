import Ajv, { DefinedError } from 'ajv';

const ajv = new Ajv();

// link to schema:  https://w3c-ccg.github.io/vc-json-schemas/#credential_schema
const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    type: {
      type: 'string',
    },
    modelVersion: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    author: {
      type: 'string',
    },
    authored: {
      type: 'string',
    },
    schema: {
      type: 'object',
      properties: {
        $schema: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
        properties: {
          type: 'object',
        },
        required: {
          type: 'array',
          items: [
            {
              type: 'string',
            },
          ],
        },
        additionalProperties: {
          type: 'boolean',
        },
      },
      required: [
        '$schema',
        'description',
        'type',
        'properties',
        'required',
        'additionalProperties',
      ],
    },
    proof: {
      type: 'object',
      properties: {
        created: {
          type: 'string',
        },
        creator: {
          type: 'string',
        },
        nonce: {
          type: 'string',
        },
        signatureValue: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
      },
      required: ['created', 'creator', 'nonce', 'signatureValue', 'type'],
    },
  },
  required: [
    'type',
    'modelVersion',
    'name',
    'author',
    'authored',
    'schema',
    'proof',
  ],
};

export const validate = ajv.compile(schema);

const validExample = {
  type: 'https://w3c-ccg.github.io/vc-json-schemas/schema/1.0/schema.json',
  modelVersion: '1.0',
  id: 'did:work:MDP8AsFhHzhwUvGNuYkX7T;id=06e126d1-fa44-4882-a243-1e326fbe21db;version=1.0',
  name: 'EmailCredentialSchema',
  author: 'did:work:MDP8AsFhHzhwUvGNuYkX7T',
  authored: '2018-01-01T00:00:00+00:00',
  schema: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    description: 'Email',
    type: 'object',
    properties: {
      emailAddress: {
        type: 'string',
        format: 'email',
      },
    },
    required: ['emailAddress'],
    additionalProperties: false,
  },
  proof: {
    created: '2019-09-27T06:26:11Z',
    creator: 'did:work:MDP8AsFhHzhwUvGNuYkX7T#key-1',
    nonce: '0efba23d-2987-4441-998e-23a9d9af79f0',
    signatureValue:
      '2A7ZF9f9TWMdtgn57Y6dP6RQGs52xg2QdjUESZUuf4J9BUnwwWFNL8vFshQAEQF6ZFBXjYLYNU4hzXNKc3R6y6re',
    type: 'Ed25519VerificationKey2018',
  },
};

// const invalidExample = {
//   type: 'https://w3c-ccg.github.io/vc-json-schemas/schema/1.0/schema.json',
//   modelVersion: '1.0',
//   id: 'did:work:MDP8AsFhHzhwUvGNuYkX7T;id=06e126d1-fa44-4882-a243-1e326fbe21db;version=1.1',
//   name: 'EmailCredentialSchema',
//   author: 'did:work:abc123',
//   authored: '2018-01-01T00:00:00+00:00',
//   schema: {
//     $schema: 'http://json-schema.org/draft-07/schema#',
//     description: 'Email',
//     type: 'object',
//     properties: {
//       emailAddress: {
//         type: 'string',
//         format: 'email',
//       },
//       backupEmailAddress: {
//         type: 'string',
//         format: 'email',
//       },
//     },
//     required: ['emailAddress'],
//     additionalProperties: false,
//   },
// };

// const invalidExample = {
//   id: 'did:work:MDP8AsFhHzhwUvGNuYkX7T',
//   emailAddress: 'first.last@example.com',
// };

// const example = {
//   type: 'https://w3c-ccg.github.io/vc-json-schemas/schema/1.0/schema.json',
//   modelVersion: '1.0',
//   id: 'did:work:MDP8AsFhHzhwUvGNuYkX7T;id=06e126d1-fa44-4882-a243-1e326fbe21db;version=1.0',
//   name: 'EmailCredentialSchema',
//   author: 'did:work:MDP8AsFhHzhwUvGNuYkX7T',
//   authored: '2018-01-01T00:00:00+00:00',
//   schema: {
//     $schema: 'http://json-schema.org/draft-07/schema#',
//     description: 'Email',
//     type: 'object',
//     properties: {
//       emailAddress: {
//         type: 'string',
//         format: 'email',
//       },
//     },
//     required: ['emailAddress'],
//     additionalProperties: false,
//   },
// };

const example = {
  type: 'https://w3c-ccg.github.io/vc-json-schemas/schema/1.0/schema.json',
  modelVersion: '1.0',
  id: 'did:work:MDP8AsFhHzhwUvGNuYkX7T;id=06e126d1-fa44-4882-a243-1e326fbe21db;version=2.0',
  name: 'EmailCredentialSchema',
  author: 'did:work:MDP8AsFhHzhwUvGNuYkX7T',
  authored: '2018-01-01T00:00:00+00:00',
  schema: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    description: 'Email',
    type: 'object',
    properties: {
      emailAddress: {
        type: 'string',
        format: 'email',
      },
      firstName: {
        type: 'string',
      },
      backupEmailAddress: {
        type: 'string',
        format: 'email',
      },
    },
    required: ['emailAddress', 'firstName'],
    additionalProperties: false,
  },
};

// validate(validExample) ? console.log('valid') : console.log('invalid');
// validate(invalidExample) ? console.log('valid') : console.log('invalid');

// if (validate(validExample)) {
//   console.log('valid');
// } else {
//   for (const err of validate.errors as DefinedError[]) {
//     console.log(err);
//   }
// }

// if (validate(example)) {
//   console.log('valid');
// } else {
//   for (const err of validate.errors as DefinedError[]) {
//     console.log(err);
//   }
// }

// console.log(serialize(validExample));
// console.log(serialize(invalidExample));
