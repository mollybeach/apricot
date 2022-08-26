export type PaginationResponse<T> = {
  lastPage: number;
  totalRecords: number;
  currentPage: number;
  hasMorePages: boolean;
  data: T[];
};
