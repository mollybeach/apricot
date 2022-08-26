import { useQuery } from 'react-query';
import axios from '../config/http-common';

export function useGetAllInstruments() {
  return useQuery(['allInstruments'], () =>
    axios.get('instruments').then((response) => response.data),
  );
}
