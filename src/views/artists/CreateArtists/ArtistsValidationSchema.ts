import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Artist } from '../../../types/Artist';

const AddArtistsValidation = (
  defaultValues: Partial<Artist> = {
    firstName: '',
    lastName: '',
    dob: null,
    bio: null,
    hometown: null,
    homeState: null,
    homeCountry: null,
    unionAffiliation: null,
    professionalName: null,
    awards: null,
    resourceLocation: null,
    website: null,
  },
) => {
  const Schema = yup.object().shape({
    firstName: yup.string().min(20).max(100).required('First Name is required'),
    lastName: yup.string().min(20).max(100).required('Last Name is required'),
    dob: yup.date().nullable().required('Date of Birth is required'),
    bio: yup.string().min(20).max(200).nullable().notRequired(),
    hometown: yup.string().min(2).max(100).nullable().notRequired(),
    homeState: yup.string().min(2).max(100).nullable().notRequired(),
    homeCountry: yup.string().min(2).max(100).nullable().notRequired(),
    unionAffiliation: yup.string().nullable().notRequired(),
    professionalName: yup.string().min(2).max(30).nullable().notRequired(),
    awards: yup.array().nullable().notRequired(),
    website: yup.string().min(2).max(100).nullable().notRequired(),
  });

  return useForm<any>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(Schema),
  });
};

export { AddArtistsValidation };
