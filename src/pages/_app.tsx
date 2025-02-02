import '../styles/index.css';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Inter as SansFont, Manrope as HeadingFont } from 'next/font/google';

import type { User as AuthUser } from 'firebase/auth';
import { appWithTranslation, SSRConfig } from 'next-i18next';

import configuration from '~/configuration';

import FirebaseAppShell from '~/core/firebase/components/FirebaseAppShell';
import FirebaseAuthProvider from '~/core/firebase/components/FirebaseAuthProvider';
import FirebaseAppCheckProvider from '~/core/firebase/components/FirebaseAppCheckProvider';

import { loadSelectedTheme } from '~/core/theming';
import { isBrowser } from '~/core/generic/is-browser';
import useCollapsible from '~/core/hooks/use-sidebar-state';

import { Organization } from '~/lib/organizations/types/organization';
import { OrganizationContext } from '~/lib/contexts/organization';
import { UserData } from '~/core/session/types/user-data';
import { UserSessionContext } from '~/core/contexts/user-session';
import { UserSession } from '~/core/session/types/user-session';
import { SidebarContext } from '~/core/contexts/sidebar';
import { ThemeContext } from '~/core/contexts/theme';
import { CsrfTokenContext } from '~/core/contexts/csrf-token';
import Script from 'next/script';
import FirebaseFirestoreProvider from '~/core/firebase/components/FirebaseFirestoreProvider';

const ReactHotToast = dynamic(async () => {
  const { Toaster } = await import('react-hot-toast');
  return Toaster;
});

const AppRouteLoadingIndicator = dynamic(
  () => import('~/core/ui/AppRouteLoadingIndicator'),
  {
    ssr: false,
  }
);

const fontFamilySans = SansFont({
  subsets: ['latin'],
  variable: '--font-family-sans',
  fallback: ['system-ui', 'Helvetica Neue', 'Helvetica', 'Arial'],
  preload: true,
  weight: ['300', '400', '500', '600', '700', '800'],
});

const fontFamilyHeading = HeadingFont({
  subsets: ['latin'],
  variable: '--font-family-heading',
  fallback: ['--font-family-sans'],
  preload: true,
  weight: ['400', '500'],
});

interface UIState {
  sidebarState: string;
  theme: 'light' | 'dark';
}

interface DefaultPageProps extends SSRConfig {
  session?: Maybe<AuthUser>;
  user?: Maybe<UserData>;
  organization?: Maybe<WithId<Organization>>;
  csrfToken?: string;
  ui?: UIState;
}

function App(
  props: AppProps<DefaultPageProps> & { pageProps: DefaultPageProps }
) {
  const { Component } = props;
  const pageProps = props.pageProps as DefaultPageProps;
  const { emulator, firebase } = configuration;

  const userSessionContext: UserSession = useMemo(() => {
    return {
      auth: pageProps.session,
      data: pageProps.user,
    };
  }, [pageProps]);

  const [organization, setOrganization] = useState<
    DefaultPageProps['organization']
  >(pageProps.organization);

  const [userSession, setUserSession] =
    useState<Maybe<UserSession>>(userSessionContext);

  const updateCurrentOrganization = useCallback(() => {
    setOrganization(pageProps.organization);
  }, [pageProps.organization]);

  const updateCurrentUser = useCallback(() => {
    if (userSessionContext.auth) {
      setUserSession(userSessionContext);
    }
  }, [userSessionContext]);

  useEffect(updateCurrentOrganization, [updateCurrentOrganization]);
  useEffect(updateCurrentUser, [updateCurrentUser]);

  return (
    <FirebaseAppShell config={firebase}>
      <FirebaseAppCheckProvider>
        <FirebaseAuthProvider
          userSession={userSession}
          setUserSession={setUserSession}
          useEmulator={emulator}
        >
          <FirebaseFirestoreProvider>
            <UserSessionContext.Provider
              value={{ userSession, setUserSession }}
            >
              <OrganizationContext.Provider
                value={{ organization, setOrganization }}
              >
                <AppRouteLoadingIndicator />
                <UiStateProvider state={pageProps.ui}>
                  <CsrfTokenContext.Provider value={pageProps.csrfToken}>
                    <FontFamily />
                    <ReactHotToast />
                    <Component {...pageProps} />
                    <Scripts />
                  </CsrfTokenContext.Provider>
                </UiStateProvider>
              </OrganizationContext.Provider>
            </UserSessionContext.Provider>
          </FirebaseFirestoreProvider>
        </FirebaseAuthProvider>
      </FirebaseAppCheckProvider>
    </FirebaseAppShell>
  );
}

export default appWithTranslation<AppProps & { pageProps: DefaultPageProps }>(
  App
);

function UiStateProvider(
  props: React.PropsWithChildren<{
    state: Maybe<UIState>;
  }>
) {
  const ui = props.state;
  const isCollapsed = ui?.sidebarState === 'collapsed';
  const currentTheme = ui?.theme ?? null;

  const [collapsed, setCollapsed] = useCollapsible(isCollapsed);
  const [theme, setTheme] = useState(currentTheme);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {props.children}
      </ThemeContext.Provider>
    </SidebarContext.Provider>
  );
}

/**
 * Load selected theme
 * Do not add it as an effect to _app.tsx, the flashing is very visible
 */
if (isBrowser() && configuration.enableThemeSwitcher) {
  loadSelectedTheme();
}

function FontFamily() {
  return (
    <style jsx global>
      {`
        html {
          --font-family-sans: '-apple-system', 'BlinkMacSystemFont',
            ${fontFamilySans.style.fontFamily}, 'Segoe UI', 'Roboto', 'Ubuntu',
            'sans-serif';

          --font-family-heading: ${fontFamilyHeading.style.fontFamily};
        }
      `}
    </style>
  );
}
function Scripts() {
  return (
    <>
      {/* Hotjar */}
      <Script
        id="hotjar"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3512882,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `,
        }}
      />
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-3P8V2E45XS"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3P8V2E45XS', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
    </>
  );
}
