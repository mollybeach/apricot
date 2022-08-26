export type Artist = {
  id: string;
  artistId: string;
  firstName: string;
  lastName: string;
  studioId?: string;
  dob?: Date;
  bio?: string;
  hometown?: string;
  homeState?: string;
  homeCountry?: string;
  unionAffiliation?: UnionAffiliation;
  professionalName?: string;
  awards?: string[];
  resourceLocation?: string;
  website?: string;
};

export enum UnionAffiliation {
  'AEA' = 'AEA',
  'SAG-AFTRA' = 'SAG-AFTRA',
  'AGMA' = 'AGMA',
  'AGVA' = 'AGVA',
  'SDC' = 'SDC',
  'AFM' = 'AFM',
  'WGA' = 'WGA',
  'DGA' = 'DGA',
  'IATSE' = 'IATSE',
  'PGA' = 'PGA',
  'ASC' = 'ASC',
  'ADG' = 'ADG',
  'CDG' = 'CDG',
  'LMGI' = 'LMGI',
  'MPSE' = 'MPSE',
  'SDSA' = 'SDSA',
  'SOC' = 'SOC',
  'Teamsters' = 'Teamsters',
}
