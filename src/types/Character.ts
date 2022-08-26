import { Play } from './Play';

export type Character = {
  id: string;
  playId: string;
  name: string;
  tier?: string;
  gender?: Gender;
  ageRangeTop?: number;
  ageRangeBottom?: number;
  race?: CharacterRace;
  vocalRangeTop?: string;
  vocalRangeBottom?: string;
  voiceType?: VoiceType;
  castingNotes?: string;
  description?: string;
  ethnicity?: CharacterEthnicity;
  play?: Play;
};

export enum Gender {
  woman = 'Woman',
  man = 'Man',
  child = 'Child',
  femaleChild = 'Female Child',
  maleChild = 'Male Child',
  nonBinary = 'Non-binary',
  transWoman = 'Trans Woman',
  transMan = 'Trans Man',
  genderFluid = 'Genderfluid',
  genderQueer = 'Genderqueer',
  agender = 'Agender',
  notGendered = 'Not Gendered',
  unlisted = 'Unlisted',
}

export enum CharacterTier {
  leading = 'Leading',
  featured = 'Featured',
  ensemble = 'Ensemble',
}

export enum CharacterRace {
  americanIndianOrAlaskaNative = 'American Indian or Alaska Native',
  AsianOrAsianAmerican = 'Asian or Asian American',
  blackOrAfricanAmerican = 'Black or African American',
  nativeHawaiianOrPacificIslander = 'Native Hawaiian or Pacific Islander',
  white = 'White',
  otherRace = 'Other Race',
  multiRacial = 'Multi-Racial',
}

export enum CharacterEthnicity {
  hispanicLatino = 'Hispanic or Latino',
  notHispanicLatino = 'Not Hispanic or Latino',
}

export enum VoiceType {
  soprano = 'Soprano',
  lyricSoprano = 'Lyric Soprano',
  mezzoSoprano = 'Mezzo Soprano',
  alto = 'Alto',
  tenor = 'Tenor',
  baritone = 'Baritone',
  bass = 'Bass',
}
