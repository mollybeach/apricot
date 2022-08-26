import { useMutation, useQuery } from 'react-query';
import axios from '../config/http-common';
import { Artist } from '../types/Artist';

export function useAllProductionContributions(playId: string) {
  return useQuery<Artist[], Error>(['allProductionContributions'], () =>
    axios
      .get(`/plays/${playId}/productionContributions`)
      .then((response) => response.data),
  );
}

export function usePostProductionContribution(productionId: string) {
  return useMutation((data) =>
    axios
      .post(`/productions/${productionId}/contributions`, data)
      .then((response) => response.data),
  );
}

export function usePutProductionContribution(
  productionId: string,
  contributionId: string,
) {
  return useMutation((data) =>
    axios
      .put(`/productions/${productionId}/contributions/${contributionId}`, data)
      .then((response) => response.data),
  );
}

export function useDeleteProductionContribution(
  productionId: string,
  contributionId: string,
) {
  return useMutation<Artist[], Error>(() =>
    axios
      .delete(`/productions/${productionId}/contributions/${contributionId}`)
      .then((response) => response.data),
  );
}
