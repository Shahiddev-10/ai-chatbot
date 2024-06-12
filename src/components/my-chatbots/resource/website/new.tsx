import React from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { withAppProps } from '~/lib/props/with-app-props';
import MyChatbotResourceContainer from '~/components/my-chatbots/MyChatbotResourceContainer';
import MyChatbotPageContainer from '~/components/my-chatbots/MyChatbotPageContainer';
import ChatbotSettingsTabs from '~/components/my-chatbots/ChatbotSettingsTabs';
import ResourceNewWebsiteForm from '~/components/my-chatbots/ResourceNewWebsiteForm';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Button from '~/core/ui/Button';
import ChatbotSettingsTile from '~/components/my-chatbots/ChatbotSettingsTile';
import { useRouter } from 'next/router';

const NewWebsite = () => {
  const router = useRouter();
  return (
    <MyChatbotPageContainer>
      <Head>
        <title key={'title'}>Resource Website</title>
      </Head>
      <ChatbotSettingsTabs />
      <MyChatbotResourceContainer>
        <div className={'w-full lg:max-w-4xl'}>
          <ChatbotSettingsTile
            heading={'Website'}
            subHeading={'Add website to train your chatbot.'}
          >
            <ResourceNewWebsiteForm />
          </ChatbotSettingsTile>
          <div className={'mt-4'}>
            <Button
              size={'small'}
              color={'transparent'}
              href={`/my-chatbots/${router.query.slug}/customize/resource/website`}
            >
              <span className={'flex items-center space-x-1'}>
                <ArrowLeftIcon className={'h-3'} />
                <span>Go Back</span>
              </span>
            </Button>
          </div>
        </div>
      </MyChatbotResourceContainer>
    </MyChatbotPageContainer>
  );
};

export default NewWebsite;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
