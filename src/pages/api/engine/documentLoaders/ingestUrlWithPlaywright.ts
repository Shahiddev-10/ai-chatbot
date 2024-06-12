import { NextApiRequest, NextApiResponse } from 'next';
import { withExceptionFilter } from '~/core/middleware/with-exception-filter';
const { convert } = require('html-to-text');

import { PlaywrightWebBaseLoader } from 'langchain/document_loaders/web/playwright';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import configuration from '~/configuration';
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Document } from 'langchain/document';

import { createClient } from '@supabase/supabase-js';
const ingestUrlWithPlaywrightHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  console.log('im inside ingestUrlWithPlaywright');

  const { SUPABASE_PRIVATE_KEY, SUPABASE_URL } = configuration.engine;

  const { url, namespaceId } = req.body ?? configuration.engine;

  if (!(namespaceId && url)) {
    throw new Error('Both NamespaceId and URL are needed');
  }

  if (!checkIfIsValidUrl(url)) {
    throw new Error('Invalid URL format');
  }

  const { kValue, chunkOverlap, chunkSize } = req.body ?? configuration.engine;

  const loader = new PlaywrightWebBaseLoader('https://www.withai.tawk/');

  const urlDocs = await loader.load();
  const htmlText = urlDocs[0].pageContent;

  // console.log('🚀 ~ file: ingestUrlWithPlaywright.ts:20 ~ docs:', htmlText);

  const options = {
    wordwrap: 130,
  };
  const text = convert(htmlText, options);
  console.log('html stripped: ', text);

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap,
  });

  const docs = await textSplitter.splitDocuments([
    new Document({
      pageContent: text,
      metadata: { namespaceId },
    }),
  ]);
  console.log('split docs', docs);

  console.log('ingesting to  vector store ...');

  const client = createClient(SUPABASE_URL, SUPABASE_PRIVATE_KEY);

  const embeddings = new OpenAIEmbeddings();

  const store = new SupabaseVectorStore(embeddings, {
    client,
    tableName: 'documents',
  });

  await store.addDocuments(docs);

  console.log('succesfully ingested ' + namespaceId + ' to supabase');

  res.status(200).json({
    success: true,
    data: docs,
    text,
    message: 'success in ingestUrlWithPlaywright',
  });
};

export default function ingestUrlWithPlaywright(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return withExceptionFilter(req, res)(ingestUrlWithPlaywrightHandler);
}

function checkIfIsValidUrl(url) {
  let pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?' + // port
    '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
    '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator

  return pattern.test(url);
}
