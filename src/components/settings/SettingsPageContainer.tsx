import React from 'react';
import RouteShell from '~/components/RouteShell';
import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';
import NavigationItem from '~/core/ui/Navigation/NavigationItem';
import { useActiveSubsciption } from '~/lib/organizations/permissions';

const SettingsPageContainer: React.FCC<{
  title: string;
}> = ({ children, title }) => {
  const links = [
    {
      path: '/settings/profile',
      i18n: 'common:profileSettingsTabLabel',
      disabled: false,
    },
    {
      path: '/settings/organization',
      i18n: 'common:organizationSettingsTabLabel',
      disabled: !useActiveSubsciption(),
    },
    {
      path: '/settings/subscription',
      i18n: 'common:subscriptionSettingsTabLabel',
      disabled: false,
    },
  ];
  return (
    <RouteShell title={title}>
      <NavigationMenu bordered>
        {links.map((link) => (
          <NavigationItem
            className={'flex-1 lg:flex-none'}
            link={link}
            key={link.path}
            disabled={link.disabled}
          />
        ))}
      </NavigationMenu>

      <div
        className={`mt-4 flex h-full flex-col space-y-4 lg:mt-6 lg:flex-row lg:space-x-8 lg:space-y-0`}
      >
        {children}
      </div>
    </RouteShell>
  );
};

export default SettingsPageContainer;
