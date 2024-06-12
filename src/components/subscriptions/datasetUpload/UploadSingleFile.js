import { ref, uploadBytes } from 'firebase/storage';
import toaster from 'react-hot-toast';
import { useStorage } from 'reactfire';
import InputFile from '~/core/ui/InputFile';
import FirebaseStorageProvider from '~/core/firebase/components/FirebaseStorageProvider';
import { useCurrentOrganization } from '~/lib/organizations/hooks/use-current-organization';

export default function UploadFileComponent() {
  const storage = useStorage();
  const organization = useCurrentOrganization();

  async function uploadFile(e) {
    try {
      const file = e.target[0]?.files[0];
      console.log({ file });
      if (!organization) return;

      const organizationId = organization.id;
      const path = `organizations/${organizationId}/uploads/${file.name}`;
      const reference = ref(storage, path);

      const promise = await uploadBytes(reference, file, {
        cacheControl: 'max-age=31536000',
        customMetadata: {
          organizationId,
        },
      });

      // await toaster.promise(promise, {
      //   success: `Yay, uploaded!`,
      //   loading: `Uploading...`,
      //   error: `Error :(`,
      // });
    } catch (e) {
      console.log('upload file error', e, e.message);
    }
  }
  return (
    <div>
      <form multiple onSubmit={uploadFile}>
        <InputFile />
        <button>submit</button>
      </form>
    </div>
  );
}
