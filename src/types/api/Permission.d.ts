type APermissions = {
  id: string;
  isActive: boolean;
  name: string;
  createdBy: string;
  createdAt: string;
  permissions: (AMenuPermissions & { children: AMenuPermissions[] })[]
};

interface AResponsePermissions extends ABasePaginationResponse<Omit<APermissions, 'permissions'>> {}