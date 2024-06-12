import Link from 'next/link';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';

import NavigationMenuItem from '~/core/ui/Navigation/NavigationItem';
import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';
import { useEffect, useState } from 'react';

const links: Record<string, any> = {
  // SignIn: {
  //   label: 'Sign In',
  //   path: '/auth/sign-in',
  // },
  Home: {
    label: 'Home',
    path: '#home',
  },
  // About: {
  //   label: 'About',
  //   path: '#about',
  // },
  HowItWorks: {
    label: 'How It Works',
    path: '#how-it-works',
  },
  Features: {
    label: 'Features',
    path: '#features',
  },
  Pricing: {
    label: 'Pricing',
    path: '#pricing',
  },
  FAQ: {
    label: 'FAQs',
    path: '#faqs',
  },
  Contact: {
    label: 'Contact Us',
    path: '#contact-us',
  },
};

const SiteNavigation = () => {
  const [activeNav, setActiveNav] = useState<string>('Home');

  useEffect(() => {
    // for active nav on scroll of window
    let startPoints: any = [];
    let name: any = [];
    Object.keys(links).map((i: any) => {
      let x = links[i].path.split('#').join('');
      let y = window.document.getElementById(x)?.offsetTop;
      name.push(links[i].label);
      startPoints.push(y);
    });
    window.onscroll = () => {
      let t = window.scrollY + 200;
      let index = 0;
      for (let i = 0; i < startPoints.length; i++) {
        if (t.toFixed(0) === '0') {
          index = 0;
          break;
        } else if (t > startPoints[i] && t < startPoints[i + 1]) {
          index = i;
          break;
        } else if (
          startPoints[i + 1] === undefined &&
          startPoints[i] + window.innerHeight > t &&
          t > startPoints[i - 1] + window.innerHeight
        ) {
          startPoints[i];
          index = i;
          break;
        }
      }
      setActiveNav(name[index]);
    };
  }, []);

  return (
    <>
      <div
        className={
          'hidden items-center space-x-0.5 max-[1300px]:!ml-0 sm:flex-none md:flex-none lg:!-m-0 lg:!ml-10 lg:flex xl:!-ml-0 min-[1280px]:xl:!-ml-10'
        }
      >
        <NavigationMenu>
          {/* <NavigationMenuItem
            className={'flex lg:hidden'}
            link={links.SignIn}
          /> */}
          {Object.keys(links).map((i: any) => (
            <NavigationMenuItem
              key={`navigation-link${i}`}
              link={links[i]}
              setActiveNav={setActiveNav}
              activeNav={activeNav}
            />
          ))}
        </NavigationMenu>
      </div>

      <div
        className={
          'hamburger flex items-center justify-center sm:place-content-end md:place-content-end lg:hidden'
        }
      >
        <MobileDropdown />
      </div>
    </>
  );
};

function MobileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Bars3Icon
          className={
            'h-9 group-[.is-sticky]:1xs:text-black-400 sm:text-white group-[.is-sticky]:sm:text-black-400 '
          }
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {Object.values(links).map((item) => {
          const className = 'flex w-full h-full items-center';

          return (
            <DropdownMenuItem key={item.path}>
              <Link className={className} href={item.path}>
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SiteNavigation;
