import { Fragment } from 'react';
import {
  CircleChevronDown,
  CircleChevronUp
} from 'lucide-react';
import { isEmpty } from 'lodash';

import { withPresenter } from './Presenter';

const NavBottom = withPresenter(({ data, actions }) => {
  const {
    isPathActive,
    menus,
    className
  } = data;
  const {
    onNavigateToPath,
    onToggleMenu
  } = actions;
  
  return (
    <div className={`p-3 w-full flex flex-row items-center justify-center bg-black backdrop-blur rounded-lg bg-opacity-10 gap-x-5 ${className}`}>
      {
        menus.map(({
          icon: Icon,
          ...rest
        }) => (
          <Fragment key={rest.id}>
            {
              rest.isExpanded
              && isPathActive(rest.url)
              && (
                <div className="p-3 w-full absolute border bg-white rounded-lg bottom-14">
                  <div className="grid grid-cols-2 gap-3">
                    {
                      rest.children.map(({
                        icon: ChildIcon,
                        ...childRest
                      }) => (
                        <div
                          key={childRest.id}
                          data-testid="test-nav-bottom-child-menu-container"
                          className={`px-3 py-1 flex flex-row items-center gap-x-1 ${isPathActive(childRest.url) ? 'bg-black backdrop-blur rounded-lg bg-opacity-10' : ''}`}
                          onClick={() => onNavigateToPath(childRest.url)}
                        >
                          <ChildIcon />
                          <span>
                            {childRest.title}
                          </span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )
            }
            <div
              data-testid="test-nav-bottom-menu-container"
              className="flex flex-row items-center cursor-pointer gap-x-2"
              onClick={() => isPathActive(rest.url)
                ? onToggleMenu(rest.id)
                : onNavigateToPath(rest.url)
              }
            >
              {
                !isEmpty(rest.children)
                && isPathActive(rest.url)
                && (
                  <>
                    {
                      rest.isExpanded
                        ? (
                          <CircleChevronUp
                            data-testid="test-nav-bottom-icon-expanded"
                            size={10}
                          />
                        )
                        : (
                          <CircleChevronDown
                            data-testid="test-nav-bottom-icon-collapsed"
                            size={10}
                          />
                        )
                    }
                  </>
                )
              }
              <Icon className={isPathActive(rest.url) ? 'opacity-100' : 'opacity-25'} />
              {
                isPathActive(rest.url) && (
                  <span className="select-none text-xs">
                    {rest.title}
                  </span>
                )
              }
            </div>
          </Fragment>
        ))
      }
    </div>
  );
});

export default NavBottom;