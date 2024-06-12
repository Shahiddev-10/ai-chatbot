import { useCallback } from 'react';
import { useFirestore } from 'reactfire';
import { doc, updateDoc } from 'firebase/firestore';
import { Chatbot } from '~/lib/chatbot/types/chatbot';
import { CHATBOTS_COLLECTION } from '~/lib/firestore-collections';

function useUpdateChatbot(chatbotId: string) {
  const firestore = useFirestore();

  const docRef = doc(firestore, CHATBOTS_COLLECTION, chatbotId);

  return useCallback(
    (chatbot: Partial<Chatbot>) => {
      return updateDoc(docRef, chatbot);
    },
    [docRef]
  );
}

export default useUpdateChatbot;
