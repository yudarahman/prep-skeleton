type AMenuPermissions = {
  id: string;
  menuId: string;
  parentMenuId: string | null;
  menuLabel: string | null;
  menuLevel: number | null;
  menuOrder: number | null;
  menuSlug: string | null;
  level: number;
  canView: boolean;
  canUpdate: boolean;
  canCreate: boolean;
  canDelete: boolean;
};

type AMenuChild = {
  id: string;
  name: string | null;
  icon: string | null;
  link: string | null;
  level: string | null;
  permissions: AMenuPermissions[] | null;
  child: { [key: string]: unknown } | null;
};

type AMenus = {
  id: string;
  name: string | null;
  icon: string | null;
  link: string | null;
  level: string | null;
  permissions: AMenuPermissions[] | null;
  child: AMenuChild[] | null;
};

interface AResponseMenus extends ABasePaginationResponse<AMenus> {}