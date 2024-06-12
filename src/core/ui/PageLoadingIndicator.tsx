import { PropsWithChildren } from 'react';

import LogoImage from '~/core/ui/Logo/LogoImage';
import If from '~/core/ui/If';
import classNames from 'classnames';
import Spinner from '~/core/ui/Spinner';

export default function PageLoadingIndicator({
  children,
  fullPage,
  displayLogo,
  className,
}: PropsWithChildren<{
  fullPage?: boolean;
  displayLogo?: boolean;
  className?: string;
}>) {
  const useFullPage = fullPage ?? true;
  const shouldDisplayLogo = displayLogo ?? true;

  return (
    <div
      className={classNames(
        `flex flex-col items-center justify-center space-y-6`,
        {
          ['fixed left-0 top-0 z-[100] h-full w-full bg-white' +
          ' dark:bg-black-500']: useFullPage,
        },
        className
      )}
    >
      <If condition={shouldDisplayLogo}>
        <div className={'my-2'}>
          <LogoImage />
        </div>
      </If>

      <div className={'text-primary-500'}>
        <Spinner className={'h-12 w-12'} />
      </div>

      <div className={'text-sm font-medium'}>{children}</div>
    </div>
  );
}
