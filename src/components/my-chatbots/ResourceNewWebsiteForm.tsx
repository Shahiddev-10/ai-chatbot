import toaster from 'react-hot-toast';
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '~/core/ui/Button';
import { useRouter } from 'next/router';
import useCurrentChatbot from '~/lib/chatbot/hooks/use-current-chatbot';
import useUpdateChatbot from '~/lib/chatbot/hooks/use-update-chatbot';
import { v4 as uuid } from 'uuid';
import TextField from '~/core/ui/TextField';

const ResourceNewWebsiteForm = () => {
  const router = useRouter();

  const { slug } = router.query;
  const { data } = useCurrentChatbot(String(slug));
  const updateChatbot = useUpdateChatbot(String(slug));

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      websiteControl: '',
    },
  });

  const onSubmit = async (websiteControl: string) => {
    if (!websiteControl) {
      return toaster.error('Please enter website first!');
    }
    if (websiteControl && !isValidHttpUrl(websiteControl)) {
      return toaster.error('Please enter valid website!');
    }
    const website = data.sourceOfInformation?.websites || [];
    const newWebsite = {
      website: websiteControl,
      id: uuid(),
      dateAdded: new Date().toISOString(),
    };
    updateChatbot({
      sourceOfInformation: {
        ...data.sourceOfInformation,
        websites: [...website, newWebsite],
      },
    });
    setValue('websiteControl', '');
    toaster.success('Website added successfully.');

    router.push(`/my-chatbots/${slug}/customize/resource/website`);
  };

  const websiteControl = register('websiteControl', {
    value: '',
  });
  return (
    <div className={'w-full lg:max-w-5xl'}>
      <form
        onSubmit={handleSubmit((value) => {
          return onSubmit(value.websiteControl);
        })}
      >
        <div className={'flex flex-col space-y-4'}>
          <TextField>
            <TextField.Label>
              Website
              <TextField.Input
                {...websiteControl}
                minLength={5}
                placeholder={'www.your-website.domain'}
                required
              />
            </TextField.Label>
          </TextField>
          <div>
            <Button className={'w-full md:w-auto'}>Add Website</Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ResourceNewWebsiteForm;

function isValidHttpUrl(website: string) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );
  return pattern.test(website);
}
