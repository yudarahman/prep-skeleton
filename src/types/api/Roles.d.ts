type ARoles = {
  id: string;
  isActive: boolean;
  name: string;
};

type ARoleBody = {
  isActive: boolean;
  name?: string;
};

interface AResponseRoles extends ABasePaginationResponse<ARoles> {}