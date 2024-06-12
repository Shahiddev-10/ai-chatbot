import {
  ArrowDownTrayIcon,
  DocumentIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import IconButton from '~/core/ui/IconButton';
import { Tooltip } from '~/core/ui/Tooltip';
import useResourceURL from '~/lib/chatbot/hooks/use-resource-url';
import ChatbotSettingsTile from './ChatbotSettingsTile';
import Button from '~/core/ui/Button';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import Modal from '~/core/ui/Modal';
import DocumentsUpload from './resource/documents/upload';

const ResourceListDocument: React.FCC<{
  data: Array<Object>;
  deleteDocument: (id: string) => void;
}> = ({ data = [], deleteDocument }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div className="grid grid-cols-1">
      <ChatbotSettingsTile
        heading={'Documents'}
        subHeading={'Add document to train your chatbot.'}
        actions={
          <Button
            className={'w-full md:w-auto'}
            loading={false}
            type="button"
            onClick={() => setIsOpenModal(true)}
          >
            Upload new Document
          </Button>
        }
      >
        {data?.length > 0 &&
          data.map((doc: any) => (
            <Document deleteDocument={deleteDocument} doc={doc} key={doc.id} />
          ))}
      </ChatbotSettingsTile>
      <Modal
        heading={''}
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        closeButton={true}
        backDrop="static"
      >
        <DocumentsUpload
          closeModal={() => {
            setIsOpenModal(false);
          }}
        />
      </Modal>
    </div>
  );
};
export default ResourceListDocument;

const Document: React.FCC<{
  doc: {
    id: string;
    fileName: string;
    storageLocation: string;
  };
  deleteDocument: (id: string) => void;
}> = ({ doc, deleteDocument }) => {
  const storage = getStorage();

  const saveAs = (file: File) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  };
  const [loc, setLoc] = useState('');
  useResourceURL(doc.storageLocation).then((url) => setLoc(url));
  return (
    <div
      className="mb-5 flex items-center justify-between gap-2 rounded-md border-2 border-gray-800 px-3"
      key={doc.id}
    >
      <div className="flex gap-1">
        <DocumentIcon className="h-5" />
        <p>{doc.fileName}</p>
      </div>
      <div className="flex gap-1">
        <Tooltip content={`Download Document`}>
          <IconButton
            onClick={(e: React.SyntheticEvent<EventTarget>) => {
              e.stopPropagation();
              getDownloadURL(ref(storage, doc.storageLocation))
                .then((url) => {
                  const xhr = new XMLHttpRequest();

                  xhr.responseType = 'blob';

                  xhr.onload = () => {
                    const file = new File([xhr.response], doc.fileName, {
                      type: xhr.response.type,
                    });
                    saveAs(file);
                  };

                  xhr.open('GET', url);
                  xhr.send();
                  // axios.get(url).then((response) => {
                  //   console.log("Response ---> ", response);
                  // }, (rejected) => {
                  //   console.log("Rejected ---> ", rejected);
                  // }).catch((error) => {
                  //   console.log("Error ---> ", error);
                  // })
                })
                .catch((error: Error) => {
                  console.error('Error', error);
                });
            }}
          >
            <ArrowDownTrayIcon className={'h-5 text-primary-500'} />
          </IconButton>
        </Tooltip>
        <Tooltip content={`Delete Document`}>
          <IconButton
            onClick={(e: React.SyntheticEvent<EventTarget>) => {
              e.stopPropagation();
              deleteDocument(doc.id);
            }}
          >
            <TrashIcon className={'h-5 text-red-500'} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
