import dynamic from 'next/dynamic';

import { useAuth } from 'reactfire';
import { Transition } from '@headlessui/react';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { ArrowSmallRightIcon } from '@heroicons/react/24/outline';

import { useUserSession } from '~/core/hooks/use-user-session';

import Logo from '~/core/ui/Logo';
import Container from '~/core/ui/Container';
import If from '~/core/ui/If';
import Button from '~/core/ui/Button';

import SiteNavigation from './SiteNavigation';
import ProfileDropdown from './ProfileDropdown';

import React, { useEffect, useState } from 'react';

const DarkModeToggle = dynamic(() => import('~/components/DarkModeToggle'), {
  ssr: false,
});

import configuration from '~/configuration';
import Link from 'next/link';

const fixedClassName = `FixedHeader`;

const SiteHeader: React.FCC<{
  fixed?: boolean;
}> = ({ fixed }) => {
  const auth = useAuth();
  const userSession = useUserSession();

  const signOutRequested = () => auth.signOut();
  const [sticky, setSticky] = useState('');

  // on render, set listener
  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  const isSticky = () => {
    /* Method that will fix header after a specific scrollable */
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 80 ? 'is-sticky' : '';
    setSticky(stickyClass);
  };

  return (
    <div className={`group w-full px-1 py-4 lg:px-6 ${sticky}`}>
      <Container>
        <div className="header-div relative z-0 flex flex-row items-center">
          <div
            className={
              'header-logo lg:flex-wraps flex items-center justify-between space-x-4 1xs:w-full sm:w-full sm:place-content-between md:w-full md:place-content-between lg:space-x-8'
            }
          >
            <Logo className="1xs:h-[40px] lg:w-2/3" />
            <SiteNavigation />
            <div
              className={
                'flex items-center justify-end space-x-4 1xs:hidden sm:hidden md:hidden lg:!-m-0 lg:flex lg:w-[200px]'
              }
            >
              {/* <If condition={configuration.enableThemeSwitcher && !userSession?.auth}>
              <div className={'flex items-center'}>
                <DarkModeToggle />
              </div>  
              </div>  
            </If> */}

              <Transition
                appear
                show
                enter="transition-opacity duration-500"
                enterFrom="opacity-50"
                enterTo="opacity-100"
              >
                <If condition={userSession?.auth} fallback={<AuthButtons />}>
                  {(user) => (
                    <ProfileDropdown
                      user={user}
                      signOutRequested={signOutRequested}
                    />
                  )}
                </If>
              </Transition>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

function AuthButtons() {
  return (
    <div
      className={
        'hidden space-x-2 1xs:hidden sm:hidden md:hidden lg:flex lg:flex-1'
      }
    >
      {/* <Button round color={'transparent'} href={configuration.paths.signIn}>
        <span>Sign In</span>
      </Button> */}

      <Link
        className=" text-btn-color-0 group/btnhover flex h-[55px] w-full items-center rounded-md border border-btncolor-0 bg-transparent p-1 transition delay-75 ease-linear hover:bg-[#FA9D00] hover:text-[#000000]	hover:shadow-btn-shadow	group-[.is-sticky]:text-btncolor-0 group-[.is-sticky]:hover:text-[#000000]"
        href={configuration.paths.signUp}
      >
        <span
          className={
            'flex h-10 w-max flex-1 place-content-center items-center rounded bg-none px-4 py-2 font-Outfit lg:text-base xl:text-lg'
          }
        >
          <span
            className={
              'flex items-center space-x-2 font-Mulish font-normal text-btncolor-0'
            }
          >
            {/* <ArrowRightIcon className={'h-4'} /> */}
          </span>
          Build Your Chatbot
          <ArrowSmallRightIcon
            className={'hidden h-6	group-hover/btnhover:block'}
          />
        </span>
      </Link>
    </div>
  );
}

export default SiteHeader;
