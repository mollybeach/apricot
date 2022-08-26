import { ProductionContribution } from './ProductionContribution';
import { Production } from './Production';

export type Institution = {
  id: string;
  type: InstitutionType;
  name: string;
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  latitude?: number;
  longitude?: number;
  website?: string;
  resourceLocation?: string;
  createdAt: Date;
  updatedAt: Date;
  productions?: Production[];
  // featuredProductions?: Production[]
  // featuredArtistContributions?: ProductionContribution
};

export enum InstitutionType {
  secondarySchool = 'Secondary School',
  university = 'University',
  communityTheater = 'Community Theater',
  regionalTheater = 'Regional Theater',
  offBroadway = 'Off-Broadway',
  broadway = 'Broadway',
  nycTheater = 'NYC Theater',
  tour = 'Tour',
  international = 'International',
}
