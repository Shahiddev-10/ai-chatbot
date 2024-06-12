import { GetServerSidePropsContext } from 'next';

const MyChatbotsPage = () => {
  return <></>;
};

export default MyChatbotsPage;

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  // we do not have a main settings page and nested layout are not a thing yet,
  // so, we redirect to the Analytics Page
  return {
    redirect: {
      destination: `/my-chatbots/${ctx?.params?.slug}/analytics`,
    },
  };
}
