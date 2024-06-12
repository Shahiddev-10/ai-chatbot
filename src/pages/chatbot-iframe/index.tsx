import React, { useEffect, useState } from 'react';
import { images } from 'src/constants';
import { parseCookies, setCookie } from 'nookies';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { CHATBOTS_COLLECTION } from '~/lib/firestore-collections';

import { saveMessage } from 'src/services/chatbot';
import { useRouter } from 'next/router';
import ChatBot from '~/components/chatbot';

const ChatbotComponent = () => {
  const router = useRouter();
  const firestore = useFirestore();
  let { chatbotid } = router.query;
  const [showChatbot, setshowChatbot] = useState(false);
  const [showBotLoader, setShowBotLoader] = useState(false);
  const [chatbotData, setChatbotData] = useState(null);
  const [docRef, setDocRef] = useState<any>(null);

  /* To remove classes added in default */
  useEffect(() => {
    document.querySelector('html')?.classList.remove('dark');
    document.body.className = 'w-max h-max bg-transparent ml-auto';
    // console.log('rendering chatbot-iframe 1....');
  }, []);

  /* To call getChatbotDoc on change of chatbotid */
  useEffect(() => {
    if (chatbotid !== undefined && chatbotid != '') {
      setChatbotData(null);
      getChatbotDoc();
      // console.log('rendering chatbot-iframe....');
    }
  }, [chatbotid]);

  /* To call send message function on toggle of chatbot */
  useEffect(() => {
    setHeightofIframe();
    // console.log('rendering iframe height....');
  }, [showChatbot]);

  /* To check if chatbot exists */
  const getChatbotDoc = async () => {
    const docRefx = doc(firestore, CHATBOTS_COLLECTION, chatbotid);
    let x = await getDoc(docRefx);
    if (x.exists() && x.data().isPublished) {
      setDocRef(docRefx);
      setChatbotData(x.data());
    } else {
      setDocRef(null);
    }
  };

  /* To send message to change height and width */
  const setHeightofIframe = () => {
    let height = showChatbot ? '600' : '120';
    let width = showChatbot ? '410' : '120';
    window.parent.postMessage([width, height], '*'); // to add domain instead of star
  };

  /* To update showBotLoader state's value */
  const setShowBotLoaderFn = (value) => {
    setShowBotLoader(value);
  };

  return chatbotid !== undefined && chatbotid != '' && docRef !== null ? (
    <div className="absolute bottom-0 right-0" id="chatbot-container">
      {chatbotData !== null && (
        <ChatBot
          docRef={docRef}
          chatbotId={chatbotid}
          chatbotData={chatbotData}
          showBotLoader={showBotLoader}
          setShowBotLoaderFn={setShowBotLoaderFn}
          chatbotclass={!showChatbot && 'hidden'}
        />
      )}
      {/* Toggle Button */}
      <img
        src={images.chatbotImage}
        className="ml-auto h-[120px] w-[120px] cursor-pointer p-8"
        onClick={() => setshowChatbot(!showChatbot)}
        alt="chatbot-image"
      />
    </div>
  ) : (
    ''
  );
};

export default ChatbotComponent;
