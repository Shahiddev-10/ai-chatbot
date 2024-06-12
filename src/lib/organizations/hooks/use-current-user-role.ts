import { useContext } from 'react';
import { useCurrentOrganization } from './use-current-organization';
import { useUserSession } from '~/core/hooks/use-user-session';
import { UserSessionContext } from '~/core/contexts/user-session';
import { MembershipRole } from '../types/membership-role';

/**
 * @name useCurrentUserRole
 * @description Hook to fetch the user's current role {@link MembershipRole}
 */
export function useCurrentUserRole() {
  const user = useContext(UserSessionContext);

  if (!user.userSession) {
    return;
  }

  if (user.userSession?.data) {
    return user.userSession?.data?.role;
  }

  return MembershipRole.Member;
}
