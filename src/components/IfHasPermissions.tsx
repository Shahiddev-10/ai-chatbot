import { MembershipRole } from '~/lib/organizations/types/membership-role';
import { useCurrentUserOrganizationRole } from '~/lib/organizations/hooks/use-current-user-organization-role';

/**
 * @name IfHasPermissions
 * @description
 * This component can guard the visibility of portions of the page
 * based on the signed-in user's role for the selected organization.
 * This works hierarchically: if the role passed in is 2,
 * then portion will also be permitted to users with a greater role (3...n), but not 0 and 1
 *
 * We recommend to always import the logic handler function from a central
 * place instead of defining inline, to avoid permissions and rules getting
 * messy and scattered in the codebase
 *
 * For example:
 *  - <IfHasPermissions condition={canChangeBilling}>     // GOOD
 *  - <IfHasPermissions condition={(role) => role > 2}>   // BAD
 *
 * @param children
 * @param handler
 * @constructor
 */
export function IfHasPermissions({
  children,
  condition,
  fallback = null,
}: React.PropsWithChildren<{
  condition: (role: MembershipRole) => boolean;
  fallback?: React.ReactNode | null;
}>) {
  const currentUserRole = useCurrentUserOrganizationRole();

  if (currentUserRole === undefined || !condition(currentUserRole)) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}
