import { canInviteUsers } from '~/lib/organizations/permissions';
import { useCurrentUserOrganizationRole } from './use-current-user-organization-role';

export function useUserCanInviteUsers() {
  const role = useCurrentUserOrganizationRole();

  return role !== undefined && canInviteUsers(role);
}
