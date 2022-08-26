import { useMutation, useQuery } from 'react-query';
import axios from '../config/http-common';
import { Character } from '../types/Character';
export function useGetAllCharacters(playId: string) {
  return useQuery<Character[], Error>(['allCharacters'], () =>
    axios.get(`/plays/${playId}/characters`).then((response) => response.data),
  );
}
export function usePostCharacter(playId: string) {
  return useMutation((data) =>
    axios
      .post(`/plays/${playId}/characters`, data)
      .then((response) => response.data),
  );
}

export function usePutCharacter(playId: string, characterId: string) {
  return useMutation((data) =>
    axios
      .put(`/plays/${playId}/characters/${characterId}`, data)
      .then((response) => response.data),
  );
}

export function useDeleteCharacter(playId: string, characterId: string) {
  return useMutation(() =>
    axios
      .delete(`/plays/${playId}/characters/${characterId}`)
      .then((response) => response.data),
  );
}
