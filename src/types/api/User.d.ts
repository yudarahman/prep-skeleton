type AUserMeResponse = {
  id: string;
  isActive: boolean;
  username: string;
  fullname: string;
  email: string;
  lastLogin: string;
  domain: unknown;
  defaultLandingPage: unknown;
  roles: AUserMeRoleResponse[];
};

type AUserMeRoleResponse = {
  id: string;
  name: string;
};

type AUser = {
  id: string;
  isActive: boolean;
  email: string | null;
  username: string | null;
  password: string | null;
  domain: string | null;
  division: string | null;
  department: string | null;
  workLocation: string | null;
  company: string | null;
  fullname: string | null;
  lastLogin: string | null;
  userRoles: {
    id: string,
    role: { id: string, name: string }
  }[]
};

type AUserBody = {
  username?: string;
  password?: string;
  fullname?: string;
  email?: string;
  domain?: string;
  userRoles?: { id: string, name: string }[];
  isActive: boolean;
};

interface AResponseUsers extends ABasePaginationResponse<AUser> {}