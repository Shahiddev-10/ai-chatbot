import useFetchWorkspaces from '~/lib/workspaces/hooks/use-fetch-workspaces';
import PageLoadingIndicator from '~/core/ui/PageLoadingIndicator';
import Alert from '~/core/ui/Alert';
import WorkspacesList from '~/components/workspaces/WorkspacesList';

function WorkspacesListContainer() {
  const { data: workspaces, status } = useFetchWorkspaces();

  if (status === 'loading') {
    return <PageLoadingIndicator>Loading workspaces...</PageLoadingIndicator>;
  }

  if (status === 'error') {
    return (
      <Alert type={'error'}>
        <Alert.Heading>Something went wrong</Alert.Heading>
        Sorry, we couldn&apos;t load your workspaces. Please try again later.
      </Alert>
    );
  }

  return <WorkspacesList workspaces={workspaces} />;
}

export default WorkspacesListContainer;
