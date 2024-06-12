import Link from 'next/link';
import { Trans } from 'next-i18next';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';

import NAVIGATION_CONFIG from '../navigation.config';
import configuration from '~/configuration';
import HeaderSubscriptionStatusBadge from './subscriptions/HeaderSubscriptionStatusBadge';
import Image from 'next/image';
import { images } from 'src/constants';
const logoHref = configuration.paths.appHome;

const MobileNavigation: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const Links = NAVIGATION_CONFIG.items.map((item) => {
    return (
      <DropdownMenuItem key={item.path}>
        <Link
          href={item.path}
          className={'flex h-full w-full items-center space-x-4'}
        >
          <item.Icon className={'h-6'} />

          <span>
            <Trans i18nKey={item.label} defaults={item.label} />
          </span>
        </Link>
      </DropdownMenuItem>
    );
  });

  return (
    <DropdownMenu open={showMenu}>
      <DropdownMenuTrigger>
        <Bars3Icon
          className={'h-8'}
          onClick={() => {
            setShowMenu(true);
          }}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="!-mt-[45px] h-screen 1xs:!-mt-[45px] sm:!-mt-[45px] md:!-mt-[45px]"
        onInteractOutside={() => {
          setShowMenu(false);
        }}
      >
        <>
          <div className="flex items-center">
            <Link href={logoHref} className={'w-full p-3'}>
              <Image src={images.logo} height={32} alt="logo" />
            </Link>
            <Bars3Icon
              className={'h-8'}
              onClick={() => {
                setShowMenu(false);
              }}
            />
          </div>
          <center className="mb-2">
            <HeaderSubscriptionStatusBadge />
          </center>
          <DropdownMenuSeparator />
          {Links}
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNavigation;
