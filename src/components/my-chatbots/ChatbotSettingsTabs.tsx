import React from 'react';
import NavigationItem from '~/core/ui/Navigation/NavigationItem';
import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';
import MobileNavigationDropdown from '~/core/ui/MobileNavigationMenu';
import { useRouter } from 'next/router';

const ChatbotSettingsTabs = () => {
  const router = useRouter();

  const links = {
    General: {
      path: `/my-chatbots/${router.query.slug}/customize/general`,
      label: 'General',
    },
    Authentication: {
      path: `/my-chatbots/${router.query.slug}/customize/interface`,
      label: 'Chat Interface',
    },
    Email: {
      path: `/my-chatbots/${router.query.slug}/customize/resource`,
      label: 'Manage Resource',
    },
  };

  const itemClassName = `flex justify-center lg:justify-start items-center w-full`;

  return (
    <>
      <div className={'hidden w-[15rem] lg:flex'}>
        <NavigationMenu vertical pill>
          <NavigationItem className={itemClassName} link={links.General} />

          <NavigationItem
            className={itemClassName}
            link={links.Authentication}
          />

          <NavigationItem className={itemClassName} link={links.Email} />
        </NavigationMenu>
      </div>

      <div className={'block w-full lg:hidden'}>
        <MobileNavigationDropdown links={Object.values(links)} />
      </div>
    </>
  );
};

export default ChatbotSettingsTabs;
