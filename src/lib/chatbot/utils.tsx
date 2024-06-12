const crypto = require('crypto');
// this generates a random 20 char string using upto the first 10 chars from the inputString.
// this is used to create a workspace id from workspace name so that the workspace namespace can be easily searchable amongst the pinecone vector database namespaces
export const createRandomWorkspaceIdFromName = (inputString: string) => {
  const alphanumericInput = inputString
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 10);
  const remainingLength = 20 - alphanumericInput.length;
  const randomBytes = crypto.randomBytes(remainingLength * 2);
  const randomAlphanumeric = randomBytes
    .toString('hex')
    .slice(0, remainingLength);
  const id = alphanumericInput + randomAlphanumeric;
  return id;
};
