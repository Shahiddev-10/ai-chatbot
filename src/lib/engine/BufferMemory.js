import { BufferMemory } from 'langchain/memory';

const BufferMemoryInstance = new BufferMemory({
  memoryKey: 'chat_history', // Must be set to "chat_history"
});

export default BufferMemoryInstance;
