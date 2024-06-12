import { Trans } from 'next-i18next';
import Badge from '~/core/ui/Badge';
import { OrganizationSubscription } from '~/lib/organizations/types/organization-subscription';
import { Tooltip, TooltipTrigger, TooltipContent } from '~/core/ui/Tooltip';

function SubscriptionStatusBadge({
  subscription,
  daysLeftInTrial,
}: React.PropsWithChildren<{
  subscription: Maybe<OrganizationSubscription>;
  daysLeftInTrial: number;
}>) {
  let label: string;
  let description: string;
  let type: 'success' | 'error' | 'warn' | 'info';

  const status = subscription?.status ?? 'free';

  switch (status) {
    case 'active':
      label = 'subscription:status.active.label';
      description = 'subscription:status.active.description';
      type = 'success';
      break;

    case 'trialing':
      label = 'subscription:status.trialing.label';
      description = 'subscription:status.trialing.description';
      type = 'success';
      break;

    case 'canceled':
      label = 'subscription:status.canceled.label';
      description = 'subscription:status.canceled.description';
      type = 'warn';
      break;

    case 'incomplete':
      label = 'subscription:status.incomplete.label';
      description = 'subscription:status.incomplete.description';
      type = 'warn';
      break;

    case 'incomplete_expired':
      label = 'subscription:status.incomplete_expired.label';
      description = 'subscription:status.incomplete_expired.description';
      type = 'error';
      break;

    case 'unpaid':
      label = 'subscription:status.unpaid.label';
      description = 'subscription:status.unpaid.description';
      type = 'error';
      break;

    case 'past_due':
      label = 'subscription:status.past_due.label';
      description = 'subscription:status.past_due.description';
      type = 'error';
      break;

    default:
      label = 'subscription:status.free.label';
      description = 'subscription:status.free.description';
      type = 'success';
      break;
  }

  return (
    <span className="flex items-center justify-center 1xs:flex-row-reverse sm:flex-row-reverse md:flex-row-reverse lg:flex-row">
      {daysLeftInTrial > 0 && (
        <span className="text-xs 1xs:ml-2 sm:ml-2 md:ml-2 lg:mr-2">{`${daysLeftInTrial} Days remaining`}</span>
      )}
      <Tooltip>
        <TooltipTrigger>
          <Badge size={'small'} color={type}>
            <Trans i18nKey={label} />
          </Badge>
        </TooltipTrigger>

        <TooltipContent>
          <Trans i18nKey={description} values={getDates(subscription)} />
        </TooltipContent>
      </Tooltip>
    </span>
  );
}

function getDates(subscription: Maybe<OrganizationSubscription>) {
  if (!subscription) {
    return {};
  }

  return {
    endDate: new Date(subscription.periodEndsAt * 1000).toDateString(),
    trialEndDate: subscription.trialEndsAt
      ? new Date(subscription.trialEndsAt * 1000).toDateString()
      : null,
  };
}

export default SubscriptionStatusBadge;
