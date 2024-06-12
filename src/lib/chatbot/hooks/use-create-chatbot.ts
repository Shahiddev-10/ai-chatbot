import { Timestamp, collection, doc, setDoc } from 'firebase/firestore';
import { useCallback } from 'react';
import { useFirestore } from 'reactfire';
import { useUserId } from '~/core/hooks/use-user-id';
import { CHATBOTS_COLLECTION } from '~/lib/firestore-collections';
import { v4 as uuid } from 'uuid';
import { Chatbot } from '~/lib/chatbot/types/chatbot';
import { useCurrentOrganization } from '~/lib/organizations/hooks/use-current-organization';
import { createRandomWorkspaceIdFromName } from '../utils';

function useCreateChatbot() {
  const firestore = useFirestore();
  const chatbotCollection = collection(firestore, CHATBOTS_COLLECTION);

  const userId = useUserId();
  const organization = useCurrentOrganization();
  const orgId = organization?.id;

  return useCallback(
    async ({
      chatbotName,
      namespaceId,
      whitelistDomains,
    }: {
      chatbotName: string;
      namespaceId: string;
      whitelistDomains: { domain: string }[];
    }) => {
      try {
        const whitelistDomainsWithId: {
          id: string;
          domain: string;
          addedOn: string;
        }[] = whitelistDomains.map((item) => ({
          domain: item.domain,
          id: uuid(),
          addedOn: new Date().toISOString(),
        }));
        console.log(chatbotName, namespaceId, '<-#####');
        // to create custom id for chatbot according to name
        let docId = createRandomWorkspaceIdFromName(chatbotName);
        const docRef = doc(chatbotCollection, docId);
        const chatbot: Chatbot = {
          name: chatbotName,
          namespaceId,
          userId: userId,
          orgId: orgId,
          whitelistDomains: whitelistDomainsWithId,
          noOfUsers: 0,
          noOfConversations: 0,
          noOfMessages: 0,
          noOfSourcesTrained: 0,
          isPublished: false,
          sourceOfInformation: {
            documents: [],
            text: [],
            websites: [],
          },
          createdAt: Timestamp.now(),
        };
        await setDoc(docRef, chatbot);
        return docId;
      } catch (error) {
        console.log(error, 'error chatbot creation');
      }
    },
    [chatbotCollection, userId, orgId]
  );
}

export default useCreateChatbot;
