import React, { useState, useEffect } from 'react';
import MessageBody from './MessageBody';
import UserInput from './UserInput';
import { parseCookies, setCookie } from 'nookies';
import { useFirestoreDocData } from 'reactfire';
import { Timestamp, addDoc, collection, updateDoc } from 'firebase/firestore';

interface Props {
  docRef: any;
  chatbotId: any;
  chatbotData: any;
  showBotLoader: boolean;
  setShowBotLoaderFn: any;
  chatbotclass: any;
}

const ChatBot = ({
  docRef,
  chatbotId,
  chatbotData,
  showBotLoader,
  setShowBotLoaderFn,
  chatbotclass,
}: Props) => {
  let converstionIdCookieName = 'conversationId';
  let cookies = parseCookies(null);
  const [conversationId, setConversationId] = useState('');
  const [initialMessage, setInitialMessage] = useState(
    'Hello, how can I help you?'
  );

  // const { data } = useFirestoreDocData(docRef, { idField: 'id' });
  const conversationsRef = collection(docRef, 'conversations');
  // console.log(chatbotData, 'asdas');
  /* To check if conversationId already generated or not. */
  useEffect(() => {
    if (cookies[converstionIdCookieName] === undefined) {
      if (chatbotData?.customizations?.initialMessage !== undefined) {
        setInitialMessage(chatbotData?.customizations?.initialMessage);
      }
      generateConversationId();
    } else {
      if (conversationId !== cookies[converstionIdCookieName]) {
        setConversationId(cookies[converstionIdCookieName]);
        // console.log('rendering chatbot component yyyyy....');
      }
    }
    // console.log('rendering chatbot component....');
  }, [chatbotData]);

  /* To generate conversation id and save in cookies */
  const generateConversationId = async () => {
    const covDocRef = await addDoc(conversationsRef, {});
    setCookie(null, converstionIdCookieName, covDocRef.id);
    setConversationId(covDocRef.id);

    // to create messages collection and save initial message in it
    const messagesRef = collection(covDocRef, 'messages');
    await addDoc(messagesRef, {
      initiatedBy: 'AI',
      message: initialMessage,
      createdAt: Timestamp.now(),
    });
    await updateDoc(docRef, {
      noOfConversations: (chatbotData?.noOfConversations || 0) + 1,
      noOfMessages: (chatbotData?.noOfMessages || 0) + 1,
    });
    // console.log('rendering chatbot component xxx....');
  };

  /* To update message count */
  const updateMessageCount = async () => {
    await updateDoc(docRef, {
      noOfMessages: (chatbotData?.noOfMessages || 0) + 1,
    });
  };

  return (
    <div className={`mr-8 w-[370px] max-w-[90vw] shadow-lg ${chatbotclass}`}>
      <div className="h-[60px] rounded-t-lg bg-tulip p-4 text-2xl font-semibold text-white">
        {chatbotData?.name || 'Chatbot'}
      </div>
      <MessageBody
        conversationsRef={conversationsRef}
        conversationId={conversationId}
        showBotLoader={showBotLoader}
      />
      <UserInput
        conversationsRef={conversationsRef}
        conversationId={conversationId}
        chatbotId={chatbotId}
        setShowBotLoader={setShowBotLoaderFn}
        updateMessageCount={updateMessageCount}
      />
    </div>
  );
};

export default ChatBot;
