export interface SchemaType {
  type: string;
  modelVersion: string;
  name: string;
  author: string;
  authored: string;
  schema: {
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
  proof: {
    created: string;
    creator: string;
    nonce: string;
    signatureValue: string;
    type: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
