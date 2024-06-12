import { useCallback, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

import type Workspace from '~/lib/workspaces/types/workspace';
import Heading from '~/core/ui/Heading';
import Button from '~/core/ui/Button';
import CardButton from '~/core/ui/CardButton';
import CreateWorkspaceModal from '~/components/workspaces/CreateWorkspaceModal';
import useCanCreateWorkspaces from '~/lib/workspaces/hooks/use-can-create-workspaces';
import If from '~/core/ui/If';

function WorkspacesList({
  workspaces,
}: React.PropsWithChildren<{
  workspaces: Workspace[];
}>) {
  console.log('🚀 ~ file: WorkspacesList.tsx:17 ~ workspaces:', workspaces);
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const canCreateWorkspaces = useCanCreateWorkspaces(workspaces.length);

  if (workspaces.length === 0) {
    return (
      <>
        <EmptyWorkspacesList
          setIsCreatingWorkspace={setIsCreatingWorkspace}
          isCreatingWorkspace={isCreatingWorkspace}
        />
        <CreateWorkspaceModal
          isOpen={isCreatingWorkspace}
          setIsOpen={setIsCreatingWorkspace}
        />
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <If condition={true}>
          {/* // [v2] use thresholds to enforce number of workspaces based on billing plan */}
          {/* <If condition={canCreateWorkspaces}> */}
          <NewWorkspaceButton onClick={() => setIsCreatingWorkspace(true)} />
        </If>

        {workspaces.map((workspace) => (
          <WorkspaceItem key={workspace.id} workspace={workspace} />
        ))}
      </div>

      <CreateWorkspaceModal
        isOpen={isCreatingWorkspace}
        setIsOpen={setIsCreatingWorkspace}
      />
    </>
  );
}

function WorkspaceItem({
  workspace,
}: React.PropsWithChildren<{
  workspace: Workspace;
}>) {
  return (
    // TODO : change teh workspace page
    <CardButton href={`/workspaces/${workspace.id}/chats`}>
      <div>
        <span className={'text-sm'}>{workspace.name}</span>
      </div>
    </CardButton>
  );
}

function EmptyWorkspacesList({ setIsCreatingWorkspace, isCreatingWorkspace }) {
  // const onCreateWorkspace = () => {
  //   setIsCreatingWorkspace(true);
  // };

  return (
    <div className={'flex flex-1 items-center justify-center'}>
      <div className={'flex flex-col items-center space-y-4'}>
        <Heading type={5}>You don&apos;t have any workspaces yet.</Heading>

        <div>Let&apos;get started by creating a workspace.</div>

        <div>
          <Button
            loading={isCreatingWorkspace}
            onClick={() => setIsCreatingWorkspace(true)}
          >
            {isCreatingWorkspace ? 'Creating Workspace...' : 'Create Workspace'}
          </Button>
        </div>
      </div>
    </div>
  );
}

function NewWorkspaceButton(
  props: React.PropsWithChildren<{
    onClick: () => void;
  }>
) {
  return (
    <Button className={'!rounded-sm'} onClick={props.onClick}>
      <span className={'flex items-center space-x-2.5'}>
        <PlusCircleIcon className={'h-6'} />

        <span>Create Workspace</span>
      </span>
    </Button>
  );
}

export default WorkspacesList;
