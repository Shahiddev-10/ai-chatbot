import { useRef, useState } from 'react';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import useCreateMessage from '~/lib/user/hooks/use-create-message';
import {
  UserCircleIcon,
  EnvelopeIcon,
  PencilSquareIcon,
  ArrowSmallRightIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import Alert from '~/core/ui/Alert';

const MailChimpSignupForm: React.FCC = ({ children }) => {
  const emailRef = useRef<any>(null);
  const nameRef = useRef<any>(null);
  const messageRef = useRef<any>(null);
  const createWaitlist = useCreateMessage();
  const [response, setResponse] = useState(null);

  const [successAlert, setSuccessAlert] = useState(false)
  const [errorAlert, setErrorAlert] = useState(false)

  const subscribeUser = async (e: any) => {
    e.preventDefault();
    setResponse(null);
    if (
      emailRef.current &&
      emailRef.current?.value 
      // &&
      // nameRef.current &&
      // nameRef.current?.value &&
      // messageRef.current &&
      // messageRef.current?.value
    ) {
      // firebase document insertion
      createWaitlist({
        email: emailRef.current?.value,
        name: nameRef.current?.value ?? "",
        message: messageRef.current?.value ?? "",
        messageDate: new Date().toISOString(),
      }).then(() => {
        setSuccessAlert(true)
        setTimeout(() => {
          setSuccessAlert(false)
        }, 5000);
        // toast.success("Message sent successfully, we'll contact soon")
      });
      // this is where your mailchimp request is made
      emailRef.current.value = '';
     
    }
  };

  return (
    <>
      <form
        onSubmit={subscribeUser}
        className={`block justify-center lg:flex-row `}
      >
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
            Thank you for subscribe to our newsletter.
            </Alert.Heading>
          </Alert>
        )}
        <div className="grid grid-cols-1 lg:overflow-hidden">
          {/* <TextField>
            <UserCircleIcon
              className={'absolute bottom-0 top-0 my-auto block h-6 text-white'}
            />
            <TextField.Input
              ref={nameRef}
              required
              autoCapitalize="off"
              autoCorrect="off"
              type="text"
              placeholder={'Enter Name'}
              className="font-Outfit"
              name="user_name"
              withIcon
            />
          </TextField> */}
          <TextField>
            <EnvelopeIcon
              className={'absolute bottom-0 top-0 my-auto block h-6 text-white'}
            />
            <TextField.Input
              type="email"
              className="ns-b w-full font-Outfit !border-b  !border-gray_bg-1 h-[60px] text-lg md:text-base lg:text-lg md:h-[45px]"
             
              name="email_address"
              aria-label="Your email address"
              placeholder="Enter Email"
              ref={emailRef}
              required
              autoCapitalize="off"
              autoCorrect="off"
              withIcon
            />
          </TextField>
        </div>
        {/* <TextField>
          <PencilSquareIcon
            className={'absolute bottom-0 top-0 my-auto block h-6 text-white'}
          />
          <TextField.Input
            ref={messageRef}
            type="textarea"
            className="h-20 w-full font-Outfit"
            name="message"
            placeholder="Type your message"
            autoCapitalize="off"
            autoCorrect="off"
            required
            withIcon
          />
        </TextField> */}
        <Button
          type="submit"
          value=""
          name="subscribe"
          className="group mt-5 w-full	border-2	border-btncolor-0 font-Outfit text-lg text-btncolor-0 transition delay-75 ease-linear hover:shadow-btn-shadow"
        >
          {children}
          <ArrowSmallRightIcon className={'hidden h-6	group-hover:block'} />
        </Button>
      </form>
    </>
  );
};

export default MailChimpSignupForm;
