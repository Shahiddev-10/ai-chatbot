import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';

const MyChatbotsList = dynamic(
  () => import('~/components/my-chatbots/MyChatbotsList'),
  { ssr: false }
);

const MyChatbots = () => {
  return (
    <RouteShell title={'My Chatbots'}>
      <MyChatbotsList />
    </RouteShell>
  );
};

export default MyChatbots;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}
