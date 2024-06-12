import { TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import IconButton from '~/core/ui/IconButton';
import SubHeading from '~/core/ui/SubHeading';
import { Tooltip } from '~/core/ui/Tooltip';
import useCurrentChatbot from '~/lib/chatbot/hooks/use-current-chatbot';
import useUpdateChatbot from '~/lib/chatbot/hooks/use-update-chatbot';
import { Chatbot } from '~/lib/chatbot/types/chatbot';

const ResourceListWebsite = () => {
  const router = useRouter();
  const { data, status }: { data: Chatbot; status: string } = useCurrentChatbot(
    String(router.query.slug)
  );

  useEffect(() => {
    if (
      data?.sourceOfInformation?.websites &&
      !data?.sourceOfInformation?.websites?.length
    ) {
      // ! Todo : uncomment when website and text is available
      // router.push(`/my-chatbots/${router.query.slug}/customize/resource/website/new`)
    }
  }, [data]);

  const updateChatbot = useUpdateChatbot(String(router.query.slug));

  const deleteDocument = (id: string) => {
    const website = data.sourceOfInformation?.websites ?? [];

    const filteredWebsites = website.filter((doc) => doc.id !== id);

    updateChatbot({
      sourceOfInformation: {
        ...data.sourceOfInformation,
        websites: filteredWebsites,
      },
    });
  };

  return (
    <div>
      {data?.sourceOfInformation?.websites &&
      data?.sourceOfInformation?.websites?.length > 0 ? (
        (data?.sourceOfInformation?.websites ?? []).map((web) => (
          <div className="my-2 flex" key={web.id}>
            <div className="flex items-center">
              <p className="mr-2">{web.website}</p>
              <Tooltip content={`Delete Site`}>
                <IconButton
                  onClick={(e: React.SyntheticEvent<EventTarget>) => {
                    e.stopPropagation();
                    deleteDocument(web.id);
                  }}
                >
                  <TrashIcon className={'h-5 text-red-500'} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ))
      ) : (
        <SubHeading>You havn&apos;t added any website yet.</SubHeading>
      )}
    </div>
  );
};
export default ResourceListWebsite;
