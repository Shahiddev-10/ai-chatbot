import { getDownloadURL, getStorage, ref } from 'firebase/storage';

async function useResourceURL(location: string) {
  const url = await getUrl(location);
  return url;
}

async function getUrl(location: string) {
  const storage = getStorage();
  const refLocation = ref(storage, location);
  const url = await getDownloadURL(refLocation);
  return url;
}

export default useResourceURL;
