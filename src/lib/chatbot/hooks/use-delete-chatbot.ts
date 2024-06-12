import { useFirestore } from 'reactfire';
import { deleteDoc, doc } from 'firebase/firestore';
import { useCallback } from 'react';

import { CHATBOTS_COLLECTION } from '~/lib/firestore-collections';

export function useDeleteChatbot() {
  const firestore = useFirestore();

  return useCallback(
    (chatbotId: string) => {
      const path = getDeleteChatbotPath(chatbotId);
      const docRef = doc(firestore, path);

      return deleteDoc(docRef);
    },
    [firestore]
  );
}

function getDeleteChatbotPath(chatbotId: string) {
  return [CHATBOTS_COLLECTION, chatbotId].join('/');
}
