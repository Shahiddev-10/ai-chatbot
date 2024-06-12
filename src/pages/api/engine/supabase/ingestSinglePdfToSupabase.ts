import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Document } from 'langchain/document';

import { createClient } from '@supabase/supabase-js';
import configuration from '~/configuration';
const fs = require('fs');
import formidable from 'formidable';
import { promises as fsPromises } from 'fs';
import pdfParse from 'pdf-parse';
const admin = require('firebase-admin');
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export default async function ingestSinglePdfToSupabaseHandler(req, res) {
  try {
    console.log('inside singlepdf');
    const { SUPABASE_PRIVATE_KEY, SUPABASE_URL } = configuration.engine;

    const form = new formidable.IncomingForm();

    let organizationId, namespaceId, fileSize, fileName;

    const data = await new Promise<Buffer>((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        // console.log(
        //   '🚀 ~ file: ingestSinglePdf.ts:46 ~ form.parse ~ files, fields :',
        //   files,
        //   fields
        // );

        if (err) {
          console.log('error in formidable');
          reject(err);
          return;
        }

        const file = files.file as formidable.File;
        organizationId = fields.organizationId;
        namespaceId = fields.namespaceId;
        fileSize = file.size;
        fileName = file.name;
        console.log(
          '🚀 ~ file: ingestSinglePdf.ts:53 ~ form.parse ~ file:',
          file
        );
        const buffer = await fsPromises.readFile(file.path);
        await fsPromises.unlink(file.path);
        resolve(buffer);
      });
    });

    const pdfData = await pdfParse(data);

    // console.log('here is organizationId', organizationId, namespaceId);

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
      new Document({
        pageContent: rawDocs,
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
    res.status(200).json({ hi: 'success' });
  } catch (error) {
    console.log('Error in ingestSinglePdfToSupabase', error, error.message);
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
