import { addDoc, collection } from 'firebase/firestore';
import { useCallback } from 'react';
import { useFirestore } from 'reactfire';
import { useUserId } from '~/core/hooks/use-user-id';
import { SUBSCRIPTION_MASTER_COLLECTION } from '~/lib/firestore-collections';
import { v4 as uuid } from 'uuid';
import { SubscriptionMaster } from '~/lib/organizations/types/subscription-master';

function useCreateMasterSubscription() {
  const firestore = useFirestore();
  const masterSubscriptionCollection = collection(
    firestore,
    SUBSCRIPTION_MASTER_COLLECTION
  );
  const userId = useUserId();

  return useCallback(
    ({
      name,
      description,
      features,
      badge,
      planType,
      planPrice,
      planPriceId,
      planDays,
    }: {
      name: string;
      description: string;
      badge?: string;
      features?: string;
      planType: string;
      planPrice: string;
      planPriceId: string;
      planDays: string;
    }) => {
      const subscriptionMaster: SubscriptionMaster = {
        name: name ?? '',
        description: description ?? '',
        badge: badge ?? '',
        features: features ?? '',
        planType: planType ?? '',
        planPrice: planPrice ?? '',
        planPriceId: planPriceId ?? '',
        planDays: planDays ?? '',
      };
      return addDoc(masterSubscriptionCollection, subscriptionMaster);
    },
    [masterSubscriptionCollection]
  );
}

export default useCreateMasterSubscription;
