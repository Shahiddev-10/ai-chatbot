import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  UserCircleIcon,
  EnvelopeIcon,
  ArrowSmallRightIcon,
} from '@heroicons/react/24/outline';
import TextField from '~/core/ui/TextField';
import useCreateWaitlist from '~/lib/user/hooks/use-create-waitlist';
import Alert from '~/core/ui/Alert';

const JoinWaitlistForm: React.FCC = ({ children }) => {
  const inputNameRef = useRef<any>(null);
  const inputEmailRef = useRef<any>(null);

  const [successAlert, setSuccessAlert] = useState(false)
  const [errorAlert, setErrorAlert] = useState(false)

  const createWaitlist = useCreateWaitlist();

  const subscribeUser = async (e: any) => {
    e.preventDefault();
    if (
      inputNameRef.current &&
      inputNameRef.current?.value &&
      inputEmailRef.current &&
      inputEmailRef.current?.value
    ) {
      // firebase document insertion
      createWaitlist({
        email: inputEmailRef.current?.value,
        name: inputNameRef.current?.value,
        subscribeDate: new Date().toISOString(),
      });
      // this is where your mailchimp request is made
      const res = await fetch('/api/subscribe/waitlist', {
        body: JSON.stringify({
          email: inputEmailRef.current?.value,
          name: inputNameRef.current?.value,
        }),

        headers: {
          'Content-Type': 'application/json',
        },

        method: 'POST',
      });
      if (res && !res?.ok && res?.status !== 201) {
        setErrorAlert(true)
        setTimeout(() => {
          setErrorAlert(false)
        }, 5000);
        // toast.error('There is some error while joining waitlist.');
      }
      if (res && res?.ok && res?.status === 201) {
        // toast.success('Subscribed for waitlist successfully.');
        setSuccessAlert(true)
        setTimeout(() => {
          setSuccessAlert(false)
        }, 5000);
        inputNameRef.current.value = '';
        inputEmailRef.current.value = '';
      }
    }
  };

  return (
    <>
      {/* <If condition={response && !response?.ok && response?.status !== 201}>
                <Alert type={'error'} useCloseButton className='mb-5'>
                    <Alert.Heading>
                        There is some error while submittinfg your email address.
                    </Alert.Heading>
                </Alert>
            </If>
            <If condition={response && response?.ok && response?.status === 201}>
                <Alert type={'success'} useCloseButton className='mb-5'>
                    <Alert.Heading>
                        Subscribed for waitlist successfully.
                    </Alert.Heading>
                </Alert>
            </If> */}
      <form className={'w-full'} onSubmit={subscribeUser}>
        {errorAlert && (
          <Alert type={'error'}>
            <Alert.Heading>
              There is some error while joining waitlist.
            </Alert.Heading>
          </Alert>
        )}
        {successAlert && (
          <Alert type={'success'}>
            <Alert.Heading>
              Subscribed for waitlist successfully.
            </Alert.Heading>
          </Alert>
        )}
        <div className={'mt-2 grid gap-6 space-y-0 lg:grid-cols-2'}>
          <TextField>
            <UserCircleIcon
              className={
                'absolute bottom-0 top-0 my-auto mr-5 block h-6 text-white'
              }
            />
            <TextField.Input
              required
              data-cy={'username-input'}
              type="text"
              className="font-Outfit"
              placeholder={'Enter Name'}
              ref={inputNameRef}
              withIcon
            />
          </TextField>
          <TextField>
            <EnvelopeIcon
              className={
                'absolute bottom-0 top-0 my-auto mr-5 block h-6 text-white'
              }
            />

            <TextField.Input
              data-cy={'email-input'}
              required
              type="email"
              className="font-Outfit"
              placeholder={'Enter Email'}
              ref={inputEmailRef}
              withIcon
            />
          </TextField>
        </div>
        <button
          type="submit"
          className="group mx-auto mt-6	block	w-max cursor-pointer rounded-md border-2 border-btncolor-0 bg-none px-4 py-2 font-Outfit text-lg text-btncolor-0 transition delay-75 ease-linear hover:bg-btncolor-0 hover:text-[#000] hover:shadow-btn-shadow "
        >
          <span className={'flex items-center space-x-2'}>
            <span>Join The Waitlist</span>

            <ArrowSmallRightIcon className={'hidden h-6	group-hover:block'} />
          </span>
        </button>
      </form>
    </>
  );
};

export default JoinWaitlistForm;
