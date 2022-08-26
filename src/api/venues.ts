import { useMutation, useQuery } from 'react-query';
import { Venue } from '../types/Venue';
import axios from '../config/http-common';

export function useGetAllVenues() {
  return useQuery(['allVenues'], () =>
    axios.get('venues').then((response) => response.data),
  );
}

export function useGetVenue(id: string) {
  return useQuery<Venue, Error>(['selectedVenue'], () =>
    axios.get(`venues/${id}`).then((response) => response.data),
  );
}
export function usePostVenue() {
  return useMutation((data) =>
    axios.post('/venues', data).then((response) => response.data),
  );
}
export function usePutVenue(venueId: string) {
  return useMutation((data) =>
    axios.put(`/venues/${venueId}`, data).then((response) => response.data),
  );
}
export function useDeleteVenue(venueId: string) {
  return useMutation<Venue[], Error>(() =>
    axios.delete(`/venues/${venueId}`).then((response) => response.data),
  );
}
