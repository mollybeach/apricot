import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Studio } from '../../../types/Studio';
import { Institution } from '../../../types/Institution';

export const CreateInstitutionValidation = (
  defaultValues: Partial<Institution> = {
    type: null,
    name: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    website: '',
  },
) => {
  const Schema = yup.object().shape({
    type: yup.string().required('Institution Type is required'),
    name: yup.string().min(2).max(100).required('Institution Name is required'),
    street: yup
      .string()
      .min(2)
      .max(100)
      .required('Institution Street is required'),
    city: yup.string().min(2).max(100).required('Institution City is required'),
    state: yup
      .string()
      .min(2)
      .max(100)
      .required('Institution State is required'),
    zipcode: yup.string().required('Institution Zipcode is required'),
    website: yup.string().min(2).max(100).nullable().notRequired(),
  });

  return useForm<any>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(Schema),
  });
};
