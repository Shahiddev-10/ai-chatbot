import { Timestamp, addDoc, collection, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { saveMessage } from 'src/services/chatbot';

interface Props {
  conversationsRef: any;
  conversationId: string;
  chatbotId: string;
  setShowBotLoader: any;
  updateMessageCount: any;
}

const UserInput = ({
  conversationsRef,
  conversationId,
  chatbotId,
  setShowBotLoader,
  updateMessageCount,
}: Props) => {
  const [userTypedMessage, setUserTypedMessage] = useState('');

  /* To save user message in chat */
  const sendChat = async () => {
    let messagesRef = collection(
      doc(conversationsRef, conversationId),
      'messages'
    );
    await addDoc(messagesRef, {
      initiatedBy: 'USER',
      message: userTypedMessage,
      createdAt: Timestamp.now(),
    });
    updateMessageCount();

    setUserTypedMessage('');
    setShowBotLoader(true);
    // to send message and save in history
    await saveMessage({
      query: userTypedMessage,
      chatbotId: chatbotId,
      conversationId: conversationId,
    });
    setShowBotLoader(false);
  };

  return (
    <div className="flex rounded-b-lg bg-black-36">
      <input
        type="text"
        placeholder="Send a message..."
        className="h-[47px] w-full overflow-hidden rounded-bl-lg border-none bg-inherit pl-4 text-[15px] text-white focus-visible:outline-0"
        onChange={(e) => {
          let value = e.target.value;
          setUserTypedMessage(value);
        }}
        value={userTypedMessage}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            sendChat();
          }
        }}
      />
      <button
        type="button"
        className="my-auto ml-2.5 h-[35px] w-[35px] border-none bg-transparent text-tulip-1 shadow-none"
        onClick={() => sendChat()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default UserInput;
