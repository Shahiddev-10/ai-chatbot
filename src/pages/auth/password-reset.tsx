import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import { FormEvent, useCallback } from 'react';
import { Trans, useTranslation } from 'next-i18next';
import { useAuth } from 'reactfire';
import { sendPasswordResetEmail } from 'firebase/auth';

import { useRequestState } from '~/core/hooks/use-request-state';
import { getFirebaseErrorCode } from '~/core/firebase/utils/get-firebase-error-code';

import configuration from '~/configuration';

import { withAuthProps } from '~/lib/props/with-auth-props';
import AuthErrorMessage from '~/components/auth/AuthErrorMessage';
import AuthPageLayout from '~/components/auth/AuthPageLayout';

import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import If from '~/core/ui/If';
import Alert from '~/core/ui/Alert';

const signInPath = configuration.paths.signIn;

export const PasswordReset: React.FCC = () => {
  const auth = useAuth();
  const { state, setError, setData, setLoading, resetState } =
    useRequestState();
  const { t } = useTranslation();

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      const email = data.get('email') as string;

      setLoading(true);

      try {
        const returnUrl = getReturnUrl();

        await sendPasswordResetEmail(auth, email, {
          url: returnUrl,
        });

        setData(true);
      } catch (e) {
        setError(getFirebaseErrorCode(e));
      }
    },
    [auth, setData, setError, setLoading]
  );

  return (
    <AuthPageLayout heading={<Trans i18nKey={'auth:passwordResetLabel'} />}>
      <Head>
        <title key={'title'}>{t(`auth:passwordForgotten`)}</title>
      </Head>

      <If condition={state.success}>
        <Alert type={'success'}>
          <Trans i18nKey={'auth:passwordResetSuccessMessage'} />
        </Alert>
      </If>

      <If condition={!state.data}>
        <>
          <form onSubmit={(e) => void onSubmit(e)} className={'container px-7'}>
            <div className={'flex-col space-y-4'}>
              {/* <div>
                <p className={'text-sm text-gray-700 dark:text-gray-400'}>
                  <Trans i18nKey={'auth:passwordResetSubheading'} />
                </p>
              </div> */}

              <div>
                <TextField.Label className="!text-lg !font-normal">
                  <Trans i18nKey={'common:emailAddress'} />
                  <svg
                    className={'absolute left-3 top-[48px] h-5 w-5'}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="url(#linear)"
                  >
                    <defs>
                      <linearGradient
                        id="linear"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="rgba(32, 86, 190, 1)" />
                        <stop offset="100%" stopColor="rgba(70, 127, 237, 1)" />
                      </linearGradient>
                    </defs>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <TextField.Input
                    name="email"
                    required
                    type="email"
                    placeholder={'Enter Email Address'}
                    className={
                      'h-[60px]  rounded-lg !border  !border-gray_bg-1 placeholder:text-gray_text-0'
                    }
                    withIcon
                  />
                </TextField.Label>
              </div>

              <If condition={state.error}>
                <AuthErrorMessage error={state.error as string} />
              </If>

              <Button
                loading={state.loading}
                type="submit"
                block
                className={
                  '!w-full bg-gradient-to-t from-tulip-0 to-tulip-1 p-2 font-Outfit !text-xl !font-medium text-white outline-none hover:text-white'
                }
              >
                <Trans i18nKey={'auth:passwordResetBtn'} />
              </Button>
            </div>
          </form>
        </>
      </If>

      <div
        className={
          'lg:text-l flex justify-center  px-7 font-Outfit text-gray_text-1'
        }
      >
        <p className={'flex space-x-1'}>
          <span>
            <Trans i18nKey={'auth:passwordRecoveredQuestion'} />
          </span>
          <span
            onClick={resetState}
            className={
              'cursor-pointer text-primary-800 underline dark:text-primary-500'
            }
          >
            <Trans i18nKey={'auth:passwordResendMail'} />
          </span>
        </p>
      </div>
      <Link
        className={'lg:text-l pb-10  font-Outfit text-gray_text-1 underline'}
        href={signInPath}
      >
        <Trans i18nKey={'auth:backToLogin'} />
      </Link>
    </AuthPageLayout>
  );
};

export default PasswordReset;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAuthProps(ctx);
}

/**
 * @description
 * Return the URL where the user will be redirected to after resetting
 * their password. By default, we will redirect to the sign-in page
 */
function getReturnUrl() {
  return `${window.location.origin}${configuration.paths.signIn}`;
}
