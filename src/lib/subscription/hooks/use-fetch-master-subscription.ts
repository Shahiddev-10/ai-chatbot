import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import {
  collection,
  CollectionReference,
  query,
  where,
} from 'firebase/firestore';
import { SUBSCRIPTION_MASTER_COLLECTION } from '~/lib/firestore-collections';
import { SubscriptionMaster } from '~/lib/organizations/types/subscription-master';

type Response = WithId<SubscriptionMaster>;

export function useFetchMasterSubscription() {
  const firestore = useFirestore();
  // const userId = useUserId();

  const ref = collection(
    firestore,
    SUBSCRIPTION_MASTER_COLLECTION
  ) as CollectionReference<Response>;

  // const path = `userId`;
  // const operator = '==';
  // const constraint = where(path, operator, userId);
  const subscriptionMasterQuery = query(ref);

  return useFirestoreCollectionData(subscriptionMasterQuery, { idField: 'id' });
}

export default useFetchMasterSubscription;
