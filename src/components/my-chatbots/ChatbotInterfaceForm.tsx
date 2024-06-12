import toaster from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import { useRouter } from 'next/router';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import useCurrentChatbot from '~/lib/chatbot/hooks/use-current-chatbot';
import useUpdateChatbot from '~/lib/chatbot/hooks/use-update-chatbot';
import { useCallback, useEffect, useState } from 'react';
import InterfaceAlignmentSelector from './InterfaceAlignmentSelector';
import InterfaceModeSelector from './InterfaceModeSelector';
import ImageUploadInput from '~/core/ui/ImageUploadInput';
import {
  FirebaseStorage,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { useUserId } from '~/core/hooks/use-user-id';
import { useStorage } from 'reactfire';
import ChatbotInterfaceUI from './ChatbotInterfaceUI';
import ColorSelectField from './ColorSelectField';

const ChatbotInterfaceForm: React.FC<{
  preview: boolean;
  showInterface: boolean;
}> = ({ preview, showInterface }) => {
  const router = useRouter();
  const { data: chatbot, status } = useCurrentChatbot(
    String(router.query.slug)
  );
  const updateChatbot = useUpdateChatbot(String(router.query.slug));
  const storage = useStorage();
  const uid = useUserId();
  const [mode, setMode] = useState<string>('Dark');
  const [chatbotAlignment, setChatbotAlignment] = useState<string>('Left');
  const [chatbotName, setChatbotName] = useState<string>('');
  const [userMessageColor, setUserMessageColor] = useState<string>('#fff');
  const [chatBotMessageColor, setChatBotMessageColor] =
    useState<string>('#fff');

  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      initialMessageController: chatbot?.customizations?.initialMessage ?? '',
      suggestedMessageController:
        chatbot?.customizations?.suggestedMessage ?? '',
      displayNameController: chatbot?.customizations?.displayName ?? '',
      chatbotIconController: chatbot?.customizations?.chatbotIcon ?? '',
      autoShowInitialMessageAfterController:
        chatbot?.customizations?.autoShowMessageAfter ?? '',
    },
    values: {
      initialMessageController: chatbot?.customizations?.initialMessage ?? '',
      suggestedMessageController:
        chatbot?.customizations?.suggestedMessage ?? '',
      displayNameController: chatbot?.customizations?.displayName ?? '',
      chatbotIconController: chatbot?.customizations?.chatbotIcon ?? '',
      autoShowInitialMessageAfterController:
        chatbot?.customizations?.autoShowMessageAfter ?? '',
    },
  });

  const [currentIconURL, setCurrentIconURL] = useState('');

  const [iconIsDirty, setIconIsDirty] = useState(false);

  const onIconCleared = useCallback(() => {
    setIconIsDirty(true);
    setValue('chatbotIconController', '');
  }, [setValue]);

  useEffect(() => {
    if (status === 'success' && chatbot) {
      setValue(
        'initialMessageController',
        chatbot?.customizations?.initialMessage ?? ''
      );
      setValue(
        'suggestedMessageController',
        chatbot?.customizations?.suggestedMessage ?? ''
      );
      setValue(
        'displayNameController',
        chatbot?.customizations?.displayName ?? ''
      );
      setChatbotName(chatbot?.customizations?.displayName ?? '');
      setUserMessageColor(chatbot?.customizations?.userMessageColor ?? '#fff');
      setChatBotMessageColor(chatbot?.customizations?.sendColor ?? '#fff');
      setValue(
        'chatbotIconController',
        chatbot?.customizations?.chatbotIcon ?? ''
      );
      setValue(
        'autoShowInitialMessageAfterController',
        chatbot?.customizations?.autoShowMessageAfter ?? ''
      );
      setCurrentIconURL(chatbot?.customizations?.chatbotIcon ?? '');
      setMode(chatbot?.customizations?.mode ?? 'Dark');
      setChatbotAlignment(
        chatbot?.customizations?.alignChatBubbleButton ?? 'Left'
      );
    }
  }, [status, chatbot, setValue]);

  const onSubmit = async (value: any) => {
    const {
      initialMessageController,
      suggestedMessageController,
      displayNameController,
      chatbotIconController,
      autoShowInitialMessageAfterController,
    } = value;
    /* if (
      !initialMessageController ||
      !suggestedMessageController ||
      !displayNameController ||
      !userMessageColorController ||
      !chatbotAlignment ||
      !sendColorController ||
      !mode ||
      !chatbotIconController ||
      !autoShowInitialMessageAfterController
    ) {
      return toaster.error('Please enter all fields!');
    } */
    const iconName = chatbotIconController[0]?.name;
    const iconUrl = iconName
      ? await uploadChatbotIcon(
          storage,
          chatbotIconController[0],
          String(uid),
          String(router.query.slug)
        )
      : currentIconURL;
    const isIconRemoved = iconIsDirty && !iconName;
    // delete existing photo if different
    if (isIconRemoved && currentIconURL) {
      try {
        await deleteObject(ref(storage, currentIconURL));
      } catch (e) {
        // old photo not found
      }
    }

    const promise = updateChatbot({
      customizations: {
        ...chatbot.customizations,
        initialMessage: initialMessageController,
        suggestedMessage: suggestedMessageController,
        displayName: displayNameController,
        userMessageColor: userMessageColor,
        alignChatBubbleButton: chatbotAlignment,
        sendColor: chatBotMessageColor,
        mode: mode,
        chatbotIcon: isIconRemoved ? '' : iconUrl,
        autoShowMessageAfter: autoShowInitialMessageAfterController,
      },
    });

    toaster.promise(promise, {
      success: 'Saved successfully',
      error: 'Error occurred',
      loading: 'Loading...',
    });

    router.push(
      `/my-chatbots/${String(router.query.slug)}/customize/interface`
    );
  };

  const initialMessageController = register('initialMessageController', {
    value: '',
  });
  const suggestedMessageController = register('suggestedMessageController', {
    value: '',
  });
  const displayNameController = register('displayNameController', {
    value: '',
  });
  const chatbotIconController = register('chatbotIconController', {
    value: '',
  });
  const autoShowInitialMessageAfterController = register(
    'autoShowInitialMessageAfterController',
    { value: '' }
  );
  return (
    <div className={'mb-10 w-full lg:max-w-5xl'}>
      <div className={`grid${preview ? '' : ' grid-cols-2'} gap-4`}>
        {(preview === false ||
          (preview === true && showInterface === false)) && (
          <form
            className="my-5 mb-5"
            onSubmit={handleSubmit((value) => {
              return onSubmit(value);
            })}
          >
            <div
              className={`flex flex-col space-y-4 chatbot-scrollbar${
                preview === false && ' h-[450px] overflow-y-scroll'
              }`}
            >
              <div className="grid grid-cols-1 gap-5">
                <TextField>
                  <TextField.Label className="!text-lg !font-normal">
                    Initial Message
                    <TextField.Input
                      {...initialMessageController}
                      placeholder={''}
                    />
                  </TextField.Label>
                </TextField>
                <TextField>
                  <TextField.Label className="!text-lg !font-normal">
                    Suggested Message
                    <TextField.Input
                      {...suggestedMessageController}
                      placeholder={''}
                    />
                  </TextField.Label>
                </TextField>
                <TextField>
                  <TextField.Label className="!text-lg !font-normal">
                    Display Name
                    <TextField.Input
                      onChange={(e) => {
                        let x = e.target.value;
                        setValue('displayNameController', x);
                        setChatbotName(x);
                      }}
                      placeholder={''}
                    />
                  </TextField.Label>
                </TextField>
              </div>
              <div
                className={`grid${preview === false && ' grid-cols-2'} gap-5`}
              >
                <TextField>
                  <TextField.Label className="!text-lg !font-normal">
                    User Message Color
                    <ColorSelectField
                      colorValue={userMessageColor}
                      setColorValue={(value: string) => {
                        setUserMessageColor(value);
                      }}
                    />
                  </TextField.Label>
                </TextField>
                <TextField>
                  <TextField.Label className="!text-lg !font-normal">
                    Send Color
                    <ColorSelectField
                      colorValue={chatBotMessageColor}
                      setColorValue={(value: string) => {
                        setChatBotMessageColor(value);
                      }}
                    />
                  </TextField.Label>
                </TextField>
                <TextField>
                  <TextField.Label className="!text-lg !font-normal">
                    Align Chat Bubble
                    <InterfaceAlignmentSelector
                      value={chatbotAlignment}
                      onChange={setChatbotAlignment}
                    />
                  </TextField.Label>
                </TextField>
                <TextField>
                  <TextField.Label className="!text-lg !font-normal">
                    Mode
                    <InterfaceModeSelector value={mode} onChange={setMode} />
                  </TextField.Label>
                </TextField>

                <TextField>
                  <TextField.Label className="!text-lg !font-normal">
                    Auto Show Initial Message After
                    <TextField.Input
                      {...autoShowInitialMessageAfterController}
                      placeholder={''}
                      type="number"
                      min={0}
                    />
                  </TextField.Label>
                </TextField>

                <TextField>
                  <TextField.Label className="!text-lg !font-normal">
                    <span className="mb-2">
                      Chatbot
                      {preview === false ? <br /> : ' '}
                      Icon
                    </span>
                    <ImageUploadInput
                      {...chatbotIconController}
                      multiple={false}
                      onClear={onIconCleared}
                      image={currentIconURL}
                      className=""
                    >
                      Chatbot Icon
                    </ImageUploadInput>
                  </TextField.Label>
                </TextField>
              </div>

              <div>
                <Button className={'w-full md:w-auto'}>Save</Button>
              </div>
            </div>
            <Button size={'small'} color={'transparent'} href={`/my-chatbots`}>
              <span className={'flex items-center space-x-1'}>
                <ArrowLeftIcon className={'h-3'} />
                <span>Go Back</span>
              </span>
            </Button>
          </form>
        )}
        {(preview === false ||
          (preview === true && showInterface === true)) && (
          <ChatbotInterfaceUI
            displayName={chatbotName}
            mobile={preview === true && showInterface === true}
          />
        )}
      </div>
    </div>
  );
};
export default ChatbotInterfaceForm;

async function uploadChatbotIcon(
  storage: FirebaseStorage,
  iconFile: File,
  userId: string,
  slug: string
) {
  console.log('###url', {
    iconFile,
    userId,
    slug,
  });
  const url = `/${userId}/icons/${slug}/${Date.now()}-${iconFile.name}`;
  console.log('###url', url);
  const bytes = await iconFile.arrayBuffer();
  const fileRef = ref(storage, url);

  await uploadBytes(fileRef, bytes, {
    contentType: iconFile.type,
  });

  return await getDownloadURL(fileRef);
}
