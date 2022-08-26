import { useMutation, useQuery } from 'react-query';
import { Production } from '../types/Production';
import axios from '../config/http-common';

export function useGetAllProductions() {
  return useQuery(['allProductions'], () =>
    axios.get('productions').then((response) => response.data),
  );
}
export function useGetProduction(id: string) {
  return useQuery<any, Error>(['selectedProduction'], () =>
    axios.get(`productions/${id}`).then((response) => response.data),
  );
}

export function usePostProduction() {
  return useMutation((data) =>
    axios.post('/productions', data).then((response) => response.data),
  );
}
export function usePutProduction(productionsId: string) {
  return useMutation((data) =>
    axios
      .put(`/productions/${productionsId}`, data)
      .then((response) => response.data),
  );
}
export function useDeleteProduction(productionId: string) {
  return useMutation<Production[], Error>(() =>
    axios
      .delete(`/productions/${productionId}`)
      .then((response) => response.data),
  );
}
