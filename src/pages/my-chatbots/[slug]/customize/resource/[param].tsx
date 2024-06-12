import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import ChatbotSettingsTabs from '~/components/my-chatbots/ChatbotSettingsTabs';
import MyChatbotPageContainer from '~/components/my-chatbots/MyChatbotPageContainer';
import MyChatbotResourceContainer from '~/components/my-chatbots/MyChatbotResourceContainer';
import Documents from '~/components/my-chatbots/resource/documents';
import Text from '~/components/my-chatbots/resource/text';
import Website from '~/components/my-chatbots/resource/website';
import { withAppProps } from '~/lib/props/with-app-props';

const MyChatbotsResourcePage = () => {
  const router = useRouter();

  const renderChild = (screen: string) => {
    switch (screen) {
      case 'documents':
        return <Documents />;
      case 'text':
        return <Text />;
      case 'website':
        return <Website />;
      default:
        return <></>;
    }
  };
  return (
    <MyChatbotPageContainer>
      <ChatbotSettingsTabs />
      <MyChatbotResourceContainer>
        {renderChild(router.query?.param || '')}
      </MyChatbotResourceContainer>
    </MyChatbotPageContainer>
  );
};

export default MyChatbotsResourcePage;

/* export function getServerSideProps(ctx: GetServerSidePropsContext) {
  // we do not have a main settings page and nested layout are not a thing yet,
  // so, we redirect to the Profile Page
  return {
    redirect: {
      destination: `/my-chatbots/${ctx?.params?.slug}/customize/resource/documents`,
    },
  };
} */
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
