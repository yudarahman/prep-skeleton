import { useRef } from 'react';
import {
  LoaderPinwheelIcon,
  Search
} from 'lucide-react';
import { isEmpty } from 'lodash';

import { Input } from '@/components/ui/input';
import { Loading } from '@/components/Loading';

import { withPresenter } from './Presenter';

const MobileList = withPresenter(({ data, actions }) => {
  const {
    isFetching,
    isIntersecting,
    action,
    children,
    gridCount,
    innerListData
  } = data;
  const {
    intersectLastElement,
    onInnerSearch,
    onSearchEnter
  } = actions;
  
  const intersection = useRef();
  
  return (
    <div className="flex flex-col gap-y-3 lg:hidden">
      <div className="w-full flex flex-row items-center bg-white rounded-md border border-input sticky top-0">
        <Search className="mx-3"/>
        <Input
          data-testid="test-search-input"
          placeholder="Search..."
          className="border-0 bg-white"
          disabled={isFetching}
          onChange={(ev) => onInnerSearch(ev.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              onSearchEnter();
            }
          }}
        />
      </div>
      {action}
      {
        (isFetching && !isIntersecting)
          ? (<Loading />)
          : (
            <>
              {
                !isEmpty(innerListData)
                  ? (
                    <div className={`flex flex-col gap-y-3 md:grid ${gridCount ? `md:grid-cols-${gridCount}` : 'md:grid-cols-3'} md:gap-3`}>
                      {
                        innerListData!.map(
                          (item, index) => (
                            <div
                              key={`item-mobile-${item.id}-${index + 1}`}
                              ref={(node) => intersectLastElement(node, intersection)}
                            >
                              {children(item)}
                            </div>
                          )
                        )
                      }
                      {
                        (isIntersecting && isFetching)
                          && (
                            <div className="flex flex-row items-center justify-center gap-x-3">
                              <LoaderPinwheelIcon className="animate-spin" />
                            </div>
                          )
                      }
                    </div>
                  )
                  : (<></>)
              }
            </>
          )
      }
    </div>
  );
});

export { MobileList };