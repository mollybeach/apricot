import { useMutation, useQuery } from 'react-query';
import axios from '../config/http-common';
import { Song } from '../types/Song';

export function useGetSong(playId: string, songId: string) {
  return useQuery<Song, Error>(['selectedSong'], () =>
    axios
      .get(`plays/${playId}/songs/${songId}`)
      .then((response) => response.data),
  );
}

export function usePostSong(playId: string) {
  return useMutation((data) =>
    axios
      .post(`/plays/${playId}/songs`, data)
      .then((response) => response.data),
  );
}

export function usePutSong(playId: string, songId: string) {
  return useMutation((data) =>
    axios
      .put(`/plays/${playId}/songs/${songId}`, data)
      .then((response) => response.data),
  );
}

export function useDeleteSong(playId: string, songId: string) {
  return useMutation(() =>
    axios
      .delete(`/plays/${playId}/songs/${songId}`)
      .then((response) => response.data),
  );
}

export function usePatchSongCharacter(playId: string, songId: string) {
  return useMutation((characterId: string) =>
    axios
      .patch(`/plays/${playId}/songs/${songId}/characters/${characterId}`)
      .then((response) => response.data),
  );
}

export function useDeleteSongCharacter(playId: string, songId: string) {
  return useMutation((characterId: string) =>
    axios
      .delete(`/plays/${playId}/songs/${songId}/characters/${characterId}`)
      .then((response) => response.data),
  );
}
