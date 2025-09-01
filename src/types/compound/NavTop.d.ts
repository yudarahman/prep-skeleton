type CmNavTopProps = {
  isFetching: boolean;
  isDatabaseLoading: boolean;
  isError: boolean;
  user?: AUserMeResponse,
  paths: string[];
};

type CmNavTopActions = {
  logout: () => void;
};