import { useCurrentOrganization } from '~/lib/organizations/hooks/use-current-organization';

function useCanCreateWorkspaces(workspaces: number) {
  const organization = useCurrentOrganization();
  const threshold = organization?.thresholds?.workspaces ?? 0;

  return threshold > workspaces;
}

export default useCanCreateWorkspaces;
