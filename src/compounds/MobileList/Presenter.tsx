import {
  FC,
  JSX,
  MutableRefObject,
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  isEmpty,
  isUndefined,
  uniqBy
} from 'lodash';

const withPresenter: BaseWithPresenter<
  CmMobileListProps & CmMobileListAdditionalProps,
  CmMobileListActions & CmMobileListAdditionalActions,
  JSX.Element,
  FC<CmMobileListAdditionalProps & CmMobileListAdditionalActions>
> = (callback) => {
  const PresenterCompound: FC<CmMobileListAdditionalProps & CmMobileListAdditionalActions> = (props) => {
    const {
      isFetching,
      listData,
      onIntersecting,
      onSearch
    } = props;
    const [search, setSearch] = useState('');
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [innerListData, setInnerListData] = useState<unknown[]>([]);

    const intersectLastElement = useCallback(
      (node: HTMLDivElement, intersection: MutableRefObject<IntersectionObserver>) => {
        if (isFetching) {
          return;
        }
      
        if (intersection.current) {
          intersection.current.disconnect();
        }

        intersection.current = new IntersectionObserver((entries) => {
          setIsIntersecting(entries[0].isIntersecting);
        });

        if (node) {
          intersection.current.observe(node);
        }
      }, [isFetching]);
    
    const onInnerSearch = (querySearch: string) => {
      setSearch(querySearch);
    };

    const onSearchEnter = () => {
      onSearch(search);
    };

    useEffect(() => {
      if (isIntersecting) {
        onIntersecting();
      }
    }, [isIntersecting]);

    useEffect(() => {
      if (!isUndefined(listData) && !isEmpty(listData)) {
        setInnerListData(
          (prevState) => uniqBy([
            ...prevState,
            ...listData
          ], 'id')
        );
      }
    }, [listData]);
      
    return callback({
      data: {
        ...props,
        innerListData,
        isIntersecting
      },
      actions: {
        intersectLastElement,
        onInnerSearch,
        onIntersecting,
        onSearchEnter,
        onSearch
      }
    });
  };
  
  return PresenterCompound;
};

export { withPresenter };