// NOTE: not using this chain

import { OpenAI } from 'langchain/llms/openai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { BufferMemory, ConversationSummaryMemory } from 'langchain/memory';
import logger from '~/lib/logger';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

import { pineconeClientExport } from '~/lib/engine/pineconeClient';
import { BufferMemoryInstance } from '~/lib/engine/BufferMemory';
import configuration from '~/configuration';

const { maxTokens, openAIModel, temperature, PINECONE_INDEX_NAME } =
  configuration.engine;

export default async function conversationChainHandler(req, res) {
  try {
    console.log('im inside conversationChain');
    const { question } = req.body;
    const pineconeClient = await pineconeClientExport();
    const index = pineconeClient.Index(PINECONE_INDEX_NAME);

    /* create vectorstore*/
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      {
        pineconeIndex: index,
        textKey: 'text',
        // namespace: 'aiwith-ai',
        namespace: 'gstsmall',
      }
    );

    const results = await vectorStore.similaritySearch(
      'what is the business model',
      1
    );
    console.log(
      '🚀 ~ file: conversationChain.ts:46 ~ conversationChainHandler ~ results:',
      results
    );

    /* Initialize the LLM to use to answer the question */
    // const model = new ChatOpenAI({
    //   modelName: 'gpt-3.5-turbo',
    //   // maxConcurrency: 10,
    // });
    const model = new OpenAI({
      temperature: 0,
      maxTokens,
      modelName: openAIModel,
      // maxConcurrency: 10,
    });

    /* Create the chain */
    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      {
        returnSourceDocuments: true,
        memory: new BufferMemory({
          memoryKey: 'chat_history',
          inputkey: 'question',
          outputKey: 'text',
          returnMessages: true,
        }),
        qaChainOptions: {
          type: 'map_reduce',
        },
      }
    );

    /* Ask it a question */
    const response = await chain.call({ question });
    /* Ask it a follow up question */
    // const followUpRes = await chain.call({
    //   question: 'Was that nice?',
    // });
    // console.log(followUpRes);

    console.log('conversationChain res', response);
    res.status(200).json({ response, where: 'conversationChain' });
  } catch (error) {
    console.log('error in conversationChain.ts', error);
  }
}
