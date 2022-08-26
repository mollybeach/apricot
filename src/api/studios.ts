import { useMutation, useQuery } from 'react-query';
import { Studio } from '../types/Studio';
import axios from '../config/http-common';

export function useGetAllStudios() {
  return useQuery(['allStudios'], () =>
    axios.get('studios').then((response) => response.data),
  );
}

export function useGetStudio(id: string) {
  return useQuery<Studio, Error>(['selectedStudio'], () =>
    axios.get(`studios/${id}`).then((response) => response.data),
  );
}
export function usePostStudio() {
  return useMutation((data) =>
    axios.post('/studios', data).then((response) => response.data),
  );
}
export function usePutStudio(studioId: string) {
  return useMutation((data) =>
    axios.put(`/studios/${studioId}`, data).then((response) => response.data),
  );
}
export function useDeleteStudio(studioId: string) {
  return useMutation<Studio[], Error>(() =>
    axios.delete(`/studios/${studioId}`).then((response) => response.data),
  );
}
