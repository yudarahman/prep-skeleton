import type {
  CmNavSideActions,
  CmNavSideAdditionalProps,
  CmNavSideProps
} from '@/types/compound/NavSide';
import {
  FC,
  JSX,
  useCallback,
  useState
} from 'react';
import {
  useLocation,
  useNavigate
} from 'react-router';
import { isEmpty } from 'lodash';

import { menus as navMenus } from '@/constants/menus';

const withPresenter: BaseWithPresenter<
  CmNavSideProps & CmNavSideAdditionalProps,
  CmNavSideActions,
  JSX.Element,
  FC<CmNavSideAdditionalProps>
> = (callback) => {
  const PresenterCompound: FC<CmNavSideAdditionalProps> = (props) => {
    const loc = useLocation();
    const navigate = useNavigate();
    const [menus, setMenus] = useState(navMenus);

    const isPathActive = useCallback((currentPath: string) => {
      if (!isEmpty(loc)) {
        const { pathname } = loc;

        return pathname.includes(currentPath);
      }

      return false;
    }, [loc]);

    const onToggleMenu = (menuId: string) => {
      setMenus((prevState) => {
        return prevState.map((menu) => {
          if (menu.id === menuId) {
            return {
              ...menu,
              isExpanded: !menu.isExpanded
            };
          }

          return { ...menu };
        });
      });
    };

    const onNavigateToPath = (menuPath: string) => {
      navigate(menuPath);
    };
    
    return callback({
      data: {
        menus,
        isPathActive,
        ...props
      },
      actions: {
        onToggleMenu,
        onNavigateToPath
      }
    });
  };
  
  return PresenterCompound;
};

export { withPresenter };