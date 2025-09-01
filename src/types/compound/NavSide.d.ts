import type { ConsMenus } from '@/types/constant/Menu';

type CmNavSideProps = {
  menus: ConsMenus[];
  isPathActive: (currentPath: string) => boolean;
};

type CmNavSideAdditionalProps = {
  className?: string;
};

type CmNavSideActions = {
  onToggleMenu: (menuId: string) => void;
  onNavigateToPath: (menuPath: string) => void;
};