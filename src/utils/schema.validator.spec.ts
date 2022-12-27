import { validate } from './schema.validator';

const samples = [
  {
    sample: {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://www.w3.org/2018/credentials/examples/v1',
        'https://playground.chapi.io/examples/alumni/alumni-v1.json',
        'https://w3id.org/security/suites/ed25519-2020/v1',
      ],
      type: ['VerifiableCredential', 'AlumniCredential'],
      issuer: {
        id: 'did:key:z6MkqYDbJ5yVgg5UvfRt5DAsk5dvPTgo6H9CZcenziWdHTqN',
      },
      name: 'Alumni Credential',
      description: 'The holder is an alumni of Example University.',
      issuanceDate: '2022-12-19T09:22:23.064Z',
      credentialSubject: {
        id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
        alumniOf: {
          identifier: 'did:example:c276e12ec21ebfeb1f712ebc6f1',
          name: 'Example University',
        },
      },
      id: 'https://playground.chapi.io/credential/O18Q1zJx0g81EKloPPQwo',
      proof: {
        type: 'Ed25519Signature2020',
        created: '2022-12-19T09:22:23Z',
        verificationMethod:
          'did:key:z6MkqYDbJ5yVgg5UvfRt5DAsk5dvPTgo6H9CZcenziWdHTqN#z6MkqYDbJ5yVgg5UvfRt5DAsk5dvPTgo6H9CZcenziWdHTqN',
        proofPurpose: 'assertionMethod',
        proofValue:
          'z5iBktnPCr3hPqN7FViY948ds5yMhrL1qujMmVD1GmzsbtXw5RUCdu4GKrQZw8U9c4G78SUNmPLTS87tz6kGAHgXB',
      },
    },
    isValid: false,
  },
  {
    sample: {
      type: 'https://w3c-ccg.github.io/vc-json-schemas/',
      version: '1.0',
      id: '06e126d1-fa44-4882-a243-1e326fbe21db',
      name: 'Email',
      author: 'did:example:MDP8AsFhHzhwUvGNuYkX7T',
      authored: '2021-01-01T00:00:00+00:00',
    },
    isValid: false,
  },
  {
    sample: {
      type: 'https://w3c-ccg.github.io/vc-json-schemas/',
      version: '1.1',
      id: 'did:example:MDP8AsFhHzhwUvGNuYkX7T/06e126d1-fa44-4882-a243-1e326fbe21db;version=1.1',
      name: 'Email',
      author: 'did:example:MDP8AsFhHzhwUvGNuYkX7T',
      authored: '2018-01-01T00:00:00+00:00',
      schema: {
        $id: 'email-schema-1.1',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        description: 'Email',
        type: 'object',
        properties: {
          emailAddress: {
            type: 'string',
            format: 'email',
          },
          backupEmailAddress: {
            type: 'string',
            format: 'email',
          },
        },
        required: ['emailAddress'],
        additionalProperties: false,
      },
    },
    isValid: true,
  },
  {
    sample: {
      type: 'https://w3c-ccg.github.io/vc-json-schemas/',
      version: '1.1',
      id: 'did:example:MDP8AsFhHzhwUvGNuYkX7T/06e126d1-fa44-4882-a243-1e326fbe21db;version=1.1',
      name: 'Email',
      author: 'did:example:MDP8AsFhHzhwUvGNuYkX7T',
      authored: '2018-01-01T00:00:00+00:00',
      schema: {
        $id: 'email-schema-1.1',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        description: 'Email',
        type: 'object',
        properties: {
          emailAddress: {
            type: 'string',
            format: 'email',
          },
          backupEmailAddress: {
            type: 'string',
            format: 'email',
          },
        },
        required: ['emailAddress'],
        additionalProperties: false,
      },
    },
    isValid: true,
  },
  {
    sample: {
      type: 'https://w3c-ccg.github.io/vc-json-schemas/',
      version: '1.0',
      id: 'did:example:MDP8AsFhHzhwUvGNuYkX7T/06e126d1-fa44-4882-a243-1e326fbe21db;version=1.0',
      name: 'Email',
      author: 'did:example:MDP8AsFhHzhwUvGNuYkX7T',
      authored: '2018-01-01T00:00:00+00:00',
      schema: {
        $id: 'email-schema-1.0',
        $schema: 'https://json-schema.org/draft/2020-12/schema',
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
    },
    isValid: true,
  },
];

describe('test schema validator', () => {
  it('schema examples', () => {
    samples.forEach((sample) => {
      expect(validate(sample.sample)).toEqual(sample.isValid);
    });
  });
});
