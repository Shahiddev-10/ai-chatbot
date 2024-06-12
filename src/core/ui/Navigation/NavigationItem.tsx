import Link from 'next/link';
import { useRouter } from 'next/router';
import { Trans } from 'next-i18next';
import classNames from 'classnames';

import { isRouteActive } from '~/core/is-route-active';
import {} from 'react';

interface Link {
  path: string;
  label?: string;

  /**
   * @deprecated - Simply use {@link label}
   */
  i18n?: string;
}

const NavigationMenuItem: React.FCC<{
  link: Link;
  depth?: number;
  disabled?: boolean;
  shallow?: boolean;
  className?: string;
  icon?: any;
  activeNav: string;
  setActiveNav: any;
}> = ({
  link,
  className,
  disabled,
  shallow,
  depth,
  icon,
  activeNav,
  setActiveNav,
}) => {
  const router = useRouter();
  const active = link.path?.includes('#')
    ? activeNav === link.label
    : isRouteActive(link.path, router.asPath, depth ?? 1);
  const label = link.label ?? link.i18n;
  return (
    <div
      className={classNames(
        `NavigationItem text-lg lg:text-sm xl:text-lg`,
        className ?? ``,
        {
          [`NavigationItemActive`]: active,
          [`NavigationItemNotActive`]: !active,
        }
      )}
    >
      <Link
        aria-disabled={disabled}
        href={disabled ? '' : link.path}
        shallow={shallow ?? active}
        onClick={(e) => {
          if (link.path?.includes('#')) {
            if (router.asPath.includes('/legal')) {
              router.push('/' + link.path);
            } else {
              e.preventDefault();
              document?.querySelector(link.path)?.scrollIntoView({
                behavior: 'smooth',
              });
              // setActiveNav(link.label);
            }
          }
        }}
      >
        {icon && <span className="mr-2">{icon}</span>}
        <Trans i18nKey={label} defaults={label} />
      </Link>
    </div>
  );
};

export default NavigationMenuItem;
