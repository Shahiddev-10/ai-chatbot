import dynamic from 'next/dynamic';

const MailChimpSignupForm = dynamic(
  () => import('./newsletter/MailChimpSignupForm'),
  { ssr: false }
);

function NewsletterSignup() {
  return (
    <div className={'flex flex-col space-y-4'}>
      <div>
        <MailChimpSignupForm>Subscribe</MailChimpSignupForm>
        {/* <FirebaseStorageProvider>
        </FirebaseStorageProvider> */}
      </div>
    </div>
  );
}

export default NewsletterSignup;
