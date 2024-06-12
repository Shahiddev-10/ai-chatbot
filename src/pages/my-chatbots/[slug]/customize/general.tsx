import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { useUser } from 'reactfire';
import Divider from '~/core/ui/Divider';
import { withAppProps } from '~/lib/props/with-app-props';
import ChatbotGeneralForm from '~/components/my-chatbots/ChatbotGeneralForm';
import ChatbotSettingsTabs from '~/components/my-chatbots/ChatbotSettingsTabs';
import MyChatbotPageContainer from '~/components/my-chatbots/MyChatbotPageContainer';

const General = () => {
  const { data: user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <MyChatbotPageContainer>
      <Head>
        <title key={'title'}>Chatbot Customization</title>
      </Head>
      <ChatbotSettingsTabs />
      <div className="w-full">
        <h1 className={'mb-5 w-full text-xl font-bold'}>General</h1>
        <Divider />
        <ChatbotGeneralForm />
      </div>
    </MyChatbotPageContainer>
  );
};

export default General;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
