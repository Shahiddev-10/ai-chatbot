import { addDoc, collection } from 'firebase/firestore';
import { useCallback } from 'react';
import { useFirestore } from 'reactfire';
import { WAITLIST_COLLECTION } from '~/lib/firestore-collections';

function useCreateWaitlist() {
  const firestore = useFirestore();
  const waitlistCollection = collection(firestore, WAITLIST_COLLECTION);

  return useCallback(
    (user: { email: string; name: string; subscribeDate: string }) => {
      return addDoc(waitlistCollection, user);
    },
    [waitlistCollection]
  );
}

export default useCreateWaitlist;
