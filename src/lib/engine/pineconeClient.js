import { PineconeClient } from '@pinecone-database/pinecone';

import configuration from '~/configuration';

// if (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {
//   throw new Error('Pinecone environment or api key vars missing')
// }

const initPinecone = async () => {
  try {
    const { PINECONE_API_KEY, PINECONE_ENVIRONMENT } = configuration.engine;

    if (!PINECONE_API_KEY || !PINECONE_ENVIRONMENT) {
      throw new Error('Vector DB Initialization Error.');
    }
    const pinecone = new PineconeClient();

    await pinecone.init({
      environment: PINECONE_ENVIRONMENT,
      apiKey: PINECONE_API_KEY,
    });
    // await pinecone.init({
    //   environment: process.env.PINECONE_ENVIRONMENT ?? '', //this is in the dashboard
    //   apiKey: process.env.PINECONE_API_KEY ?? '',
    // })

    return pinecone;
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to initialize Pinecone Client');
  }
};

// export const pineconeClient = await initPinecone();
export const pineconeClientExport = initPinecone;
