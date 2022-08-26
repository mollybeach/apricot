import { useMutation, useQuery } from 'react-query';
import { OrchestrationBook } from '../types/OrchestrationBook';
import axios from '../config/http-common';

export function useGetAllOrchestrationBooksForPlay(playId: string) {
  return useQuery(['allOrchestrationBooks', playId], async () =>
    axios
      .get(`/plays/${playId}/orchestration-books`)
      .then((response) => response.data),
  );
}

export function useGetAllOrchestrationBooks(
  playId: string,
  orchestrationId: string,
) {
  return useQuery(['allOrchestrationBooks'], () =>
    axios
      .get(`/plays/${playId}/orchestrations/${orchestrationId}/books`)
      .then((response) => response.data),
  );
}

export function useGetOrchestrationBook(
  playId: string,
  orchestrationId: string,
  bookId: string,
) {
  return useQuery<OrchestrationBook, Error>(['selectedOrchestrationBook'], () =>
    axios
      .get(`/plays/${playId}/orchestrations/${orchestrationId}/books/${bookId}`)
      .then((response) => response.data),
  );
}

export function usePostOrchestrationBook(
  playId: string,
  orchestrationId: string,
) {
  return useMutation((data) =>
    axios
      .post(`/plays/${playId}/orchestrations/${orchestrationId}/books`, data)
      .then((response) => response.data),
  );
}

export function usePutOrchestrationBook(
  playId: string,
  orchestrationId: string,
  bookId: string,
) {
  return useMutation((data) =>
    axios
      .put(
        `/plays/${playId}/orchestrations/${orchestrationId}/books/${bookId}`,
        data,
      )
      .then((response) => response.data),
  );
}

export function useDeleteOrchestrationBook(
  playId: string,
  orchestrationId: string,
  bookId: string,
) {
  return useMutation<OrchestrationBook[], Error>(() =>
    axios
      .delete(
        `/plays/${playId}/orchestrations/${orchestrationId}/books/${bookId}`,
      )
      .then((response) => response.data),
  );
}

export function usePatchOrchestrationInstrument(
  playId: string,
  orchestrationId: string,
  orchestrationBookId: string,
) {
  return useMutation((instrumentId: string) =>
    axios
      .patch(
        `/plays/${playId}/orchestrations/${orchestrationId}/books/${orchestrationBookId}/instruments/${instrumentId}`,
      )
      .then((response) => response.data),
  );
}

export function useDeleteOrchestrationInstrument(
  playId: string,
  orchestrationId: string,
  orchestrationBookId: string,
) {
  return useMutation((instrumentId: string) =>
    axios
      .delete(
        `/plays/${playId}/orchestrations/${orchestrationId}/books/${orchestrationBookId}/instruments/${instrumentId}`,
      )
      .then((response) => response.data),
  );
}
