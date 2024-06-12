import { addDoc, collection } from 'firebase/firestore';
import { useCallback } from 'react';
import { useFirestore } from 'reactfire';
import { MESSAGE_COLLECTION } from '~/lib/firestore-collections';

function useCreateMessage() {
  const firestore = useFirestore();
  const waitlistCollection = collection(firestore, MESSAGE_COLLECTION);

  return useCallback(
    (user: {
      email: string;
      name: string;
      message: string;
      messageDate: string;
    }) => {
      return addDoc(waitlistCollection, user);
    },
    [waitlistCollection]
  );
}

export default useCreateMessage;
