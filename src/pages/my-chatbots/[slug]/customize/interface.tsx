import { GetServerSidePropsContext } from 'next';
import { withAppProps } from '~/lib/props/with-app-props';
import MyChatbotPageContainer from '~/components/my-chatbots/MyChatbotPageContainer';
import Head from 'next/head';
import ChatbotSettingsTabs from '~/components/my-chatbots/ChatbotSettingsTabs';
import ChatbotInterfaceForm from '~/components/my-chatbots/ChatbotInterfaceForm';
import FirebaseStorageProvider from '~/core/firebase/components/FirebaseStorageProvider';
import { useEffect, useState } from 'react';

const Interface = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [showInterface, setShowInterface] = useState(false);
  useEffect(() => {
    function updateSize() {
      if (window.innerWidth > 1024) {
        setShowPreview(false);
        setShowInterface(false);
      } else {
        console.log('lkj');
        setShowPreview(true);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <MyChatbotPageContainer>
      <Head>
        <title key={'title'}>Chatbot Interface</title>
      </Head>

      <ChatbotSettingsTabs />

      <div className="w-full">
        <h1 className={'text-xl font-bold'}>Interface</h1>
        {showPreview && (
          <span
            className="absolute right-4 -mt-[22px] cursor-pointer"
            onClick={() => {
              setShowInterface(!showInterface);
            }}
          >
            {showInterface ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 17 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.5"
                  d="M8.5 9.06667C9.46591 9.06667 10.2869 8.73611 10.9631 8.075C11.6392 7.41389 11.9773 6.61111 11.9773 5.66667C11.9773 4.72222 11.6392 3.91944 10.9631 3.25833C10.2869 2.59722 9.46591 2.26667 8.5 2.26667C7.53409 2.26667 6.71307 2.59722 6.03693 3.25833C5.3608 3.91944 5.02273 4.72222 5.02273 5.66667C5.02273 6.61111 5.3608 7.41389 6.03693 8.075C6.71307 8.73611 7.53409 9.06667 8.5 9.06667ZM8.5 7.70667C7.92045 7.70667 7.42784 7.50833 7.02216 7.11167C6.61648 6.715 6.41364 6.23333 6.41364 5.66667C6.41364 5.1 6.61648 4.61833 7.02216 4.22167C7.42784 3.825 7.92045 3.62667 8.5 3.62667C9.07955 3.62667 9.57216 3.825 9.97784 4.22167C10.3835 4.61833 10.5864 5.1 10.5864 5.66667C10.5864 6.23333 10.3835 6.715 9.97784 7.11167C9.57216 7.50833 9.07955 7.70667 8.5 7.70667ZM8.5 11.3333C6.6197 11.3333 4.90682 10.8202 3.36136 9.79389C1.81591 8.76759 0.695455 7.39185 0 5.66667C0.695455 3.94148 1.81591 2.56574 3.36136 1.53944C4.90682 0.513148 6.6197 0 8.5 0C10.3803 0 12.0932 0.513148 13.6386 1.53944C15.1841 2.56574 16.3045 3.94148 17 5.66667C16.3045 7.39185 15.1841 8.76759 13.6386 9.79389C12.0932 10.8202 10.3803 11.3333 8.5 11.3333ZM8.5 9.82222C9.9553 9.82222 11.2915 9.44759 12.5085 8.69833C13.7256 7.94907 14.6561 6.93852 15.3 5.66667C14.6561 4.39481 13.7256 3.38426 12.5085 2.635C11.2915 1.88574 9.9553 1.51111 8.5 1.51111C7.0447 1.51111 5.70852 1.88574 4.49148 2.635C3.27443 3.38426 2.34394 4.39481 1.7 5.66667C2.34394 6.93852 3.27443 7.94907 4.49148 8.69833C5.70852 9.44759 7.0447 9.82222 8.5 9.82222Z"
                  fill="#B1B1B1"
                />
              </svg>
            )}
          </span>
        )}
        <FirebaseStorageProvider>
          <ChatbotInterfaceForm
            preview={showPreview}
            showInterface={showInterface}
          />
        </FirebaseStorageProvider>
      </div>
    </MyChatbotPageContainer>
  );
};

export default Interface;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
