import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Play } from '../../../types/Play';
import { Orchestration } from '../../../types/Orchestration';
import { OrchestrationBook } from '../../../types/OrchestrationBook';
import { Song } from '../../../types/Song';
import { Instrument } from '../../../types/Instrument';
import { min } from 'date-fns';

const CreatePlaysValidation = (
  defaultValues: Partial<
    Play & {
      banner?: string;
      poster?: string;
      selectedBrand?: { id: string | number; label: string };
    }
  > = {
    banner: null,
    poster: null,
    selectedBrand: null,
    vocalRequirements: null,
    brandId: null,
    licenseName: null,
    licenseHouse: null,
    licenseWebsite: null,
    playType: null,
    originalProductionYear: null,
    shortDescription: null,
    longDescription: null,
    synopsis: null,
    history: null,
    duration: null,
    genres: null,
    themes: null,
    ensembleSize: null,
    numberOfActs: null,
    audienceRating: null,
    playSetting: null,
    danceRequirements: null,
  },
) => {
  const Schema = yup.object().shape({
    banner: yup.array().nullable().notRequired(),
    poster: yup.array().nullable().notRequired(),
    playType: yup.string().nullable().required('Play type is required'),
    licenseName: yup.string().nullable().required('License Name required'),
    licenseHouse: yup.string().nullable().required('License House required'),
    licenseWebsite: yup.string().nullable().notRequired(),
    originalProductionYear: yup.string().nullable().notRequired(),
    shortDescription: yup.string().nullable().notRequired(), //1000
    longDescription: yup.string().nullable().notRequired(),
    synopsis: yup.string().nullable().notRequired(),
    history: yup.string().nullable().notRequired(),
    duration: yup.number().nullable().notRequired(),
    genres: yup.array().nullable().notRequired(),
    musicStyle: yup.array().nullable().notRequired(),
    themes: yup.array().nullable().notRequired(),
    selectedVocalRequirements: yup.array().nullable().notRequired(),
    ensembleSize: yup.number().nullable().notRequired(),
    numberOfActs: yup.number().nullable().notRequired(),
    audienceRating: yup.number().nullable().notRequired(),
    playSetting: yup.string().nullable().notRequired(),
    danceRequirements: yup.string().nullable().notRequired(),
  });

  return useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(Schema),
  });
};

const AddBrandsValidation = () => {
  const Schema = yup.object().shape({
    brand: yup.string().required('Brand Name is required'),
  });

  return useForm<any>({
    defaultValues: {
      brand: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(Schema),
  });
};

const AddArtistsValidation = () => {
  const Schema = yup.object().shape({
    firstName: yup.string().min(2).max(20).required('First Name is required'),
    lastName: yup.string().min(2).max(20).required('Last Name is required'),
    dob: yup.date().nullable().notRequired(),
    hometown: yup.string().nullable().notRequired(),
    homeState: yup.string().min(2).max(50).nullable().notRequired(),
    unionAffiliation: yup.array().nullable().notRequired(),
    homeCountry: yup.array().nullable().notRequired(),
    bio: yup.array().nullable().notRequired(),
    professionalName: yup.array().nullable().notRequired(),
    awards: yup.array().nullable().notRequired(),
    resourceLocation: yup.array().nullable().notRequired(),
    website: yup.array().nullable().notRequired(),
  });

  return useForm<any>({
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: '',
      hometown: '',
      homeState: '',
      unionAffiliation: '',
      homeCountry: '',
      bio: '',
      professionalName: '',
      awards: null,
      resourceLocation: '',
      website: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(Schema),
  });
};

const AddPlayContributionValidation = () => {
  const Schema = yup.object().shape({
    contributionType: yup.string().required('Contribution Type is required!'),
    contributionName: yup
      .string()
      .min(2)
      .max(50)
      .required('Contribution Name is required!'),
    artist: yup.object().required('Artist is required!'),
  });

  return useForm<any>({
    defaultValues: {
      contributionType: null,
      contributionName: null,
      artistId: null,
      artist: null,
    },
    mode: 'onSubmit',
    resolver: yupResolver(Schema),
  });
};

const AddCharacterValidation = () => {
  const Schema = yup.object().shape({
    name: yup.string().min(2).max(50).required('Name is required!'),
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

const AddSongsValidation = () => {
  const Schema = yup.object().shape({
    name: yup.string().nullable().required('Name is required!'),
    website: yup.string().min(2).max(100).nullable().notRequired(),
    songDuration: yup.string().nullable().notRequired(),
    scoreNumber: yup.string().nullable().notRequired(),
    description: yup.string().nullable().notRequired(),
    selectedCharacter: yup.array().nullable().notRequired(),
  });

  return useForm({
    defaultValues: {
      name: null,
      website: null,
      songDuration: null,
      scoreNumber: null,
      description: null,
      selectedCharacter: null,
    },
    mode: 'onSubmit',
    resolver: yupResolver(Schema),
  });
};

const AddFeaturedArtistsValidation = () => {
  const Schema = yup.object().shape({
    artists: yup.string().required('Artists is required!'),
  });

  return useForm<any>({
    defaultValues: {
      artists: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(Schema),
  });
};

const AddOrchestrationsValidation = (
  defaultValues: Partial<Orchestration> = {
    orchestrationName: null,
    orchestrationDescription: null,
    orchestrationType: null,
    musicStyle: null,
    musicMoodStyle: null,
    musicGenrePrimaryCategory: null,
    musicGenrePrimarySubcategory: null,
    musicGenreSecondaryCategory: null,
    musicGenreSecondarySubcategory: null,
    orchestrationBooks: null,
  },
) => {
  const Schema = yup.object().shape({
    orchestrationName: yup
      .string()
      .nullable()
      .required('Orchestration Name is required!'),
    orchestrationDescription: yup.string().nullable().notRequired(),
    orchestrationType: yup.string().nullable().notRequired(),
    musicStyle: yup.string().nullable().notRequired(),
    musicMoodStyle: yup.string().nullable().notRequired(),
    musicGenrePrimaryCategory: yup.string().nullable().notRequired(),
    musicGenrePrimarySubcategory: yup.string().nullable().notRequired(),
    musicGenreSecondaryCategory: yup.string().nullable().notRequired(),
    musicGenreSecondarySubcategory: yup.string().nullable().notRequired(),
    orchestrationBooks: yup.array().nullable().notRequired(),
  });

  return useForm<any>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(Schema),
  });
};

const AddOrchestrationBooksValidation = (
  defaultValues: Partial<OrchestrationBook> & {
    selectedInstrument?: Instrument;
    selectedInstrumentType?: string;
  } = {
    bookName: null,
    bookLabel: null,
    selectedInstrumentType: null,
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
  CreatePlaysValidation,
  AddBrandsValidation,
  AddArtistsValidation,
  AddPlayContributionValidation,
  AddCharacterValidation,
  AddSongsValidation,
  AddFeaturedArtistsValidation,
  AddOrchestrationsValidation,
  AddOrchestrationBooksValidation,
};
