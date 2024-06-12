import useSWRMutation from 'swr/mutation';
import { writeBatch, doc, addDoc, collection } from 'firebase/firestore';
import { useFirestore } from 'reactfire';

import { useCurrentOrganization } from '~/lib/organizations/hooks/use-current-organization';
import { useUserId } from '~/core/hooks/use-user-id';

import {
  ORGANIZATIONS_COLLECTION,
  WORKSPACES_COLLECTION,
} from '~/lib/firestore-collections';
// import firebase from 'firebase/app';
import { serverTimestamp } from 'firebase/firestore';

import configuration from '~/configuration';
import createRandomWorkspaceIdFromName from '~/lib/workspaces/createRandomWorkspaceIdFromName';

function useCreateWorkspace() {
  const organizationId = useCurrentOrganization()?.id;
  console.log(
    '🚀 ~ file: use-create-workspace.ts:15 ~ useCreateWorkspace ~ organizationId:',
    organizationId
  );
  const userId = useUserId();
  const firestore = useFirestore();

  const key = ['workspaces', organizationId];

  return useSWRMutation(key, async (_, { arg }: { arg: string }) => {
    if (!organizationId || !userId) {
      throw new Error('Organization or user is not defined');
    }

    const { OWNER } = configuration.workspace.roles;
    const { ONGOING } = configuration.workspace.status;

    const { name, description } = arg;
    const t = serverTimestamp();

    ///
    const batch = writeBatch(firestore);

    const role = OWNER;
    const workspace = {
      name,
      description,
      members: {
        [userId]: role,
      },
      createdAt: t,
      updatedAt: t,
      status: ONGOING,
      chatbotSytle: {},
      filesIngestedList: [],
    };

    const workspacesCollection = collection(
      firestore,
      ORGANIZATIONS_COLLECTION,
      organizationId,
      WORKSPACES_COLLECTION
    );

    // const workspaceRef = doc(workspacesCollection);
    // const workspaceId = workspaceRef.id;

    const workspaceId = createRandomWorkspaceIdFromName(name);

    const workspaceRef = doc(workspacesCollection, workspaceId);

    batch.set(workspaceRef, {
      ...workspace,
      workspaceIdAndPineconeNamespace: workspaceId,
    });

    const dataCollection = collection(
      firestore,
      ORGANIZATIONS_COLLECTION,
      organizationId,
      WORKSPACES_COLLECTION,
      workspaceId,
      'data'
    );

    // setting report template
    const workspaceData = { test: 'test' };
    const workspaceDataRef = doc(dataCollection, 'workspaceData');

    batch.set(workspaceDataRef, workspaceData);

    // commit all
    await batch.commit();

    return workspaceId;
  });
}

export default useCreateWorkspace;
