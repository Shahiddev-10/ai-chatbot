import { Chatbot } from '~/lib/chatbot/types/chatbot';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { doc, DocumentReference } from 'firebase/firestore';
import { CHATBOTS_COLLECTION } from '~/lib/firestore-collections';

type Response = WithId<Chatbot>;

export function useCurrentChatbot(chatbotId: string) {
  const firestore = useFirestore();

  const ref = doc(
    firestore,
    CHATBOTS_COLLECTION,
    chatbotId
  ) as DocumentReference<Response>;

  return useFirestoreDocData(ref, { idField: 'id' });
}

export default useCurrentChatbot;
