import { GetServerSidePropsContext } from 'next';

const MyChatbotsResourcePage = () => {
  return <></>;
};

export default MyChatbotsResourcePage;

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  // we do not have a main settings page and nested layout are not a thing yet,
  // so, we redirect to the Profile Page
  return {
    redirect: {
      destination: `/my-chatbots/${ctx?.params?.slug}/customize/resource/documents`,
    },
  };
}
