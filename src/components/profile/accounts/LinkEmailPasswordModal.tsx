import { useAuth } from 'reactfire';
import { useCallback, useEffect, useState } from 'react';

import {
  EmailAuthProvider,
  linkWithCredential,
  MultiFactorError,
  signInWithCredential,
} from 'firebase/auth';

import { useForm } from 'react-hook-form';
import toaster from 'react-hot-toast';
import { Trans, useTranslation } from 'next-i18next';

import { isMultiFactorError } from '~/core/firebase/utils/is-multi-factor-error';
import useCreateServerSideSession from '~/core/hooks/use-create-server-side-session';
import { useRequestState } from '~/core/hooks/use-request-state';

import AuthErrorMessage from '~/components/auth/AuthErrorMessage';
import { getFirebaseErrorCode } from '~/core/firebase/utils/get-firebase-error-code';
import MultiFactorAuthChallengeModal from '~/components/auth/MultiFactorAuthChallengeModal';

import Modal from '~/core/ui/Modal';
import TextField from '~/core/ui/TextField';
import If from '~/core/ui/If';
import Button from '~/core/ui/Button';

function LinkEmailPasswordModal({
  isOpen,
  setIsOpen,
}: React.PropsWithChildren<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>) {
  const auth = useAuth();
  const { t } = useTranslation();
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const { state, setLoading, setError, resetState } = useRequestState<void>();
  const [sessionRequest] = useCreateServerSideSession();

  const [multiFactorAuthError, setMultiFactorAuthError] =
    useState<Maybe<MultiFactorError>>();

  const user = auth.currentUser;

  const { register, handleSubmit, watch, reset, formState } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const errors = formState.errors;

  const emailControl = register('email', { required: true });

  const passwordControl = register('password', {
    required: true,
    minLength: {
      value: 6,
      message: t<string>(`auth:passwordLengthError`),
    },
  });

  const passwordValue = watch(`password`);

  const repeatPasswordControl = register('repeatPassword', {
    required: true,
    minLength: {
      value: 6,
      message: t<string>(`auth:passwordLengthError`),
    },
    validate: (value) => {
      if (value !== passwordValue) {
        return t<string>(`auth:passwordsDoNotMatch`);
      }

      return true;
    },
  });

  const onSubmit = useCallback(
    async (params: { email: string; password: string }) => {
      if (state.loading || !user) {
        return;
      }

      setLoading(true);

      const authCredential = EmailAuthProvider.credential(
        params.email,
        params.password
      );

      const promise = new Promise<void>((resolve, reject) => {
        return linkWithCredential(user, authCredential)
          .then(async () => {
            const newCredential = await signInWithCredential(
              auth,
              authCredential
            );

            // we need to re-create the server-side session, because for
            // some reason Firebase expires the session cookie after linking
            // a password
            await sessionRequest(newCredential.user);

            resolve();
          })
          .catch((error) => {
            if (isMultiFactorError(error)) {
              setMultiFactorAuthError(error);
              setIsOpen(false);
              toaster.dismiss();
            } else {
              setError(error);

              return reject();
            }
          });
      });

      await toaster.promise(promise, {
        success: t(`profile:linkActionSuccess`),
        error: t(`profile:linkActionError`),
        loading: t(`profile:linkActionLoading`),
      });

      resetState();
      setIsOpen(false);
      reset();
    },
    [
      state.loading,
      setLoading,
      t,
      resetState,
      setIsOpen,
      reset,
      user,
      auth,
      sessionRequest,
      setError,
    ]
  );

  useEffect(() => {
    if (!isOpen) {
      reset();
    }

    return () => {
      reset();
    };
  }, [reset, isOpen]);

  return (
    <>
      <Modal heading={`Link Password`} isOpen={isOpen} setIsOpen={setIsOpen}>
        <form className={'w-full'} onSubmit={handleSubmit(onSubmit)}>
          <div className={'flex-col space-y-2.5'}>
            <TextField>
              <TextField.Label>
                <Trans i18nKey={'common:emailAddress'} />

                <TextField.Input
                  {...emailControl}
                  data-cy={'email-input'}
                  required
                  type="email"
                  placeholder={'Enter Email'}
                />
              </TextField.Label>
            </TextField>

            <TextField>
              <TextField.Label>
                <Trans i18nKey={'common:password'} />

                <TextField.Input
                  {...passwordControl}
                  data-cy={'password-input'}
                  required
                  type={passwordType}
                  placeholder={''}
                />
                {passwordType === 'password' && (
                  <svg
                    className={
                      'absolute right-3 top-1/2 h-5 w-5 cursor-pointer'
                    }
                    onClick={() => setPasswordType('text')}
                    width="17"
                    height="12"
                    viewBox="0 0 17 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.5"
                      d="M8.5 9.06667C9.46591 9.06667 10.2869 8.73611 10.9631 8.075C11.6392 7.41389 11.9773 6.61111 11.9773 5.66667C11.9773 4.72222 11.6392 3.91944 10.9631 3.25833C10.2869 2.59722 9.46591 2.26667 8.5 2.26667C7.53409 2.26667 6.71307 2.59722 6.03693 3.25833C5.3608 3.91944 5.02273 4.72222 5.02273 5.66667C5.02273 6.61111 5.3608 7.41389 6.03693 8.075C6.71307 8.73611 7.53409 9.06667 8.5 9.06667ZM8.5 7.70667C7.92045 7.70667 7.42784 7.50833 7.02216 7.11167C6.61648 6.715 6.41364 6.23333 6.41364 5.66667C6.41364 5.1 6.61648 4.61833 7.02216 4.22167C7.42784 3.825 7.92045 3.62667 8.5 3.62667C9.07955 3.62667 9.57216 3.825 9.97784 4.22167C10.3835 4.61833 10.5864 5.1 10.5864 5.66667C10.5864 6.23333 10.3835 6.715 9.97784 7.11167C9.57216 7.50833 9.07955 7.70667 8.5 7.70667ZM8.5 11.3333C6.6197 11.3333 4.90682 10.8202 3.36136 9.79389C1.81591 8.76759 0.695455 7.39185 0 5.66667C0.695455 3.94148 1.81591 2.56574 3.36136 1.53944C4.90682 0.513148 6.6197 0 8.5 0C10.3803 0 12.0932 0.513148 13.6386 1.53944C15.1841 2.56574 16.3045 3.94148 17 5.66667C16.3045 7.39185 15.1841 8.76759 13.6386 9.79389C12.0932 10.8202 10.3803 11.3333 8.5 11.3333ZM8.5 9.82222C9.9553 9.82222 11.2915 9.44759 12.5085 8.69833C13.7256 7.94907 14.6561 6.93852 15.3 5.66667C14.6561 4.39481 13.7256 3.38426 12.5085 2.635C11.2915 1.88574 9.9553 1.51111 8.5 1.51111C7.0447 1.51111 5.70852 1.88574 4.49148 2.635C3.27443 3.38426 2.34394 4.39481 1.7 5.66667C2.34394 6.93852 3.27443 7.94907 4.49148 8.69833C5.70852 9.44759 7.0447 9.82222 8.5 9.82222Z"
                      fill="#B1B1B1"
                    />
                  </svg>
                )}
                {passwordType === 'text' && (
                  <svg
                    className={
                      'absolute right-3 top-1/2 h-5 w-5 cursor-pointer'
                    }
                    onClick={() => setPasswordType('password')}
                    width="17"
                    height="14"
                    viewBox="0 0 17 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.5">
                      <path
                        d="M7.984 1.65801C8.32125 1.61889 8.66049 1.59939 9 1.59961C12.7312 1.59961 15.72 3.92201 17 7.19961C16.6902 7.99688 16.2715 8.74746 15.756 9.43001M4.616 2.81481C2.984 3.81081 1.72 5.35401 1 7.19961C2.28 10.4772 5.2688 12.7996 9 12.7996C10.5457 12.8078 12.0633 12.3868 13.384 11.5836M7.304 5.50361C7.08112 5.72649 6.90432 5.99109 6.7837 6.28229C6.66308 6.5735 6.601 6.88561 6.601 7.20081C6.601 7.51601 6.66308 7.82812 6.7837 8.11933C6.90432 8.41053 7.08112 8.67513 7.304 8.89801C7.52688 9.12089 7.79148 9.29769 8.08268 9.41831C8.37389 9.53893 8.686 9.60101 9.0012 9.60101C9.3164 9.60101 9.62851 9.53893 9.91972 9.41831C10.2109 9.29769 10.4755 9.12089 10.6984 8.89801"
                        stroke="#B1B1B1"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.0351 0.234315C2.34752 -0.0781049 2.85405 -0.0781049 3.16647 0.234315L15.9665 13.0343C16.2789 13.3467 16.2789 13.8533 15.9665 14.1657C15.654 14.4781 15.1475 14.4781 14.8351 14.1657L2.0351 1.36569C1.72268 1.05327 1.72268 0.546734 2.0351 0.234315Z"
                        fill="#B1B1B1"
                      />
                    </g>
                  </svg>
                )}
              </TextField.Label>
              <TextField.Hint>
                <Trans i18nKey={'auth:passwordHint'} />
              </TextField.Hint>

              <TextField.Error error={errors.password?.message} />
            </TextField>

            <TextField>
              <TextField.Label>
                <Trans i18nKey={'auth:repeatPassword'} />

                <TextField.Input
                  {...repeatPasswordControl}
                  data-cy={'repeat-password-input'}
                  required
                  type={confirmPasswordType}
                  placeholder={''}
                />

                {confirmPasswordType === 'password' && (
                  <svg
                    className={
                      'absolute right-3 top-1/2 h-5 w-5 cursor-pointer'
                    }
                    onClick={() => setConfirmPasswordType('text')}
                    width="17"
                    height="12"
                    viewBox="0 0 17 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.5"
                      d="M8.5 9.06667C9.46591 9.06667 10.2869 8.73611 10.9631 8.075C11.6392 7.41389 11.9773 6.61111 11.9773 5.66667C11.9773 4.72222 11.6392 3.91944 10.9631 3.25833C10.2869 2.59722 9.46591 2.26667 8.5 2.26667C7.53409 2.26667 6.71307 2.59722 6.03693 3.25833C5.3608 3.91944 5.02273 4.72222 5.02273 5.66667C5.02273 6.61111 5.3608 7.41389 6.03693 8.075C6.71307 8.73611 7.53409 9.06667 8.5 9.06667ZM8.5 7.70667C7.92045 7.70667 7.42784 7.50833 7.02216 7.11167C6.61648 6.715 6.41364 6.23333 6.41364 5.66667C6.41364 5.1 6.61648 4.61833 7.02216 4.22167C7.42784 3.825 7.92045 3.62667 8.5 3.62667C9.07955 3.62667 9.57216 3.825 9.97784 4.22167C10.3835 4.61833 10.5864 5.1 10.5864 5.66667C10.5864 6.23333 10.3835 6.715 9.97784 7.11167C9.57216 7.50833 9.07955 7.70667 8.5 7.70667ZM8.5 11.3333C6.6197 11.3333 4.90682 10.8202 3.36136 9.79389C1.81591 8.76759 0.695455 7.39185 0 5.66667C0.695455 3.94148 1.81591 2.56574 3.36136 1.53944C4.90682 0.513148 6.6197 0 8.5 0C10.3803 0 12.0932 0.513148 13.6386 1.53944C15.1841 2.56574 16.3045 3.94148 17 5.66667C16.3045 7.39185 15.1841 8.76759 13.6386 9.79389C12.0932 10.8202 10.3803 11.3333 8.5 11.3333ZM8.5 9.82222C9.9553 9.82222 11.2915 9.44759 12.5085 8.69833C13.7256 7.94907 14.6561 6.93852 15.3 5.66667C14.6561 4.39481 13.7256 3.38426 12.5085 2.635C11.2915 1.88574 9.9553 1.51111 8.5 1.51111C7.0447 1.51111 5.70852 1.88574 4.49148 2.635C3.27443 3.38426 2.34394 4.39481 1.7 5.66667C2.34394 6.93852 3.27443 7.94907 4.49148 8.69833C5.70852 9.44759 7.0447 9.82222 8.5 9.82222Z"
                      fill="#B1B1B1"
                    />
                  </svg>
                )}
                {confirmPasswordType === 'text' && (
                  <svg
                    className={
                      'absolute right-3 top-1/2 h-5 w-5 cursor-pointer'
                    }
                    onClick={() => setConfirmPasswordType('password')}
                    width="17"
                    height="14"
                    viewBox="0 0 17 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.5">
                      <path
                        d="M7.984 1.65801C8.32125 1.61889 8.66049 1.59939 9 1.59961C12.7312 1.59961 15.72 3.92201 17 7.19961C16.6902 7.99688 16.2715 8.74746 15.756 9.43001M4.616 2.81481C2.984 3.81081 1.72 5.35401 1 7.19961C2.28 10.4772 5.2688 12.7996 9 12.7996C10.5457 12.8078 12.0633 12.3868 13.384 11.5836M7.304 5.50361C7.08112 5.72649 6.90432 5.99109 6.7837 6.28229C6.66308 6.5735 6.601 6.88561 6.601 7.20081C6.601 7.51601 6.66308 7.82812 6.7837 8.11933C6.90432 8.41053 7.08112 8.67513 7.304 8.89801C7.52688 9.12089 7.79148 9.29769 8.08268 9.41831C8.37389 9.53893 8.686 9.60101 9.0012 9.60101C9.3164 9.60101 9.62851 9.53893 9.91972 9.41831C10.2109 9.29769 10.4755 9.12089 10.6984 8.89801"
                        stroke="#B1B1B1"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.0351 0.234315C2.34752 -0.0781049 2.85405 -0.0781049 3.16647 0.234315L15.9665 13.0343C16.2789 13.3467 16.2789 13.8533 15.9665 14.1657C15.654 14.4781 15.1475 14.4781 14.8351 14.1657L2.0351 1.36569C1.72268 1.05327 1.72268 0.546734 2.0351 0.234315Z"
                        fill="#B1B1B1"
                      />
                    </g>
                  </svg>
                )}
              </TextField.Label>

              <TextField.Error error={errors.repeatPassword?.message} />
            </TextField>

            <If condition={state.error}>
              {(error) => (
                <AuthErrorMessage error={getFirebaseErrorCode(error)} />
              )}
            </If>

            <div>
              <Button
                block
                data-cy={'auth-submit-button'}
                className={'w-full'}
                color={'primary'}
                type="submit"
                loading={state.loading}
              >
                <If
                  condition={state.loading}
                  fallback={<Trans i18nKey={'profile:linkAccount'} />}
                >
                  <Trans i18nKey={'profile:linkActionLoading'} />
                </If>
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      <If condition={multiFactorAuthError}>
        {(error) => (
          <MultiFactorAuthChallengeModal
            error={error}
            isOpen={true}
            setIsOpen={() => setMultiFactorAuthError(undefined)}
            onSuccess={async (credential) => {
              await sessionRequest(credential.user);

              setMultiFactorAuthError(undefined);
              reset();
              resetState();
            }}
          />
        )}
      </If>
    </>
  );
}

export default LinkEmailPasswordModal;
