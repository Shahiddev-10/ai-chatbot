import React from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { withAppProps } from '~/lib/props/with-app-props';
import MyChatbotPageContainer from '~/components/my-chatbots/MyChatbotPageContainer';

const Analytics = () => {
  return (
    <MyChatbotPageContainer>
      <Head>
        <title key="title">Analytics</title>
      </Head>
      <div className={'w-full'}>
        <h1 className={'text-xl font-bold'}>Analytics</h1>
        <div className="mt-3 rounded-lg border border-gray_bg-1 p-4">
          Coming soon...
        </div>
      </div>
    </MyChatbotPageContainer>
  );
};

export default Analytics;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
