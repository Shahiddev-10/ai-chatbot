import { Trans } from 'next-i18next';
import toaster from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import useCreateChatbot from '~/lib/chatbot/hooks/use-create-chatbot';
import { useRouter } from 'next/router';
import Heading from '~/core/ui/Heading';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import IconButton from '~/core/ui/IconButton';
import If from '~/core/ui/If';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/core/ui/Tooltip';

type DomainModel = ReturnType<typeof domainFactory>;

const MyChatbotsCreateContainer: React.FCC = () => {
  const { t } = useTranslation('organization');

  const [chatbotName, setChatbotName] = useState('');
  const [nameSpace, setNameSpace] = useState('');

  const { register, handleSubmit, setValue, control, clearErrors, watch } =
    useWhitespaceDomainForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'whitelistDomains',
    shouldUnregister: true,
  });
  const watchFieldArray = watch('whitelistDomains');
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const createChatbot = useCreateChatbot();
  const router = useRouter();

  const onSubmit = async (data: {
    chatbotName: string;
    namespaceId: string;
    whitelistDomains: { domain: string }[];
  }) => {
    console.log(data, '<--####');
    const promise = createChatbot(data)
      .then((res) => {
        router.push(`/my-chatbots/${String(res)}/customize/resource/`);
      })
      .catch((err) => {
        console.error(err, '####');
      });

    return toaster.promise(promise, {
      success: 'Chatbot Created Successfuly',
      error: 'Error while Creating Chatbot',
      loading: 'Creating Chatbot...',
    });
  };

  const displayChatbotNameControl = register('displayChatbotNameControl', {
    value: '',
  });

  const namespaceControl = register('namespaceControl', {
    value: '',
  });

  return (
    <>
      <div className={'mb-10 ml-0 w-full lg:max-w-5xl lg:pl-5 '}>
        <div className="mb-4 flex justify-between">
          <Heading type={2}>Create Chatbot</Heading>
        </div>
        <form
          className="mb-5"
          onSubmit={handleSubmit((value) => {
            console.log(chatbotName, nameSpace, value, '####->');
            return onSubmit({
              chatbotName: chatbotName,
              namespaceId: nameSpace,
              whitelistDomains: value.whitelistDomains,
            });
          })}
        >
          <div className={'flex flex-col space-y-4'}>
            <TextField>
              <TextField.Label className="!text-lg !font-normal	">
                Enter Chatbot Name
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="stroke-black absolute bottom-4 left-2 my-auto mr-5 block h-6	w-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
                <TextField.Input
                  // {...displayChatbotNameControl}
                  onChange={(e) => {
                    let x = e.target.value;
                    setChatbotName(x);
                  }}
                  minLength={2}
                  placeholder={''}
                  required
                  withIcon
                  className="block h-[60px] rounded-lg border !border-b  !border-gray_bg-1  font-Outfit text-lg  focus:border-gray_bg-2 focus:ring-gray_bg-2 dark:focus:border-gray_bg-2 dark:focus:ring-gray_bg-2"
                />
              </TextField.Label>
            </TextField>
            <TextField>
              <TextField.Label className="!text-lg !font-normal	">
                Enter Namespace
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="stroke-black absolute bottom-4 left-2 my-auto mr-5 block h-6	w-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                <TextField.Input
                  // {...namespaceControl}
                  onChange={(e) => {
                    let x = e.target.value;
                    setNameSpace(x);
                  }}
                  minLength={2}
                  placeholder={''}
                  required
                  withIcon
                  className="block h-[60px] rounded-lg border !border-b  !border-gray_bg-1  font-Outfit text-lg  focus:border-gray_bg-2 focus:ring-gray_bg-2 dark:focus:border-gray_bg-2 dark:focus:ring-gray_bg-2"
                />
              </TextField.Label>
            </TextField>
            <div className="flex flex-col space-y-2">
              {controlledFields.map((field, index) => {
                const domainInputName =
                  `whitelistDomains.${index}.domain` as const;

                // register email control
                const domainControl = register(domainInputName, {
                  required: true,
                });

                return (
                  <Fragment key={field.id}>
                    <div
                      className={'flex items-center space-x-0.5 md:space-x-2'}
                    >
                      <div className={'w-full '}>
                        <TextField>
                          <TextField.Label className="!text-lg !font-normal	">
                            Enter Whitelist Domain
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="stroke-black absolute bottom-4 left-2 my-auto mr-5 block h-6	w-6 text-white"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                              />
                            </svg>
                            <TextField.Input
                              {...domainControl}
                              placeholder=""
                              type="text"
                              required
                              withIcon
                              className="block h-[60px] rounded-lg border !border-b  !border-gray_bg-1  font-Outfit text-lg  focus:border-gray_bg-2 focus:ring-gray_bg-2 dark:focus:border-gray_bg-2 dark:focus:ring-gray_bg-2 "
                            />
                          </TextField.Label>
                        </TextField>
                      </div>

                      <If condition={fields.length > 1}>
                        <div className={'w-1/12'}>
                          <Tooltip className={'flex justify-center'}>
                            <TooltipTrigger>
                              <IconButton
                                label={t<string>('removeInviteButtonLabel')}
                                onClick={() => {
                                  remove(index);
                                  clearErrors(domainInputName);
                                }}
                              >
                                <XMarkIcon className={'h-4 lg:h-5'} />
                              </IconButton>
                            </TooltipTrigger>

                            <TooltipContent>Remove Domain</TooltipContent>
                          </Tooltip>
                        </div>
                      </If>
                    </div>
                  </Fragment>
                );
              })}

              <div>
                <Button
                  type={'button'}
                  color={'transparent'}
                  size={'small'}
                  onClick={() => append(domainFactory())}
                >
                  <span className={'flex items-center space-x-2'}>
                    <PlusCircleIcon className={'h-5'} />
                    <span>Add another domain</span>
                  </span>
                </Button>
              </div>
            </div>
            <div>
              <Button className={'w-full md:w-auto'}>
                <Trans i18nKey={'common:createChatBot'} />
              </Button>
            </div>
          </div>
        </form>
        <Button size={'small'} color={'transparent'} href={`/my-chatbots`}>
          <span className={'flex items-center space-x-1'}>
            <ArrowLeftIcon className={'h-3'} />
            <span>Go Back</span>
          </span>
        </Button>
      </div>
    </>
  );
};

export default MyChatbotsCreateContainer;

function domainFactory() {
  return {
    domain: '',
  };
}
function getFormValidator(domains: DomainModel[]) {
  return function isValueInvalid(value: string, index: number) {
    const emails = domains.map((member) => member.domain);
    const valueIndex = emails.indexOf(value);

    return valueIndex >= 0 && valueIndex !== index;
  };
}

function useWhitespaceDomainForm() {
  return useForm({
    defaultValues: {
      whitelistDomains: [domainFactory()],
      displayChatbotNameControl: '',
      namespaceControl: '',
    },
    shouldUseNativeValidation: true,
    shouldFocusError: true,
    shouldUnregister: true,
  });
}
