import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { withAppProps } from '~/lib/props/with-app-props';
import RouteShell from '~/components/RouteShell';

const SubscriprionForm = dynamic(
  () => import('~/components/subscriptions/master/SubscripitonCreateContainer'),
  { ssr: false }
);

const SubscriptionMaster = () => {
  return (
    <RouteShell title={''}>
      <SubscriprionForm />
    </RouteShell>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}

export default SubscriptionMaster;
