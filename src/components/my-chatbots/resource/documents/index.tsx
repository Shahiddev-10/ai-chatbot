import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ResourceListDocument from '~/components/my-chatbots/ResourceListDocument';
import useCurrentChatbot from '~/lib/chatbot/hooks/use-current-chatbot';
import { Chatbot } from '~/lib/chatbot/types/chatbot';
import useUpdateChatbot from '~/lib/chatbot/hooks/use-update-chatbot';
import toaster from 'react-hot-toast';
import DocumentsUpload from './upload';

const Documents = () => {
  const router = useRouter();
  const { data, status }: { data: Chatbot; status: string } = useCurrentChatbot(
    String(router.query.slug)
  );
  const updateChatbot = useUpdateChatbot(String(router.query.slug));

  const deleteDocument = (id: string) => {
    const document = data.sourceOfInformation?.documents ?? [];
    const filteredDocs = document.filter((doc) => doc.id !== id);
    updateChatbot({
      sourceOfInformation: {
        ...data.sourceOfInformation,
        documents: filteredDocs,
      },
    });
    toaster.success('Document deleted successfully.');
  };

  return (
    <>
      <Head>
        <title key={'title'}>Resource Documents</title>
      </Head>
      <div className={'w-full lg:max-w-4xl'}>
        {data?.sourceOfInformation?.documents &&
        data?.sourceOfInformation?.documents?.length > 0 ? (
          <ResourceListDocument
            data={data?.sourceOfInformation?.documents}
            deleteDocument={deleteDocument}
          />
        ) : (
          <DocumentsUpload />
        )}
      </div>
    </>
  );
};

export default Documents;
