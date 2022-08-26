import { PaginationResponse } from '../schema';
import axios from '../config/http-common';

export function fetchPagination(
  route: string,
  page: number,
  pageLimit: number,
  searchText: string,
): Promise<PaginationResponse<any>> {
  console.info('firing');
  return axios
    .get(
      `${route}?searchText=${searchText}&page=${page}&pageLimit=${pageLimit}`,
    )
    .then((response) => response.data);
}
