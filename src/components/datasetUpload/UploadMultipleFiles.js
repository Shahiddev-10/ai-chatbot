import { ref, uploadBytes } from 'firebase/storage';
import toaster from 'react-hot-toast';
import { useStorage } from 'reactfire';
import Button from '~/core/ui/Button';
import { useState } from 'react';
import { useCurrentOrganization } from '~/lib/organizations/hooks/use-current-organization';

import { useDropzone } from 'react-dropzone';
import FirebaseStorageProvider from '~/core/firebase/components/FirebaseStorageProvider';

import configuration from '~/configuration';

export default function UploadFileComponent() {
  const { maxFileSize } = configuration.dataset;
  const [data, setData] = useState('');
  const storage = useStorage();
  const organization = useCurrentOrganization();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  // const onDrop = (e) => {
  //   console.log('on drop');
  //   console.log({ e, f: e.target, a: e.target[0].files });
  // };

  async function handleClickUploadFiles(e) {
    try {
      e.preventDefault();
      console.log('uploadFile fn accepted files', acceptedFiles);
      // const file = e.target[0]?.files[0];
      // const file = acceptedFiles[0];
      // console.log({ file, target: e.target, e: e });
      if (!organization) return;

      for (let index = 0; index < acceptedFiles.length; index++) {
        const currentFile = acceptedFiles[index];
        if (currentFile.size > maxFileSize) {
          toaster.error(
            'Seem like one of your files exceeds our 20MB File Limit. Please contact us to increase your file size limit'
          );
          return;
        }
      }

      // Currenrly only doing 1 file
      const promise = uploadAndIngestSingleFileAsPromise(acceptedFiles[0]);

      // FIXME: To support mutlipel files
      // const promise = Promise.all(
      //   acceptedFiles.map(
      //     async (currentFile) => await uploadFileAsPromise(currentFile)
      //   )
      // );
      // for (let index = 0; index < acceptedFiles.length; index++) {
      //   const currentFile = acceptedFiles[index];
      //   await uploadFileAsPromise(currentFile);
      //   console.log('uploading file in loop', currentFile.name);
      // }

      await toaster.promise(promise, {
        success: `Files Uploaded`,
        loading: `Uploading...`,
        error: `Sorry an error occured. Please try again.`,
      });
    } catch (e) {
      console.log('upload file error', e, e.message);
    }
  }

  const uploadAndIngestSingleFileAsPromise = async (file) => {
    const organizationId = organization.id;

    // TODO add project details in path
    const path = `organizations/${organizationId}/uploads/${file.name}`;

    const reference = ref(storage, path);

    console.log('uploading file in promise', file.name);

    const fileReference = await uploadBytes(reference, file, {
      cacheControl: 'max-age=31536000',
      customMetadata: {
        organizationId,
      },
    });

    // send file to backend for ingesting

    await sendFileToApiForIngesting(file);

    // console.log(
    //   '🚀 ~ file: UploadMultipleFiles.js:58 ~ uploadFileAsPromise ~ fileReference:',
    //   JSON.stringify(fileReference),
    //   fileReference
    // );
  };

  const sendFileToApiForIngesting = async (file) => {
    try {
      // console.log(
      //   '🚀 ~ file: UploadMultipleFiles.js:90 ~ sendFileToApiForIngesting ~ file:',
      //   file
      // );
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', file.name);

      const path = '/api/engine/ingestFilesToPineconeWithBuffer';
      const path2 = '/api/engine/ingestFilesToPineconeWithFormidable';

      const res = await fetch(path2, {
        body: formData,
        method: 'POST',
      });
      const res2 = await res.json();
      console.log('🚀 ~ file: UploadMultipleFiles.js:113 ~ res ~ res:', res2);

      setData(res2.data);

      // DIV trying to process splitter in front end

      // DIV end
    } catch (e) {
      console.log('error in sendFIletoAPI', e, e.message);
    }
  };

  // const sendFileToApiForIngesting = async (file) => {
  //   try {
  //     console.log('file received in sendFiletoAPI', file.name);

  //     const filename = encodeURIComponent(file.name);
  //     const res = await fetch(`/api/ingesFilesToPinecone`);

  //     const { url, fields } = await res.json();
  //     const formData = new FormData();

  //     Object.entries({ ...fields, file }).forEach(([key, value]) => {
  //       formData.append(key, value);
  //     });

  //     const upload = await fetch(url, {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (upload.ok) {
  //       console.log('Uploaded successfully!');
  //     } else {
  //       console.error('Upload failed.');
  //     }
  //   } catch (e) {
  //     console.log('error in sendFIletoAPI', e, e.message);
  //   }
  // };

  return (
    <FirebaseStorageProvider>
      <div className="" id="uploadMultipleFiles">
        <form multiple onSubmit={handleClickUploadFiles} className="">
          {/* <InputFile /> */}
          <>
            <div
              {...getRootProps({
                className: 'dropzone flex w-full items-center justify-center',
              })}
            >
              <label
                // htmlFor="dropzone-file"
                className="dark:hover:bg-bray-800 flex h-96 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 "
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    aria-hidden="true"
                    className="mb-3 h-10 w-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input {...getInputProps()} />
              </label>
            </div>
            <br />
            <div>
              <h4>Files</h4>
              <ul>
                {acceptedFiles.map((file) => (
                  <li key={file.path}>
                    {file.path} - {file.size} bytes
                  </li>
                ))}
              </ul>
            </div>
            <Button className="mt-6" type="submit">
              Upload Files
            </Button>
          </>
        </form>
        <Button
          className="mt-6"
          // type="submit"
          onClick={sendFileToApiForIngesting}
        >
          Ingest
        </Button>
        {/* {data && data} */}
      </div>
    </FirebaseStorageProvider>
  );
}
