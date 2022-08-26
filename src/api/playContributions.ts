import { useMutation } from 'react-query';
import axios from '../config/http-common';
import { Artist } from '../types/Artist';

export function usePostPlayContribution(playId: string) {
  return useMutation((data) =>
    axios
      .post(`/plays/${playId}/contributions/`, data)
      .then((response) => response.data),
  );
}

export function usePutPlayContribution(playId: string, contributionId: string) {
  return useMutation((data) =>
    axios
      .put(`/plays/${playId}/contributions/${contributionId}`, data)
      .then((response) => response.data),
  );
}

export function useDeletePlayContribution(
  playId: string,
  contributionId: string,
) {
  return useMutation<Artist[], Error>(() =>
    axios
      .delete(`/plays/${playId}/contributions/${contributionId}`)
      .then((response) => response.data),
  );
}
