import toaster from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import { useRouter } from 'next/router';
import {
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import useCurrentChatbot from '~/lib/chatbot/hooks/use-current-chatbot';
import useUpdateChatbot from '~/lib/chatbot/hooks/use-update-chatbot';
import Textarea from '~/core/ui/Textarea';
import { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/core/ui/Tooltip';
import VisibilitySelector from './VisibilitySelector';
import ModelSelector from './ModelSelector';
import { v4 as uuid } from 'uuid';
import DomainsField from './DomainsField';

const ChatbotGeneralForm = () => {
  const router = useRouter();
  const { data: chatbot, status } = useCurrentChatbot(
    String(router.query.slug)
  );
  const updateChatbot = useUpdateChatbot(String(router.query.slug));
  const [chatbotVisibility, setChatbotVisibility] = useState<string>('Public');
  const [chatbotModel, setChatbotModel] = useState<string>('GPT-3.5');
  const [isValueLoaded, setIsValueLoaded] = useState<boolean>(false);
  const [tooltipToggle, setTooltipToggle] = useState({
    visibility: false,
    domain: false,
  });
  const [domains, setDomains] = useState<any>([]);

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      nameController: chatbot?.name ?? '',
      chatbotIdController: chatbot?.id ?? '',
      basePromptController: chatbot?.setting?.basePrompt ?? '',
      modelController: chatbot?.setting?.model ?? '',
      visibilityController: chatbot?.setting?.visibility ?? '',
      // domainController: chatbot?.setting?.domain ?? '',
    },
  });
  useEffect(() => {
    if (status === 'success' && !isValueLoaded) {
      setValue('nameController', chatbot?.name ?? '');
      setValue('chatbotIdController', chatbot?.id ?? '');
      setValue('basePromptController', chatbot?.setting?.basePrompt ?? '');
      // setValue('modelController', chatbot?.setting?.model ?? '');
      setChatbotModel(chatbot?.setting?.model ?? 'GPT-3.5');
      // setValue('domainController', chatbot?.setting?.domain ?? '');
      setChatbotVisibility(chatbot?.setting?.visibility ?? 'Public');
      setIsValueLoaded(true);
      setDomains([...chatbot?.whitelistDomains]);
    }
  }, [status, chatbot, setValue, isValueLoaded]);
  const onSubmit = async (value: any) => {
    const { nameController, basePromptController, domainController } = value;
    /* if (
      !nameController ||
      !basePromptController ||
      !chatbotModel ||
      !chatbotModel ||
      !chatbotVisibility ||
      !domainController
    ) {
      console.log('####->', {
      console.log('####->', {
        nameController,
        basePromptController,
        chatbotModel,
        chatbotModel,
        chatbotVisibility,
        domainController,
      });
        domainController,
      });
      return toaster.error('Please enter all fields!');
    } */

    updateChatbot({
      name: nameController,
      setting: {
        ...chatbot?.setting,
        basePrompt: basePromptController,
        model: chatbotModel,
        model: chatbotModel,
        visibility: chatbotVisibility,
      },
      whitelistDomains: [...domains],
    });

    toaster.success('Saved successfully.');

    router.push(`/my-chatbots/${String(router.query.slug)}/customize/general`);
  };

  const nameController = register('nameController', { value: '' });
  const chatbotIdController = register('chatbotIdController', { value: '' });
  const basePromptController = register('basePromptController', { value: '' });

  if (status === 'loading') {
    return <p className="text-center">Loading...</p>;
  }

  /**
   * Set Domains Function
   */
  const setDomainFn = (value: string) => {
    setDomains((prev: any) => [
      ...prev,
      {
        addedOn: new Date().toISOString(),
        domain: value,
        id: uuid(),
      },
    ]);
  };
  /**
   * To remove domain
   */
  const removeDomainFn = (id: string) => {
    let x = domains.filter((item: any) => item.id !== id);
    setDomains([...x]);
  };

  return (
    <div className={'mb-10 w-full lg:max-w-5xl'}>
      <div className="my-5 mb-5">
        <div className={'!mt-0 flex flex-col gap-5 lg:grid lg:grid-cols-2'}>
          <TextField>
            <TextField.Label className="!text-lg !font-normal">
              Chatbot Name
              <TextField.Input
                {...nameController}
                minLength={5}
                placeholder={''}
                className="block h-[60px] rounded-lg border !border-b  !border-gray_bg-1  font-Outfit text-lg  focus:border-gray_bg-2 focus:ring-gray_bg-2 dark:focus:border-gray_bg-2 dark:focus:ring-gray_bg-2"
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label className="!text-lg !font-normal">
              Chatbot ID
              <TextField.Input
                {...chatbotIdController}
                minLength={5}
                placeholder={''}
                required
                disabled
                className="block h-[60px] rounded-lg border !border-b  !border-gray_bg-1  font-Outfit text-lg  focus:border-gray_bg-2 focus:ring-gray_bg-2 dark:focus:border-gray_bg-2 dark:focus:ring-gray_bg-2 "
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label className="!text-lg !font-normal">
              Base Prompt(system message)
              <Textarea
                {...basePromptController}
                minLength={5}
                placeholder={''}
                className="block h-[60px] rounded-lg border !border-b  !border-gray_bg-1 font-Outfit text-lg  placeholder:text-gray_text-0"
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label className="!text-lg !font-normal">
              Model
              <ModelSelector value={chatbotModel} onChange={setChatbotModel} />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label className="!text-lg !font-normal">
              <span className="flex items-center gap-1">
                Visibility
                <Tooltip open={tooltipToggle.visibility}>
                  <TooltipTrigger>
                    <QuestionMarkCircleIcon
                      className="h-5"
                      onClick={() => {
                        setTooltipToggle((prev) => ({
                          ...prev,
                          visibility: !prev.visibility,
                        }));
                      }}
                    />
                  </TooltipTrigger>

                  <TooltipContent
                    side={'right'}
                    sideOffset={20}
                    className="w-80"
                    onPointerDownOutside={() => {
                      setTooltipToggle((prev) => ({
                        ...prev,
                        visibility: !prev.visibility,
                      }));
                    }}
                  >
                    Private: No one can access your chatbot except you
                    <br />
                    Private but can be embedded on website: Other people
                    can&apos;t access your chatbot if you send them the link,
                    but you can still embed it on your website and your website
                    visitors will be able to use it. (make sure to set your
                    domains)
                  </TooltipContent>
                </Tooltip>
              </span>
              <VisibilitySelector
                value={chatbotVisibility}
                onChange={setChatbotVisibility}
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label className="!text-lg !font-normal">
              <span className="flex items-center gap-1">
                Whitelist Domain
                <Tooltip open={tooltipToggle.domain}>
                  <TooltipTrigger>
                    <QuestionMarkCircleIcon
                      className="h-5"
                      onClick={() => {
                        setTooltipToggle((prev) => ({
                          ...prev,
                          domain: !prev.domain,
                        }));
                      }}
                    />
                  </TooltipTrigger>

                  <TooltipContent
                    side={'right'}
                    sideOffset={20}
                    className="w-80"
                    onPointerDownOutside={() => {
                      setTooltipToggle((prev) => ({
                        ...prev,
                        domain: !prev.domain,
                      }));
                    }}
                  >
                    Domain you want to embed your chatbot on. Your chatbot
                    visibility has to be &apos;Public&apos; or &apos;Private but
                    can be embedded on website&apos; for this to work.
                  </TooltipContent>
                </Tooltip>
              </span>

              <DomainsField
                domains={domains}
                setDomains={setDomainFn}
                removeDomain={(id: string) => {
                  removeDomainFn(id);
                }}
              />
            </TextField.Label>
          </TextField>
          <div>
            <Button
              className={'w-full md:w-auto'}
              type="button"
              onClick={handleSubmit((value) => {
                return onSubmit(value);
              })}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      <Button size={'small'} color={'transparent'} href={`/my-chatbots`}>
        <span className={'flex items-center space-x-1'}>
          <ArrowLeftIcon className={'h-3'} />
          <span>Go Back</span>
        </span>
      </Button>
    </div>
  );
};
export default ChatbotGeneralForm;
