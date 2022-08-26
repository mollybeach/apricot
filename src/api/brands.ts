import { useQuery } from 'react-query';
import { Brand } from '../types/Brand';
import axios from '../config/http-common';

export function useGetAllBrands() {
  return useQuery<Brand[], Error>(
    ['brands'],
    () => axios.get('brands').then((response) => response.data),
    {
      staleTime: Infinity,
    },
  );
}

export function useGetBrand(brandId: string) {
  return useQuery<Brand[], Error>(
    ['selectedBrand'],
    () => axios.get(`brands/${brandId}`).then((response) => response.data),
    {
      staleTime: Infinity,
    },
  );
}
