import { useMutation, useQuery } from 'react-query';
import { Studio } from '../types/Studio';
import axios from '../config/http-common';

export function useGetAllInstitutions() {
  return useQuery(['allInstitutions'], () =>
    axios.get('institutions').then((response) => response.data),
  );
}

export function useGetInstitution(institutionId: string) {
  return useQuery<Studio, Error>(['selectedInstitution'], () =>
    axios
      .get(`institutions/${institutionId}`)
      .then((response) => response.data),
  );
}
export function usePostInstitution() {
  return useMutation((data) =>
    axios.post('/institutions', data).then((response) => response.data),
  );
}
export function usePutInstitution(institutionId: string) {
  return useMutation((data) =>
    axios
      .put(`/institutions/${institutionId}`, data)
      .then((response) => response.data),
  );
}
export function useDeleteInstitution(institutionId: string) {
  return useMutation<Studio[], Error>(() =>
    axios
      .delete(`/institutions/${institutionId}`)
      .then((response) => response.data),
  );
}
