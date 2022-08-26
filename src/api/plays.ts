import { useMutation, useQuery } from 'react-query';
import { Play } from '../types/Play';
import axios from '../config/http-common';
import { Production } from '../types/Production';

export function useGetAllPlays(searchText?: string) {
  return useQuery(['allPlays'], () =>
    axios
      .get(`plays?searchText=${searchText}`)
      .then((response) => response.data),
  );
}
export function useGetPlay(id: string) {
  return useQuery<Play, Error>(['selectedPlay'], () =>
    axios.get(`plays/${id}`).then((response) => response.data),
  );
}

export function usePostPlay() {
  return useMutation((data) =>
    axios.post('/plays', data).then((response) => response.data),
  );
}
export function usePutPlay(playId: string) {
  return useMutation((data) =>
    axios.put(`/plays/${playId}`, data).then((response) => response.data),
  );
}
export function useDeletePlay(playId: string) {
  return useMutation<Production[], Error>(() =>
    axios.delete(`/plays/${playId}`).then((response) => response.data),
  );
}
