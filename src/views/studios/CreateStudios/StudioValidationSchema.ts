import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Studio } from '../../../types/Studio';

const CreateStudioValidation = (
  defaultValues: Partial<Studio> & {
    selectedInstitution?: { id: string | number; label: string };
  } = {
    type: null,
    selectedInstitution: null,
    institutionId: null,
    name: null,
    street: null,
    city: null,
    state: null,
    zipcode: null,
    website: null,
  },
) => {
  const Schema = yup.object().shape({
    type: yup.string().nullable().required('Studio Type is required'),
    selectedInstitution: yup.object().nullable().notRequired(),
    name: yup
      .string()
      .nullable()
      .min(2)
      .max(100)
      .required('Studio Name is required'),
    street: yup
      .string()
      .min(2)
      .max(100)
      .nullable()
      .required('Studio Street is required'),
    city: yup
      .string()
      .min(2)
      .max(100)
      .nullable()
      .required('Studio City is required'),
    state: yup
      .string()
      .min(2)
      .max(100)
      .nullable()
      .required('Studio State is required'),
    zipcode: yup.string().nullable().required('Studio Zipcode is required'),
    website: yup.string().min(2).max(100).nullable().notRequired(),
  });

  return useForm<any>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(Schema),
  });
};

export { CreateStudioValidation };
