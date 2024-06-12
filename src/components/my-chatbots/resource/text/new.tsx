import React from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { withAppProps } from '~/lib/props/with-app-props';
import MyChatbotResourceContainer from '~/components/my-chatbots/MyChatbotResourceContainer';
import MyChatbotPageContainer from '~/components/my-chatbots/MyChatbotPageContainer';
import ChatbotSettingsTabs from '~/components/my-chatbots/ChatbotSettingsTabs';
import ResourceNewTextForm from '~/components/my-chatbots/ResourceNewTextForm';

const NewText = () => {
  return (
    <MyChatbotPageContainer>
      <Head>
        <title key={'title'}>Resource Text</title>
      </Head>
      <ChatbotSettingsTabs />
      <MyChatbotResourceContainer>
        <div className={'w-full'}>
          <h1 className={'mb-5 text-xl font-bold'}>Text</h1>
          <div className="w-1/2">
            <ResourceNewTextForm />
          </div>
        </div>
      </MyChatbotResourceContainer>
    </MyChatbotPageContainer>
  );
};

export default NewText;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
