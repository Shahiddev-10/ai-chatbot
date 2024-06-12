import type WorkspaceMembershipRole from './workspace-membership-role.enum';

interface WorkspaceMembership {
  id: number;
  userMembershipId: number;
  workspaceId: number;
  role: WorkspaceMembershipRole;
  createdAt: string;
  updatedAt: string;
}

export default WorkspaceMembership;
