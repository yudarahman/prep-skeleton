/* eslint-disable @typescript-eslint/no-explicit-any */
type CmMobileListProps = {
  isIntersecting: boolean;
  innerListData: any[];
};

type CmMobileListAdditionalProps = {
  isFetching?: boolean;
  children: (props) => React.ReactNode;
  action?: React.JSX.Element;
  gridCount?: number;
  listData?: any[];
};

type CmMobileListActions = {
  intersectLastElement: (node, ref) => void;
  onInnerSearch: (querySearch: string) => void;
  onSearchEnter: () => void;
};

type CmMobileListAdditionalActions = {
  onIntersecting: () => void;
  onSearch: (search: string) => void;
};