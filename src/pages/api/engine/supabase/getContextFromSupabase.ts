import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { createClient } from '@supabase/supabase-js';
import {
  SupabaseFilterRPCCall,
  SupabaseVectorStore,
} from 'langchain/vectorstores/supabase';

import configuration from '~/configuration';

export default async function ingestSupabaseHandler(req, res) {
  const { SUPABASE_PRIVATE_KEY, SUPABASE_URL, kValue } = configuration.engine;
  const client = createClient(SUPABASE_URL, SUPABASE_PRIVATE_KEY);

  const { query, namespaceId } = req.body;

  const embeddings = new OpenAIEmbeddings();

  const store = new SupabaseVectorStore(embeddings, {
    client,
    tableName: 'documents',
  });

  const docs = [
    {
      pageContent:
        'This is a long text, but it actually means something because vector database does not understand Lorem Ipsum. So I would need to expand upon the notion of quantum fluff, a theorectical concept where subatomic particles coalesce to form transient multidimensional spaces. Yet, this abstraction holds no real-world application or comprehensible meaning, reflecting a cosmic puzzle.',
      metadata: { b: 1, c: 10, stuff: 'right', id: 'one' },
    },
    {
      pageContent:
        'This is a long text, but it actually means something because vector database does not understand Lorem Ipsum. So I would need to proceed by discussing the echo of virtual tweets in the binary corridors of the digital universe. Each tweet, like a pixelated canary, hums in an unseen frequency, a fascinatingly perplexing phenomenon that, while conjuring vivid imagery, lacks any concrete implication or real-world relevance, portraying a paradox of multidimensional spaces in the age of cyber folklore.',
      metadata: { b: 2, c: 9, stuff: 'right', id: 'two' },
    },
    { pageContent: 'hello', metadata: { b: 1, c: 9, stuff: 'right' } },
    { pageContent: 'hello', metadata: { b: 1, c: 9, stuff: 'wrong' } },
    { pageContent: 'hi', metadata: { b: 2, c: 8, stuff: 'right' } },
    { pageContent: 'bye', metadata: { b: 3, c: 7, stuff: 'right' } },
    { pageContent: "what's this", metadata: { b: 4, c: 6, stuff: 'right' } },
  ];

  // await store.addDocuments(docs);

  const funcFilter: SupabaseFilterRPCCall = (rpc) =>
    rpc.filter('metadata->>namespaceId', 'eq', namespaceId);

  const docResults = await store.similaritySearch(query, kValue, funcFilter);
  console.log(
    '🚀 ~ file: getContextFromSupabase.ts:47 ~ ingestSupabaseHandler ~ docResults, namspace, query:',
    docResults,
    namespaceId,
    query
  );

  res
    .status(200)
    .json({ docResults, success: ' success: i am in getContextFromSupabase' });
}
