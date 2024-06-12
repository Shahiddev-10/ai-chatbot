import toaster from 'react-hot-toast';
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '~/core/ui/Button';
import { useRouter } from 'next/router';
import useCurrentChatbot from '~/lib/chatbot/hooks/use-current-chatbot';
import useUpdateChatbot from '~/lib/chatbot/hooks/use-update-chatbot';
import { v4 as uuid } from 'uuid';
import TextField from '~/core/ui/TextField';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Label from '~/core/ui/Label';
import Textarea from '~/core/ui/Textarea';

const ResourceNewTextForm = () => {
  const router = useRouter();

  const { slug } = router.query;
  const { data } = useCurrentChatbot(String(slug));
  const updateChatbot = useUpdateChatbot(String(slug));

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      titleControl: '',
      contentControl: '',
    },
  });

  const onSubmit = async (titleControl: string, contentControl: string) => {
    if (!titleControl) {
      return toaster.error('Please enter Title!');
    }
    if (!contentControl) {
      return toaster.error('Please enter Content!');
    }
    const text = data.sourceOfInformation?.text || [];
    const newText = {
      id: uuid(),
      title: titleControl,
      content: contentControl,
      dateAdded: new Date().toISOString(),
    };
    updateChatbot({
      sourceOfInformation: {
        ...data.sourceOfInformation,
        text: [...text, newText],
      },
    });
    setValue('titleControl', '');
    setValue('contentControl', '');
    toaster.success('Text added successfully.');

    router.push(`/my-chatbots/${slug}/customize/resource/text`);
  };

  const titleControl = register('titleControl', {
    value: '',
  });
  const contentControl = register('contentControl', {
    value: '',
  });
  return (
    <div className={'mb-10 w-full lg:max-w-5xl'}>
      <form
        className="mb-5 pl-10"
        onSubmit={handleSubmit((value) => {
          return onSubmit(value.titleControl, value.contentControl);
        })}
      >
        <div className={'flex flex-col space-y-4'}>
          <TextField>
            <TextField.Label>
              Title
              <TextField.Input
                {...titleControl}
                minLength={5}
                placeholder={''}
                required
              />
            </TextField.Label>
          </TextField>
          <Label>
            Content
            <Textarea
              {...contentControl}
              minLength={10}
              placeholder={''}
              className={'h-96'}
              required
            ></Textarea>
          </Label>
          <div>
            <Button className={'w-full md:w-auto'}>Add Text</Button>
          </div>
        </div>
      </form>
      <Button
        size={'small'}
        color={'transparent'}
        href={`/my-chatbots/${slug}/customize/resource/text`}
      >
        <span className={'flex items-center space-x-1'}>
          <ArrowLeftIcon className={'h-3'} />
          <span>Go Back</span>
        </span>
      </Button>
    </div>
  );
};
export default ResourceNewTextForm;
