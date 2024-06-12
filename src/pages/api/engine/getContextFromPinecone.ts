// this route is the main engine chain which generates the report from the given description and user notes.
import { withAdmin } from '~/core/middleware/with-admin';

const admin = require('firebase-admin');

import logger from '~/core/logger';

import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

import { pineconeClientExport } from '~/lib/engine/pineconeClient';
import configuration from '~/configuration';

export default async function getContextFromPineconeHandler(req, res) {
  const { PINECONE_INDEX_NAME } = configuration.engine;

  const pineconeClient = await pineconeClientExport();

  //
  try {
    // todo handle error if not found req
    const { query, workspaceId } = req.body;

    console.log('query in get context', query, workspaceId);
    // TODO error handling if no query found
    const index = pineconeClient.Index(PINECONE_INDEX_NAME);

    // step 1. fetch the description and notes from firebase

    // step 2. handle errors in case of no input data
    // if (!currentQuestion) {
    //   return res.status(400).json({ message: 'No question in the request' })
    // }

    /* create vectorstore*/
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      {
        pineconeIndex: index,
        textKey: 'text',
        namespace: workspaceId, //namespace comes from your config folder
      }
    );

    logger.info(
      `in getContextFromPinecone. Getting the context for query ${query}. Here is the prompt we passed: ${query}`
    );

    // FIXME handle ERROR IF QUERY NOT FOUND
    // if (typeof query === 'string' && query.trim() !== '') {
    //   console.log('Input is a non-empty string.');
    // } else {
    //   throw new Error('query is not a string')
    // }

    const kValue = 5;
    const docResults = await vectorStore.similaritySearch(query, kValue);

    logger.info({ docResults });
    res.status(200).json({ docResults });
  } catch (error) {
    console.log('error in /api/getContextfrompinecone', error.message);
    res.status(500).json({ error: error || 'Something went wrong' });
  }
}
