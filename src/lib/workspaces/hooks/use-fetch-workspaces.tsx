import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { collection, CollectionReference } from 'firebase/firestore';
import { useCurrentOrganization } from '~/lib/organizations/hooks/use-current-organization';
import Workspace from '~/lib/workspaces/types/workspace';

function useFetchWorkspaces() {
  const organization = useCurrentOrganization();
  const firestore = useFirestore();

  const workspacesCollection = collection(
    firestore,
    'organizations',
    organization?.id as string,
    'workspaces'
  ) as CollectionReference<Workspace>;

  return useFirestoreCollectionData(workspacesCollection, {
    idField: 'id',
  });
}

export default useFetchWorkspaces;