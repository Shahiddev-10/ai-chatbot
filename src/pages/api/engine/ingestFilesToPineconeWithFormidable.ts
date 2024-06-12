/// this file creates vector enmbeddings from a pdf file and saves it in pinecone. run this script only during trianing.

import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

import { pineconeClientExport } from '~/lib/engine/pineconeClient';

import { PineconeClient } from '@pinecone-database/pinecone';
import configuration from '~/configuration';

import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import formidable from 'formidable-serverless';

// const PDFDocument = require('pdfkit');
const fs = require('fs');
// const { PDFDocument } = require('pdf-lib');

// const filePath = './docs/aguide.pdf'
// const filePath = './docs/guide.pdf'

export default async function handler(req: any, res: any) {
  try {
    const {
      PINECONE_INDEX_NAME,

      OPENAI_API_KEY,
      SERPAPI_API_KEY,
      PINECONE_API_KEY,
      PINECONE_ENVIRONMENT,
      userUploadedFilesDirectory,
    } = configuration.engine;

    const pineconeClient = await pineconeClientExport();

    // NOTE: uncomment from below

    ///
    // console.log('received in backend', req.body);

    // const doc = new PDFDocument();
    // //use the tmp serverless function folder to create the write stream for the pdf
    // const filename = 'filename';
    // const filepath = `/tmp/${filename}.pdf`;
    // let writeStream = fs.createWriteStream(filepath);

    // doc.pipe(writeStream);
    // doc.text('title');
    // doc.end();

    // const loader = new PDFLoader(filepath, {
    //   splitPages: false,
    // });

    // const rawDocs = await loader.load();

    // console.log('raw docs', rawDocs);
    ///

    ////

    // const loader = new PDFLoader(filepath, {
    //   splitPages: false,
    // });

    // const rawDocs = await loader.load();

    // console.log('raw docs', rawDocs);
    ////

    // TODO make this as per workspace id
    const PINECONE_NAMESPACE = 'aiwithDemo';

    console.log('inside backend');
    const form = new formidable.IncomingForm();
    form.uploadDir = userUploadedFilesDirectory;

    // TODO change file name as per project and org ID (keep same as firebase storage)

    let filepath = '';
    form.keepExtensions = true;
    form.parse(req, async (err: any, fields: any, files: any) => {
      if (err) {
        console.log('eerror in formidable');
        res.status(500).send(err);
      }
      // console.log('formidable', fields, files);
      console.log('inside formidable');
      console.log('files', files.file, files);
      // console.log('succesin formidable');
      filepath = files.file.path;

      const loader = new PDFLoader(filepath, {
        splitPages: false,
      });

      const rawDocs = await loader.load();

      console.log('raw docs', rawDocs);

      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 500,
      });

      const docs = await textSplitter.splitDocuments(rawDocs);
      console.log('split docs', docs);

      console.log('creating vector store ...');

      const embeddings = new OpenAIEmbeddings();
      const index = pineconeClient.Index(PINECONE_INDEX_NAME!);

      // embed the PDF docs

      //embed the PDF documents

      // TODO change namespace based on workspaceId
      const r = await PineconeStore.fromDocuments(docs, embeddings, {
        pineconeIndex: index,
        namespace: PINECONE_NAMESPACE,
        textKey: 'text',
      });

      console.log('sucessfully ingested the files.');

      res.status(200).json({ fields, files });
    });

    // res.status(201).json({ name: 'John Doe' });

    // const textSplitter = new RecursiveCharacterTextSplitter({
    //   chunkSize: 1000,
    //   chunkOverlap: 200,
    // });

    // const docs = await textSplitter.splitDocuments(rawDocs);
    // console.log('split docs', docs);

    // console.log('creating vector store ...');

    // const embeddings = new OpenAIEmbeddings();
    // const index = pineconeClient.Index(PINECONE_INDEX_NAME);

    // // embed the PDF docs

    // //embed the PDF documents
    // const r = await PineconeStore.fromDocuments(docs, embeddings, {
    //   pineconeIndex: index,
    //   namespace: PINECONE_NAMESPACE,
    //   textKey: 'text',
    // });

    // res.status(200).json({ r, name: 'John Doe' });

    // console.log('success. upserted embeddings to pinecone!');
  } catch (error) {
    console.log('error while embedding to pinecone', error);
  }
}

// async function initPinecone() {
//   try {
//     const pinecone = new PineconeClient()

//     await pinecone.init({
//       environment: PINECONE_ENVIRONMENT,
//       apiKey: PINECONE_API_KEY,
//     })
//     // await pinecone.init({
//     //   environment: process.env.PINECONE_ENVIRONMENT ?? '', //this is in the dashboard
//     //   apiKey: process.env.PINECONE_API_KEY ?? '',
//     // })

//     return pinecone
//   } catch (error) {
//     console.log('error', error)
//     throw new Error('Failed to initialize Pinecone Client')
//   }
// }

export const config = {
  api: {
    bodyParser: false,
  },
};
