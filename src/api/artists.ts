import { useMutation, useQuery } from 'react-query';
import { Artist } from '../types/Artist';
import axios from '../config/http-common';
import { PaginationResponse } from '../schema';

export function useGetAllArtists() {
  return useQuery(['allArtists'], () =>
    axios.get('artists').then((response) => response.data),
  );
}

export function useGetArtist(id: string) {
  return useQuery<Artist, Error>(['selectedArtist'], () =>
    axios.get(`artists/${id}`).then((response) => response.data),
  );
}
export function usePostArtist() {
  return useMutation((data) =>
    axios.post('/artists', data).then((response) => response.data),
  );
}
export function usePutArtist(artistId: string) {
  return useMutation((data) =>
    axios.put(`/artists/${artistId}`, data).then((response) => response.data),
  );
}
export function useDeleteArtist(artistId: string) {
  return useMutation<Artist[], Error>(() =>
    axios.delete(`/artists/${artistId}`).then((response) => response.data),
  );
}
