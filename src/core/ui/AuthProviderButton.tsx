import Button from '../ui/Button';
import AuthProviderLogo from '~/core/ui/AuthProviderLogo';

const AuthProviderButton: React.FCC<{
  providerId: string;
  onClick: () => unknown;
}> = ({ children, providerId, onClick }) => {
  return (
    <Button
      data-cy={'auth-provider-button'}
      block
      color={'custom'}
      className={`relative rounded-lg border border-gray_bg-0  py-1 font-Outfit text-lg   font-normal text-gray_text-1 transition-all hover:text-gray_text-1	dark:bg-transparent dark:ring-primary-500/70 dark:focus:ring-offset-black-400 dark:active:bg-black-300`}
      onClick={onClick}
      data-provider={providerId}
    >
      <span className={'relative flex items-center justify-start pr-2'}>
        <AuthProviderLogo firebaseProviderId={providerId} />
      </span>

      <span className={'flex w-full place-content-center'}>
        <span className={'flex w-full items-center justify-center'}>
          <span className={'text-current'}>{children}</span>
        </span>
      </span>
    </Button>
  );
};

export default AuthProviderButton;
