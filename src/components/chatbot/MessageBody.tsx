import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { images } from 'src/constants';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';

interface Props {
  conversationsRef: any;
  conversationId: string;
  showBotLoader: boolean;
}

const MessageBody = ({
  conversationsRef,
  conversationId,
  showBotLoader,
}: Props) => {
  const [messageHistory, setMessageHistory] = useState<any>([]);

  /* To get messages realtime */
  useEffect(() => {
    let unsub = () => {};
    setMessageHistory([]);
    if (conversationsRef !== undefined && conversationId !== '') {
      let messages = collection(
        doc(conversationsRef, conversationId),
        'messages'
      );
      const q = query(messages, orderBy('createdAt'));

      unsub = onSnapshot(q, (document) => {
        document.docChanges().forEach((value) => {
          if (value.type === 'added') {
            let x = _.pick(value.doc.data(), ['initiatedBy', 'message']);
            setMessageHistory((prev: any) => [...prev, x]);
          }
          // console.log('snapshot docs change....', value);
        });

        // console.log('snapshot....');
      });
    }
    // console.log('rendering message body....');
    return () => unsub();
  }, [conversationId]);

  /* To scroll to latest element on addition of message */
  useEffect(() => {
    if (messageHistory.length > 0) {
      handleScroll(`cb-${messageHistory.length}`);
    }

    if (showBotLoader) {
      handleScroll('botLoader');
    }
  }, [messageHistory.length, showBotLoader]);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black-700">
      <div className="h-[370px] overflow-y-scroll p-4 chatbot-scrollbar">
        {messageHistory.map((message: any, index: number) => {
          let messageClasses = 'ml-auto bg-tulip';
          if (message.initiatedBy === 'AI') {
            messageClasses = 'border border-[#6a6c6e] bg-black-36';
          }
          return (
            <div
              key={uuid()}
              id={`cb-${index + 1}`}
              className="clear-both mb-2.5 flex"
            >
              {message.initiatedBy === 'AI' && (
                <img
                  src={images.aiAvatar}
                  className="mr-2 h-[45px] w-[45px] rounded-full"
                  alt="profile"
                />
              )}
              <div
                className={`max-w-[215px] rounded-lg p-3.5 text-[15px]/[16px] font-light text-white ${messageClasses}`}
                dangerouslySetInnerHTML={{ __html: message.message }}
              ></div>
            </div>
          );
        })}
        {showBotLoader && (
          <div key={uuid()} id="botLoader" className="clear-both mb-2.5 flex">
            <img
              src={images.aiAvatar}
              className="mr-2 h-[45px] w-[45px] rounded-full"
              alt="profile"
            />
            <div
              className={`max-w-[215px] rounded-lg border border-[#6a6c6e] bg-black-36 px-3.5 text-[15px]/[16px] font-light text-white`}
            >
              <images.chatLoader />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBody;
