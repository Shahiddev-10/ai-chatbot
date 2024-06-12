import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';
import { useUser } from 'reactfire';

const MyChatbotsCreateContainer = dynamic(
  () => import('~/components/my-chatbots/MyChatbotsCreateContainer'),
  { ssr: false }
);

const MyChatbots = () => {
  const { data: user } = useUser();

  if (!user) {
    return null;
  }
  return (
    <RouteShell title={'My Chatbots'}>
      <MyChatbotsCreateContainer />
    </RouteShell>
  );
};

export default MyChatbots;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
