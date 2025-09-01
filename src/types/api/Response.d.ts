type ABaseErrorResponse = {
  code: number;
  status: number
  title?: string;
  message?: string;
  detail?: unknown;
};

type ABaseSuccessResponse = {
  code?: number | null;
  status?: number | null;
  title?: string | null;
  message?: string | null;
};

type ABasePaginationResponse<R> = {
  page: number;
  totalPages: number;
  totalData: number;
  data: R[]
};