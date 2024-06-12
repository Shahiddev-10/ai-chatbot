import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ChatbotSettingsTile from '~/components/my-chatbots/ChatbotSettingsTile';
import SubHeading from '~/core/ui/SubHeading';

const Text = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title key={'title'}>Resource Text</title>
      </Head>
      <div className={'w-full lg:max-w-4xl'}>
        <ChatbotSettingsTile
        // TODO remove comment when text is avilable
        // heading={'Text'}
        // subHeading={'Add Text to train your chatbot.'}
        // actions={
        //   <Link
        //     href={`/my-chatbots/${router.query.slug}/customize/resource/text/new`}
        //   >
        //     <Button className={'w-full md:w-auto'} loading={false}>
        //       Add new text
        //     </Button>
        //   </Link>
        // }
        >
          {/* <ResourceListText /> */}
          <SubHeading>Coming soon...</SubHeading>
        </ChatbotSettingsTile>
      </div>
    </>
  );
};

export default Text;
