import { Chatbot } from '~/lib/chatbot/types/chatbot';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import {
  collection,
  CollectionReference,
  query,
  where,
} from 'firebase/firestore';
import { CHATBOTS_COLLECTION } from '~/lib/firestore-collections';
import { useCurrentOrganization } from '~/lib/organizations/hooks/use-current-organization';

type Response = WithId<Chatbot>;

export function useFetchChatbots() {
  const firestore = useFirestore();
  const organization = useCurrentOrganization();
  const orgId = organization?.id;

  const ref = collection(
    firestore,
    CHATBOTS_COLLECTION
  ) as CollectionReference<Response>;

  const path = `orgId`;
  const operator = '==';
  const constraint = where(path, operator, orgId);
  const chatbotsQuery = query(ref, constraint);

  return useFirestoreCollectionData(chatbotsQuery, { idField: 'id' });
}

export default useFetchChatbots;
