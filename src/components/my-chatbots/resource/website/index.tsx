import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ChatbotSettingsTile from '~/components/my-chatbots/ChatbotSettingsTile';
import SubHeading from '~/core/ui/SubHeading';

const Website = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title key={'title'}>Resource Website</title>
      </Head>
      <div className={'w-full lg:max-w-4xl'}>
        <ChatbotSettingsTile
        // TODO remove comment when website is avilable
        // heading={'Website'}
        // subHeading={'Add website to train your chatbot.'}
        // actions={
        //   <Link
        //     href={`/my-chatbots/${router.query.slug}/customize/resource/website/new`}
        //   >
        //     <Button className={'w-full md:w-auto'} loading={false}>
        //       Add new website
        //     </Button>
        //   </Link>
        // }
        >
          {/* <ResourceListWebsite /> */}
          <SubHeading>Coming soon...</SubHeading>
        </ChatbotSettingsTile>
      </div>
    </>
  );
};

export default Website;
