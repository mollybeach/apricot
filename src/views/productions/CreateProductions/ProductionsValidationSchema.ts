import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Production } from '../../../types/Production';
import { OrchestrationBook } from '../../../types/OrchestrationBook';
import { Instrument } from '../../../types/Instrument';

const CreateProductionsValidation = (
  defaultValues: Partial<
    Production & {
      selectedStudio?: { id: string | number; label: string };
      selectedInstitution?: { id: string | number; label: string };
      selectedBrand?: { id: string | number; label: string };
      selectedPlay?: { id: string | number; label: string };
      selectedVenue?: { id: string | number; label: string };
    }
  > = {
    selectedBrand: null,
    selectedPlay: null,
    selectedStudio: null,
    selectedInstitution: null,
    selectedVenue: null,
    runtime: null,
    productionStartDate: null,
    productionEndDate: null,
    captureStartDate: null,
    captureEndDate: null,
    licenseType: null,
    stageConfiguration: null,
    percentSeatsSold: null,
  },
) => {
  const Schema = yup.object().shape({
    selectedStudio: yup.object().nullable().required('Studio is required'),
    selectedInstitution: yup.object().nullable().notRequired(),
    selectedPlay: yup.object().nullable().required('Play is required'),
    selectedVenue: yup.object().nullable().required('Venue is required'),
    runtime: yup.number().max(500).nullable().notRequired(),
    productionStartDate: yup
      .date()
      .nullable()
      .required('Production Start Date is required'),
    productionEndDate: yup
      .date()
      .nullable()
      .required('Production End Date is required'),
    captureStartDate: yup.date().nullable().notRequired(),
    captureEndDate: yup.date().nullable().notRequired(),
    licenseType: yup.string().nullable().notRequired(),
    stageConfiguration: yup.string().nullable().notRequired(),
    percentSeatsSold: yup.number().nullable().notRequired(),
  });

  return useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(Schema),
  });
};

const AddProductionContributionValidation = () => {
  const Schema = yup.object().shape({
    contributionType: yup
      .string()
      .nullable()
      .required('Contribution Type is required!'),
    contributionName: yup.string().nullable().notRequired(),
    artist: yup.object().nullable().required('Artist is required!'),
  });

  return useForm<any>({
    defaultValues: {
      contributionType: null,
      contributionName: null,
      artistId: null,
      artist: null,
      selectedOrchestrationBook: null,
      orchestrationBookId: null,
      selectedCharacter: null,
      characterId: null,
    },
    mode: 'onSubmit',
    resolver: yupResolver(Schema),
  });
};

const AddProductionArtistsValidation = () => {
  const Schema = yup.object().shape({
    firstName: yup.string().min(2).max(100).notRequired(),
    lastName: yup.string().min(2).max(100).notRequired(),
    dob: yup.date().nullable().notRequired(),
    hometown: yup.string().min(2).max(100).notRequired(),
    homeState: yup.string().min(2).max(100).nullable().notRequired(),
    unionAffiliation: yup.string().min(2).max(100).notRequired(),
    homeCountry: yup.string().min(2).max(100).notRequired(),
    bio: yup.string().min(2).max(100).notRequired(),
    professionalName: yup.string().min(2).max(100).notRequired(),
    award: yup.string().min(2).max(100).notRequired(),
    resourceLocation: yup.string().min(2).max(100).notRequired(),
    website: yup.string().min(2).max(100).notRequired(),
  });

  return useForm<any>({
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: null,
      hometown: '',
      homeState: '',
      unionAffiliation: '',
      homeCountry: '',
      bio: '',
      professionalName: '',
      award: '',
      resourceLocation: '',
      website: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(Schema),
  });
};
const AddCharacterValidation = () => {
  const Schema = yup.object().shape({
    name: yup.string().min(2).max(30).required('Name is required!'),
    tier: yup.string().min(2).max(100).notRequired(),
    gender: yup.string().min(2).max(100).notRequired(),
    ageRangeTop: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable(),
    ageRangeBottom: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable(),
    race: yup.string().min(2).max(100).notRequired(),
    vocalRangeTop: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable(),
    vocalRangeBottom: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable(),
    voiceType: yup.string().min(2).max(100).notRequired(),
    castingNotes: yup.string().min(2).max(100).notRequired(),
    description: yup.string().min(2).max(100).notRequired(),
    ethnicity: yup.string().min(2).max(100).notRequired(),
  });

  return useForm<any>({
    defaultValues: {
      name: '',
      tier: '',
      gender: '',
      ageRangeTop: '',
      ageRangeBottom: '',
      race: '',
      vocalRangeTop: '',
      vocalRangeBottom: '',
      voiceType: '',
      castingNotes: '',
      description: '',
      ethnicity: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(Schema),
  });
};

const AddOrchestrationBooksValidation = (
  defaultValues: Partial<OrchestrationBook> & {
    selectedInstrument?: Instrument;
  } = {
    bookName: null,
    bookLabel: null,
    selectedInstrument: null,
  },
) => {
  const Schema = yup.object().shape({
    bookName: yup.string().min(2).max(50).required('Book Name is required!'),
    bookLabel: yup.string().min(2).max(50).nullable().notRequired(),
    selectedInstrument: yup.object().nullable().notRequired(),
  });
  return useForm<any>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(Schema),
  });
};

export {
  CreateProductionsValidation,
  AddProductionArtistsValidation,
  AddProductionContributionValidation,
  AddCharacterValidation,
  AddOrchestrationBooksValidation,
};
