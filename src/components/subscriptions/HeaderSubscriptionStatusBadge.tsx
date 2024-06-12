import moment from 'moment';
import Link from 'next/link';
import SubscriptionStatusBadge from '~/components/subscriptions/SubscriptionStatusBadge';
import configuration from '~/configuration';
import { useUserSession } from '~/core/hooks/use-user-session';
import { useCurrentOrganization } from '~/lib/organizations/hooks/use-current-organization';

function HeaderSubscriptionStatusBadge() {
  const organization = useCurrentOrganization();
  const user = useUserSession();
  const subscription = organization?.subscription;

  const userCreatedDaysAgo = moment().diff(
    moment(String(user?.auth?.metadata?.creationTime)),
    'days'
  );
  const daysLeftInTrial = configuration.freePlanTrialDays - userCreatedDaysAgo;
  // if the organization has an active subscription
  // we do not show the subscription status badge
  if (subscription?.status === 'active') {
    return null;
  }

  // in all other cases we show the subscription status badge
  // which will show the subscription status and a link to the subscription page
  return (
    <Link href={'/settings/subscription'}>
      <SubscriptionStatusBadge
        subscription={subscription}
        daysLeftInTrial={daysLeftInTrial}
      />
    </Link>
  );
}

export default HeaderSubscriptionStatusBadge;
