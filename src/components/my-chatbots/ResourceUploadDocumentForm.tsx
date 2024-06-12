import toaster from 'react-hot-toast';
import React, { useCallback, useState } from 'react';
import FileUploadInput from '~/core/ui/FileUploadInput';
import { useForm } from 'react-hook-form';
import Button from '~/core/ui/Button';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useStorage } from 'reactfire';
import { useRouter } from 'next/router';
import useCurrentChatbot from '~/lib/chatbot/hooks/use-current-chatbot';
import useUpdateChatbot from '~/lib/chatbot/hooks/use-update-chatbot';
import { v4 as uuid } from 'uuid';
import { useUserId } from '~/core/hooks/use-user-id';
import PageLoadingIndicator from '~/core/ui/PageLoadingIndicator';
import { uploadPdfToSupabase } from 'src/services/chatbot';

const ResourceUploadDocumentForm = ({ closeModal }) => {
  const storage = useStorage();
  const router = useRouter();
  const uid = useUserId();
  const { slug } = router.query;
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      docURL: '',
    },
  });

  const { data } = useCurrentChatbot(String(slug));
  const updateChatbot = useUpdateChatbot(String(slug));

  const onDocCleared = useCallback(() => {
    setValue('docURL', '');
  }, [setValue]);

  const docURLControl = register('docURL');

  const onSubmit = async (docFile: Maybe<File>) => {
    if (!docFile) {
      return toaster.error('Please select file first!');
    }
    const fileSize = docFile.size/ (1024 ** 2);
    if(fileSize > 4){
      return toaster.error("File size should not be more than 4mb.");
    }
   
    setLoading(true);
    if (isUploaded) {
      return;
    }
    // upload pdf to supabase
    await uploadPdfToSupabase({
      namespaceId: slug,
      file: docFile,
    });
    const location = `/${uid}/resources/${slug}/${Date.now()}-${docFile.name}`;
    const storageRef = ref(storage, location);
    const bytes = await docFile.arrayBuffer();
    await uploadBytes(storageRef, bytes, {
      contentType: docFile.type,
    });
    setIsUploaded(true);
    const docUrl = await getDownloadURL(storageRef);
    const documents = data.sourceOfInformation?.documents || [];
    const newDocument = {
      url: docUrl,
      id: uuid(),
      fileName: docFile.name,
      dateAdded: new Date().toISOString(),
      contentType: docFile.type,
      storageLocation: location,
    };
    updateChatbot({
      sourceOfInformation: {
        ...data.sourceOfInformation,
        documents: [...documents, newDocument],
      },
    });
    setValue('docURL', '');
    // TODO
    toaster.success('Document uploaded successfully.');
    setLoading(false);
    if (closeModal !== false) {
      closeModal();
    }
  };
  return (
    <form
      data-cy={'update-profile-form'}
      onSubmit={handleSubmit((value) => {
        return onSubmit(getFile(value.docURL));
      })}
    >
      {loading && (
        <PageLoadingIndicator displayLogo={false}>
          Uploading...
        </PageLoadingIndicator>
      )}
      <FileUploadInput
        {...docURLControl}
        multiple={false}
        onClear={onDocCleared}
      >
        Upload Document
      </FileUploadInput>
      <Button className={'mt-5 w-full md:w-auto'} loading={false}>
        Upload
      </Button>
    </form>
  );
};
export default ResourceUploadDocumentForm;

function getFile(value: string | null | FileList) {
  if (!value || typeof value === 'string') {
    return;
  }

  return value.item(0) ?? undefined;
}
