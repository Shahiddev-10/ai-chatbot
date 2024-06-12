import React from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { withAppProps } from '~/lib/props/with-app-props';
import MyChatbotPageContainer from '~/components/my-chatbots/MyChatbotPageContainer';

const Embed = () => {
  return (
    <MyChatbotPageContainer>
      <Head>
        <title key="title">Embed</title>
      </Head>

      <div className={'w-full'}>
        <h1 className={'text-xl font-bold'}>Embed</h1>
      </div>
    </MyChatbotPageContainer>
  );
};

export default Embed;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
