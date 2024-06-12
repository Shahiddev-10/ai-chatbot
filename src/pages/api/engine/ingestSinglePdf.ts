/// this file creates vector enmbeddings from a pdf file and saves it in pinecone. run this script only during trianing.

import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { Document } from 'langchain/document';

import { pineconeClientExport } from '~/lib/engine/pineconeClient';

// import { PineconeClient } from '@pinecone-database/pinecone';
import configuration from '~/configuration';

// import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
// import MyBufferLoader from '../../../lib/engine/MyBufferLoader';
// const PDFDocument = require('pdfkit');
const fs = require('fs');
import formidable from 'formidable';
import { promises as fsPromises } from 'fs';
import pdfParse from 'pdf-parse';
const admin = require('firebase-admin');
import {
  ORGANIZATIONS_COLLECTION,
  WORKSPACES_COLLECTION,
} from '~/lib/firestore-collections';
import { withAdmin } from '~/core/middleware/with-admin';

// const { PDFDocument } = require('pdf-lib');

// const filePath = './docs/aguide.pdf'
// const filePath = './docs/guide.pdf'

export default async function ingestSinglePdfHandler(req: any, res: any) {
  try {
    await withAdmin(req, res);
    const db = admin.firestore();

    const {
      PINECONE_INDEX_NAME,
      OPENAI_API_KEY,
      SERPAPI_API_KEY,
      PINECONE_API_KEY,
      PINECONE_ENVIRONMENT,
      userUploadedFilesDirectory,
    } = configuration.engine;

    const pineconeClient = await pineconeClientExport();
    // const pineconeClient = pineconeClientExport;

    console.log('-----------------');
    console.log('INSIDE Ingest Files');
    console.log('-----------------');

    let organizationId, workspaceId, fileSize, fileName;

    const form = new formidable.IncomingForm();
    const data = await new Promise<Buffer>((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        // console.log(
        //   '🚀 ~ file: ingestSinglePdf.ts:46 ~ form.parse ~ files, fields :',
        //   files,
        //   fields
        // );

        if (err) {
          reject(err);
          return;
        }

        organizationId = fields.organizationId;
        workspaceId = fields.workspaceId;
        const file = files.file as formidable.File;
        fileSize = file.size;
        fileName = file.name;
        // console.log(
        //   '🚀 ~ file: ingestSinglePdf.ts:53 ~ form.parse ~ file:',
        //   file
        // );
        const buffer = await fsPromises.readFile(file.path);
        await fsPromises.unlink(file.path);
        resolve(buffer);
      });
    });

    const pdfData = await pdfParse(data);

    // console.log('here is organizationId', organizationId, workspaceId);

    // TODO: update the file list in firestore

    console.log('here is the pdf text', pdfData.text);

    const rawDocs = pdfData.text;
    // const rawDocs = await loader.load();

    // console.log('raw docs', rawDocs);

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 500,
    });

    const docs = await textSplitter.splitDocuments([
      new Document({ pageContent: rawDocs }),
    ]);
    console.log('split docs', docs);

    console.log('ingesting to  vector store ...');

    const embeddings = new OpenAIEmbeddings();
    const index = pineconeClient.Index(PINECONE_INDEX_NAME);

    // embed the PDF docs

    //embed the PDF documents

    // TODO change namespace based on workspaceId
    ////
    const r = await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: 'ztest15june',
      textKey: 'text',
    });

    console.log('sucessfully ingested the files. updating firestore...');

    // add the current file info to firebase
    fileSize = formatBytes(fileSize);
    // console.log('filesize', fileName, fileSize, organizationId, workspaceId);
    const uploadedAt = admin.firestore.Timestamp.now();

    const currentFileInfo = {
      fileName,
      fileSize,
      uploadedAt,
    };
    const workspaceRef = db
      .collection(ORGANIZATIONS_COLLECTION)
      .doc(organizationId)
      .collection(WORKSPACES_COLLECTION)
      .doc(workspaceId);

    const doc = await workspaceRef.get();
    const newUploadedFilesList = doc?.data()?.uploadedFilesList ?? [];

    newUploadedFilesList.unshift(currentFileInfo);
    // console.log(
    //   '🚀 ~ file: ingestSinglePdf.ts:146 ~ ingestSinglePdfHandler ~ newUploadedFilesList:',
    //   newUploadedFilesList
    // );

    await workspaceRef.update({
      uploadedFilesList: newUploadedFilesList,
    });

    // update firestore with the details of file uploaded

    res.status(200).json({ message: 'PDF content printed in the console' });
  } catch (error) {
    console.log('error while embedding to pinecone', error);
  }
}
export const config = {
  api: {
    bodyParser: false,
  },
};

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    'Bytes',
    'KiB',
    'MiB',
    'GiB',
    'TiB',
    'PiB',
    'EiB',
    'ZiB',
    'YiB',
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

// Bufferloader method

// import { BufferLoader, Document } from '@langchain/document-loaders';
// import { PDFDocumentProxy } from 'pdfjs-dist';

// class MyPDFLoader extends BufferLoader {
//   async parse(
//     raw: Buffer,
//     metadata: Document['metadata']
//   ): Promise<Document[]> {
//     // Load the PDF document using pdfjs-dist
//     const pdf = await PDFDocumentProxy.load(raw);

//     // Extract the text content from each page
//     const pages = await Promise.all(
//       Array.from({ length: pdf.numPages }, (_, i) => pdf.getPage(i + 1))
//     );
//     const contents = await Promise.all(

// ```typescript
// import express from 'express';
// import multer from 'multer';
// import pdfParse from 'pdf-parse';

// const upload = multer();
// const app = express();

// app.use(express.json());

// app.post('/upload', upload.single('pdf'), async (req, res) => {
//   try {
//     const buffer = req.file.buffer;

//     const data = await pdfParse(buffer);

//     console.log(data.text);

//     res.status(200).json({ message: 'PDF file text printed successfully!' });
//   } catch (error) {
//     console.error(`Error while parsing the PDF: ${error.message}`);
//     res.status(500).json({ error: 'Error while parsing the PDF.' });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// ```

// To run this code, you need to have `node`, `express`, `multer`, and `pdf-parse` installed. You can do this by running `npm install --save express multer pdf-parse`. Also, make sure to enable TypeScript support in your Node.js project and include `esModuleInterop: true` in your `tsconfig.json`.

// Please note that this code accepts the `multipart/form-data` request containing the PDF file and then uses a buffer to process the file's content using the `pdf-parse` library. The contents of the submitted PDF file will be printed to the console.

// You can use the `pdf-parse` package to parse the PDF file in your Next.js backend. First, you'll need to install the package:

// ```bash
// npm install pdf-parse
// ```

// Now, you can write a complete backend Next.js API route that reads the PDF file from the FormData, converts it to a Buffer, and prints out the text content:

// ```typescript
// // pages/api/uploadPdf.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import formidable from 'formidable';
// import { promises as fsPromises } from 'fs';
// import pdfParse from 'pdf-parse';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     try {
//       const form = new formidable.IncomingForm();
//       const data = await new Promise<Buffer>((resolve, reject) => {
//         form.parse(req, async (err, fields, files) => {
//           if (err) {
//             reject(err);
//             return;
//           }

//           const file = files.file as formidable.File;
//           const buffer = await fsPromises.readFile(file.path);
//           await fsPromises.unlink(file.path);
//           resolve(buffer);
//         });
//       });

//       const pdfData = await pdfParse(data);
//       console.log(pdfData.text);

//       res.status(200).json({ message: 'PDF content printed in the console' });
//     } catch (error) {
//       res.status(500).json({ error: 'Could not process the PDF file' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// };

// export default handler;
// ```

// This code assumes that you are sending the PDF file as FormData with the key 'file' from your front-end React app.

// To use this API route in your Next.js application, you can send a request to `/api/uploadPdf`.
