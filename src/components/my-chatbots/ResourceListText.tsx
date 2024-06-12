import { TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Divider from '~/core/ui/Divider';
import Heading from '~/core/ui/Heading';
import IconButton from '~/core/ui/IconButton';
import SubHeading from '~/core/ui/SubHeading';
import { Tooltip } from '~/core/ui/Tooltip';
import useCurrentChatbot from '~/lib/chatbot/hooks/use-current-chatbot';
import useUpdateChatbot from '~/lib/chatbot/hooks/use-update-chatbot';
import { Chatbot } from '~/lib/chatbot/types/chatbot';

const ResourceListText = () => {
  const router = useRouter();
  const { data, status }: { data: Chatbot; status: string } = useCurrentChatbot(
    String(router.query.slug)
  );

  useEffect(() => {
    if (
      data?.sourceOfInformation?.text &&
      !data?.sourceOfInformation?.text?.length
    ) {
      // ! Todo : uncomment when website and text is available
      // router.push(`/my-chatbots/${router.query.slug}/customize/resource/text/new`)
    }
  }, [data]);

  const updateChatbot = useUpdateChatbot(String(router.query.slug));

  const deleteDocument = (id: string) => {
    const text = data.sourceOfInformation?.text ?? [];

    const filteredText = text.filter((doc) => doc.id !== id);

    updateChatbot({
      sourceOfInformation: { ...data.sourceOfInformation, text: filteredText },
    });
  };

  return (
    <div>
      {data?.sourceOfInformation?.text &&
      data?.sourceOfInformation?.text?.length > 0 ? (
        (data?.sourceOfInformation?.text ?? []).map((text) => (
          <div className="my-2 flex" key={text.id}>
            <div>
              <div className="flex items-center">
                <Heading type={4}>{text.title}</Heading>
                <Tooltip content={`Delete Site`}>
                  <IconButton
                    onClick={(e: React.SyntheticEvent<EventTarget>) => {
                      e.stopPropagation();
                      deleteDocument(text.id);
                    }}
                  >
                    <TrashIcon className={'h-5 text-red-500'} />
                  </IconButton>
                </Tooltip>
              </div>
              <p className="mb-2 whitespace-break-spaces">{text.content}</p>
              <Divider />
            </div>
          </div>
        ))
      ) : (
        <SubHeading>You havn&apos;t added any text yet.</SubHeading>
      )}
    </div>
  );
};
export default ResourceListText;
