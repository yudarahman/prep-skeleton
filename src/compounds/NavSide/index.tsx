import { Fragment } from 'react';
import {
  ChevronDown,
  ChevronLeft
} from 'lucide-react';
import { isEmpty } from 'lodash';

import { withPresenter } from './Presenter';

const NavSide = withPresenter(({ data, actions }) => {
  const {
    menus,
    isPathActive,
    className
  } = data;
  const {
    onToggleMenu,
    onNavigateToPath
  } = actions;
  
  return (
    <div className={`h-full min-w-[12rem] bg-black backdrop-blur rounded-lg bg-opacity-10 ${className}`}>
      <img
        src="/assets/images/icon_gik_without_words.svg"
        alt="navigation-icon"
        className="w-[2.5rem] my-5 self-center"
      />

      {
        menus.map(({
          icon: Icon,
          ...rest
        }) => (
          <Fragment key={rest.id}>
            <div
              data-testid="test-menu-container"
              className={`mb-5 flex flex-row items-center gap-3 cursor-pointer ${isPathActive(rest.url) ? 'ml-3 pl-3 py-3 bg-white rounded-tl-lg rounded-bl-lg' : 'mx-3'}`}
              onClick={() => onNavigateToPath(rest.url)}
            >
              <Icon/>
              <span>
                {rest.title}
              </span>
              {
                !isEmpty(rest.children) && (
                  <div
                    data-testid="test-menu-icon"
                    className="ml-auto cursor-pointer"
                    onClick={() => onToggleMenu(rest.id)}
                  >
                    {
                      rest.isExpanded
                        ? (
                          <ChevronDown
                            data-testid="test-expand-icon"
                            size={12}
                          />
                        )
                        : (
                          <ChevronLeft
                            data-testid="test-collapse-icon"
                            size={12}
                          />
                        )
                    }
                  </div>
                )
              }
            </div>
            {
              rest.isExpanded && (
                <div className="mx-3 p-2 flex flex-col bg-white backdrop-blur rounded-lg bg-opacity-20">
                  {
                    rest.children.map(({
                      icon: ChildIcon,
                      ...childRest
                    }) => (
                      <div
                        data-testid="test-menu-child-container"
                        key={childRest.id}
                        className={`my-2 pl-2 flex flex-row items-center gap-3 cursor-pointer ${isPathActive(childRest.url) ? 'p-2 bg-white rounded-lg' : ''}`}
                        onClick={() => onNavigateToPath(childRest.url)}
                      >
                        <ChildIcon/>
                        <span>
                          {childRest.title}
                        </span>
                      </div>
                    ))
                  }
                </div>
              )
            }
          </Fragment>
        ))
      }
    </div>
  );
});

export default NavSide;