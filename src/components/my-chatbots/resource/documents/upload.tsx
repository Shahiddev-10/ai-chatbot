import React from 'react';
import ResourceUploadDocumentForm from '~/components/my-chatbots/ResourceUploadDocumentForm';
import ChatbotSettingsTile from '~/components/my-chatbots/ChatbotSettingsTile';
import FirebaseStorageProvider from '~/core/firebase/components/FirebaseStorageProvider';

const DocumentsUpload = ({ closeModal = false }) => {
  return (
    <>
      <div className={'w-full lg:max-w-4xl'}>
        <ChatbotSettingsTile
          heading={'Documents'}
          subHeading={'Upload document to train your chatbot.'}
        >
          <FirebaseStorageProvider>
            <ResourceUploadDocumentForm closeModal={closeModal} />
          </FirebaseStorageProvider>
        </ChatbotSettingsTile>
      </div>
    </>
  );
};

export default DocumentsUpload;
