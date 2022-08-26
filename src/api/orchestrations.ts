import { useMutation, useQuery } from 'react-query';
import { Orchestration } from '../types/Orchestration';
import axios from '../config/http-common';

export function useGetOrchestration(playId: string, orchestrationId: string) {
  return useQuery<Orchestration, Error>(['selectedOrchestration'], () => {
    // if (!playId || !orchestrationId) {
    //   throw new Error('Missing playId or orchestrationId');
    // }
    return axios
      .get(`/plays/${playId}/orchestrations/${orchestrationId}`)
      .then((response) => response.data);
  });
}

export function usePostOrchestration(playId: string) {
  return useMutation((data) =>
    axios
      .post(`/plays/${playId}/orchestrations`, data)
      .then((response) => response.data),
  );
}

export function usePutOrchestration(playId: string, orchestrationId: string) {
  return useMutation((data) =>
    axios
      .put(`/plays/${playId}/orchestrations/${orchestrationId}`, data)
      .then((response) => response.data),
  );
}
export function useDeleteOrchestration(
  playId: string,
  orchestrationId: string,
) {
  return useMutation<Orchestration[], Error>(() =>
    axios
      .delete(`/plays/${playId}/orchestrations/${orchestrationId}`)
      .then((response) => response.data),
  );
}
