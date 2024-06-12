import { BufferLoader } from 'langchain/document_loaders/fs/buffer';
import { Document } from 'langchain/schema';

class MyBufferLoader extends BufferLoader {
  async parse(raw, metadata) {
    // Read the buffer data and parse it into documents
    const data = raw.toString('utf-8');
    const documents = data.split('\n').map((text) => ({
      text,
      metadata,
    }));

    console.log('convereted data', data);
    // return documents;
    return data;
  }
}
export default MyBufferLoader;
