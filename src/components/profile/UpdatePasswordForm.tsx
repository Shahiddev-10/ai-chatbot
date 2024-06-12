import {
  EmailAuthProvider,
  MultiFactorError,
  reauthenticateWithCredential,
  updatePassword,
  User,
  UserCredential,
} from 'firebase/auth';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Trans, useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import Alert from '~/core/ui/Alert';
import If from '~/core/ui/If';

import MultiFactorAuthChallengeModal from '~/components/auth/MultiFactorAuthChallengeModal';
import { isMultiFactorError } from '~/core/firebase/utils/is-multi-factor-error';
import useCreateServerSideSession from '~/core/hooks/use-create-server-side-session';
import { useRequestState } from '~/core/hooks/use-request-state';

const UpdatePasswordForm: React.FCC<{ user: User }> = ({ user }) => {
  const { t } = useTranslation();
  const [currentPasswordType, setCurrentPasswordType] = useState('password');
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const [createServerSideSession] = useCreateServerSideSession();
  const requestState = useRequestState<void>();

  const [multiFactorAuthError, setMultiFactorAuthError] =
    useState<Maybe<MultiFactorError>>();

  const { register, handleSubmit, getValues, reset, formState } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      repeatPassword: '',
    },
  });

  const errors = formState.errors;

  const currentPasswordControl = register('currentPassword', {
    value: '',
    required: true,
    minLength: {
      value: 6,
      message: t<string>(`auth:passwordLengthError`),
    },
  });

  const newPasswordControl = register('newPassword', {
    value: '',
    required: true,
    minLength: {
      value: 6,
      message: t<string>(`auth:passwordLengthError`),
    },
    validate: (value) => {
      // current password cannot be the same as the current one
      if (value === getValues('currentPassword')) {
        return t<string>(`profile:passwordNotChanged`);
      }
    },
  });

  const repeatPasswordControl = register('repeatPassword', {
    value: '',
    required: true,
    minLength: {
      value: 6,
      message: t<string>(`auth:passwordLengthError`),
    },
    validate: (value) => {
      // new password and repeat new password must match
      if (value !== getValues('newPassword')) {
        return t<string>(`profile:passwordNotMatching`);
      }
    },
  });

  const reauthenticateUser = useCallback(
    (email: string, currentPassword: string) => {
      const emailAuthCredential = EmailAuthProvider.credential(
        email,
        currentPassword
      );

      // first, we check if the password is correct
      return reauthenticateWithCredential(user, emailAuthCredential).catch(
        (error) => {
          // if we hit a MFA error, it means we need to display an MFA modal
          // and request the verification code sent by SMS
          if (isMultiFactorError(error)) {
            setMultiFactorAuthError(error);
          } else {
            // otherwise, it's a simple error, meaning the user wasn't able
            // to authenticate
            requestState.setError(error);
            return Promise.reject(error);
          }
        }
      );
    },
    [user, setMultiFactorAuthError, requestState]
  );

  const updatePasswordFromCredential = useCallback(
    async (credential: UserCredential, newPassword: string) => {
      const promise = new Promise<void>(async (resolve, reject) => {
        try {
          // then, we update the user password
          await updatePassword(user, newPassword);

          // finally, we re-create the server token
          await createServerSideSession(credential.user);

          // set request as successful, so we can reset the form
          requestState.setData();

          resolve();
        } catch (e) {
          reject(e);
        }
      });

      return await toast.promise(promise, {
        success: t(`profile:updatePasswordSuccess`),
        error: t(`profile:updatePasswordError`),
        loading: t(`profile:updatePasswordLoading`),
      });
    },
    [requestState, createServerSideSession, t, user]
  );

  const updatePasswordCallback = useCallback(
    async (user: User, currentPassword: string, newPassword: string) => {
      const email = user.email;

      // if the user does not have an email assigned, it's possible they
      // don't have an email/password factor linked, and the UI is out of sync
      if (!email) {
        return Promise.reject(t(`profile:cannotUpdatePassword`));
      }

      try {
        // first, we check if the password is correct
        const credential = await reauthenticateUser(email, currentPassword);

        // when credential does not exist, it's possible we're in the MFA
        // flow or an error was raised
        // either way, we cannot continue without
        if (!credential) {
          return;
        }

        return await updatePasswordFromCredential(credential, newPassword);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    [reauthenticateUser, updatePasswordFromCredential, t]
  );

  const onSubmit = useCallback(
    async (params: { currentPassword: string; newPassword: string }) => {
      const { newPassword, currentPassword } = params;

      requestState.setLoading(true);

      return updatePasswordCallback(user, currentPassword, newPassword).catch(
        (e) => {
          requestState.setError(t(`profile:updatePasswordError`));

          return e;
        }
      );
    },
    [t, user, requestState, updatePasswordCallback]
  );

  // reset form on success
  useEffect(() => {
    if (requestState.state.success) {
      reset();
      requestState.resetState();
    }
  }, [reset, requestState]);

  return (
    <>
      <form data-cy={'update-password-form'} onSubmit={handleSubmit(onSubmit)}>
        <div className={'flex flex-col space-y-4'}>
          <If condition={requestState.state.error}>
            <div data-cy={'update-password-error-alert'}>
              <Alert type={'error'}>{requestState.state.error as string}</Alert>
            </div>
          </If>

          <TextField>
            <TextField.Label>
              <Trans i18nKey={'profile:currentPassword'} />

              <TextField.Input
                {...currentPasswordControl}
                data-cy={'current-password'}
                type={currentPasswordType}
              />

              {currentPasswordType === 'password' && (
                <svg
                  className={'absolute right-3 top-1/2 h-5 w-5 cursor-pointer'}
                  onClick={() => setCurrentPasswordType('text')}
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
              {currentPasswordType === 'text' && (
                <svg
                  className={'absolute right-3 top-1/2 h-5 w-5 cursor-pointer'}
                  onClick={() => setCurrentPasswordType('password')}
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
            <TextField.Error error={errors.currentPassword?.message} />
          </TextField>

          <TextField>
            <TextField.Label>
              <Trans i18nKey={'profile:newPassword'} />

              <TextField.Input
                {...newPasswordControl}
                data-cy={'new-password'}
                required
                type={passwordType}
              />
              {passwordType === 'password' && (
                <svg
                  className={'absolute right-3 top-1/2 h-5 w-5 cursor-pointer'}
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
                  className={'absolute right-3 top-1/2 h-5 w-5 cursor-pointer'}
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
            <TextField.Error
              data-cy={'new-password-error'}
              error={errors.newPassword?.message}
            />
          </TextField>

          <TextField>
            <TextField.Label>
              <Trans i18nKey={'profile:repeatPassword'} />

              <TextField.Input
                {...repeatPasswordControl}
                data-cy={'repeat-new-password'}
                required
                type={confirmPasswordType}
              />
              {confirmPasswordType === 'password' && (
                <svg
                  className={'absolute right-3 top-1/2 h-5 w-5 cursor-pointer'}
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
                  className={'absolute right-3 top-1/2 h-5 w-5 cursor-pointer'}
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

            <TextField.Error
              data-cy={'repeat-password-error'}
              error={errors.repeatPassword?.message}
            />
          </TextField>

          <div>
            <Button
              className={'w-full md:w-auto'}
              loading={requestState.state.loading}
            >
              <Trans i18nKey={'profile:updatePasswordSubmitLabel'} />
            </Button>
          </div>
        </div>
      </form>

      <If condition={multiFactorAuthError}>
        {(error) => (
          <MultiFactorAuthChallengeModal
            error={error}
            isOpen={true}
            setIsOpen={() => setMultiFactorAuthError(undefined)}
            onSuccess={async (credential) => {
              await updatePasswordFromCredential(
                credential,
                getValues('newPassword')
              );

              setMultiFactorAuthError(undefined);
            }}
          />
        )}
      </If>
    </>
  );
};

export default UpdatePasswordForm;
