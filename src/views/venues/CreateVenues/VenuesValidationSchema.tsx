import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Venue } from '../../../types/Venue';

const CreateVenueValidation = (
  defaultValues: Partial<Venue> & {
    selectedStudio?: { id: string; label: string };
  } = {
    name: null,
    studioId: null,
    selectedStudio: null,
    street: null,
    city: null,
    state: null,
    zipcode: null,
    website: null,
    stageConfiguration: null,
    specialFeatures: null,
    venueCapacity: null,
    completionYear: null,
  },
) => {
  const Schema = yup.object().shape({
    name: yup
      .string()
      .min(3)
      .max(100)
      .nullable()
      .required('Venue Name is required'),
    studioId: yup.string().nullable().notRequired(),
    street: yup
      .string()
      .min(5)
      .max(100)
      .nullable()
      .required('Venue Street is required'),
    city: yup
      .string()
      .min(3)
      .max(100)
      .nullable()
      .required('Venue City is required'),
    state: yup
      .string()
      .min(2)
      .max(100)
      .nullable()
      .required('Venue State is required'),
    website: yup.string().min(5).max(100).nullable().notRequired(),
    stageConfiguration: yup.array().nullable().notRequired(),
    specialFeatures: yup.string().nullable().notRequired(),
    venueCapacity: yup.number().min(1).max(10000).nullable().notRequired(),
    completionYear: yup.number().min(1000).max(3000).nullable().notRequired(),
  });

  return useForm<any>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(Schema),
  });
};

export { CreateVenueValidation };
