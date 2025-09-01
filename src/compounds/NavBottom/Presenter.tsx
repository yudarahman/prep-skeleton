import type {
  CmNavBottomActions,
  CmNavBottomAdditionalProps,
  CmNavBottomProps
} from '@/types/compound/NavBottom';
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
  CmNavBottomProps & CmNavBottomAdditionalProps,
  CmNavBottomActions,
  JSX.Element,
  FC<CmNavBottomAdditionalProps>
> = (callback) => {
  const PresenterCompound: FC<CmNavBottomAdditionalProps> = (props) => {
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

          return {
            ...menu,
            /**
             * `null` used for menu that doesn't have `children`
             * so it cannot be expanded
             *
             * and make other menu to collapsed
             * when one menu expanded
             * */
            isExpanded: menu.isExpanded === null
              ? null
              : false
          };
        });
      });
    };

    const onNavigateToPath = (menuPath: string) => {
      navigate(menuPath);
    };
    
    return callback({
      data: {
        isPathActive,
        menus,
        ...props
      },
      actions: {
        onNavigateToPath,
        onToggleMenu
      }
    });
  };
  
  return PresenterCompound;
};

export { withPresenter };