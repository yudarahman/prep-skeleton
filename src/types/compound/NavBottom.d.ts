import type { ConsMenus } from '@/types/constant/Menu';

type CmNavBottomProps = {
  menus: ConsMenus[];
  isPathActive: (currentPath: string) => boolean;
};

type CmNavBottomAdditionalProps = {
  className?: string;
};

type CmNavBottomActions = {
  onNavigateToPath: (menuPath: string) => void;
  onToggleMenu: (menuId: string) => void;
};