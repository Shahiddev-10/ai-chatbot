// this route is the main engine chain which generates the report from the given description and user notes.

import { withAdmin } from '~/core/middleware/with-admin';
const {
  initializeApp,
  applicationDefault,
  cert,
} = require('firebase-admin/app');
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require('firebase-admin/firestore');
const admin = require('firebase-admin');
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { OpenAI } from 'langchain/llms/openai';
// const { Configuration, OpenAIApi } = require('openai');
// const log10 = require('log10js');
const axios = require('axios');
import {
  ConversationalRetrievalQAChain,
  VectorDBQAChain,
  RetrievalQAChain,
  loadQARefineChain,
  loadQAStuffChain,
  loadQAMapReduceChain,
} from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';

// import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
// import { PineconeStore } from 'langchain/vectorstores/pinecone';

// import { pineconeClientExport } from '~/lib/engine/pineconeClient';
import configuration from '~/configuration';
import logger from '~/core/logger';
export default async function sectionChain(req, res) {
  const { maxTokens, openAIModel, PINECONE_INDEX_NAME, temperature } =
    configuration.engine;

  // const pineconeClient = await pineconeClientExport();

  //
  try {
    const { conversationId, query, chatbotId } = req.body;

    // throw error if conversationId or query not found
    if (!conversationId || !query || !chatbotId) {
      throw new Error('conversationId or query not found');
    }

    console.log('query in get answer', req.body.query);

    // step 1. fetch the description and notes from firebase

    // step 2. handle errors in case of no input data
    // if (!currentQuestion) {
    //   return res.status(400).json({ message: 'No question in the request' })
    // }

    // DIV 2. Use the reportOutline (description) to get context
    // const pineconeResponse = await axios.post(
    //   `${siteUrl}/api/engine/getContextFromPinecone`,
    //   {
    //     query,
    //     workspaceId,
    //   }
    // );

    // const { docResults } = pineconeResponse.data;
    // console.log(
    //   '🚀 ~ file: getAnswerChain.ts:76 ~ sectionChain ~ docResults:',
    //   docResults
    // );

    // using supabase
    const { siteUrl } = configuration.site;

    const supabaseResponse = await axios.post(
      `${siteUrl}/api/engine/supabase/getContextFromSupabase`,
      {
        query,
        namespaceId: chatbotId,
      }
    );

    const { docResults } = supabaseResponse.data;
    console.log(
      '🚀 ~ file: getAnswerChain.ts:76 ~ sectionChain ~ docResults:',
      docResults
    );

    // NOTE we are not using vectorstore due to passing context manually
    /* create vectorstore*/
    // const index = pineconeClient.Index(PINECONE_INDEX_NAME);

    // const vectorStore = await PineconeStore.fromExistingIndex(
    //   new OpenAIEmbeddings(),
    //   {
    //     pineconeIndex: index,
    //     textKey: 'text',
    //     namespace: workspaceId, //namespace comes from your config folder
    //   }
    // );

    // INFO INIT THE MODEL
    // const log10_OpenAIApi = log10(OpenAIApi);
    // const openai = new log10_OpenAIApi(
    //   new Configuration({
    //     apiKey: process.env.OPENAI_API_KEY,
    //   })
    // );

    const model = new OpenAI({
      temperature,
      maxTokens,
      modelName: openAIModel,
    });

    // model.client = openai;

    // const model = new ChatOpenAI({
    //   temperature: 0,
    //   maxTokens: 8000,
    //   modelName: 'gpt-4',
    //   // maxConcurrency: 10,
    // });

    const kValue = 5;

    // similaritySearch(
    //   query: string,
    //   k?: number,
    //   filter?: object | undefined
    // ): Promise<Document[]>;

    // console.log('docResults in sectionChain', docResults);

    // create a template based on the reportOutline
    const template = `You are an expert writer. You are getting some context that you need to use to answer the question
    The article must be written in native English. The tone must be authoratative and helpful. 
    Using the 'context' provided, provide the repsonse to the following query formatted in html.
    {query} `;

    const promptA = new PromptTemplate({
      template,
      inputVariables: ['context', 'query'],
    });

    const promptForThisSection = await promptA.format({
      context: docResults,
      query,
    });
    // normal chain
    const chain = loadQAStuffChain(model, {
      // prompt: promptA,
      // prompt: promptForThisSection,
      verbose: true,
    });

    logger.info(`Generating query: ${query}\n
    Here is the context provided: ${JSON.stringify(docResults)}\n

    Here is the prompt: ${promptForThisSection} \n
    `);
    const response = await chain.call({
      input_documents: docResults,
      question: promptForThisSection,
    });

    logger.info(
      `Here is the output for query ${query}\n.\n 
      ${response.text}`
    );

    const message = response.text;
    //update fire base
    const firebaseResponse = await axios.post(
      `${siteUrl}/api/firebase/updateAnswerToFirebase`,
      {
        message,
        chatbotId,
        conversationId,
      }
    );

    res.status(200).json({ response, name: 'You are in api/getAnswerChain' });

    // // //INFO This second example uses the `ConversationRetrievalQAChain`.
  } catch (error) {
    console.log('error in /api/getAnswerChain', error.message);
    res.status(500).json({ error: error || 'Something went wrong' });
  }
}
