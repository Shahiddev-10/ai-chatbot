import configuration from '~/configuration';
import {
  ChatBubbleBottomCenterTextIcon,
  Cog8ToothIcon,
  CreditCardIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { MembershipRole } from './lib/organizations/types/membership-role';

const NAVIGATION_CONFIG = {
  items: [
    /* {
      label: 'common:dashboardTabLabel',
      path: configuration.paths.appHome,
      Icon: ({ className }: { className: string }) => {
        return <Squares2X2Icon className={className} />;
      },
      access: [
        MembershipRole.Admin,
        MembershipRole.Member,
        MembershipRole.Owner,
        MembershipRole.SuperAdmin,
      ],
    }, */
    {
      label: 'common:chatbotsTabLabel',
      path: '/my-chatbots',
      Icon: ({ className }: { className: string }) => {
        return <ChatBubbleBottomCenterTextIcon className={className} />;
      },
      access: [
        MembershipRole.Admin,
        MembershipRole.Member,
        MembershipRole.Owner,
        MembershipRole.SuperAdmin,
      ],
    },
    // {
    //   label: 'Subscription Master',
    //   path: '/master/subscription',
    //   Icon: ({ className }: { className: string }) => {
    //     return <CreditCardIcon className={className} />;
    //   },
    //   access: [MembershipRole.SuperAdmin],
    // },
    {
      label: 'common:settingsTabLabel',
      path: '/settings',
      Icon: ({ className }: { className: string }) => {
        return <Cog8ToothIcon className={className} />;
      },
      access: [
        MembershipRole.Admin,
        MembershipRole.Member,
        MembershipRole.Owner,
        MembershipRole.SuperAdmin,
      ],
    },
  ],
};

export default NAVIGATION_CONFIG;
