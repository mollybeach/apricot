import { Studio } from './Studio';

export type Venue = {
  id: string;
  studioId: string;
  studio?: Studio;
  name: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  latitude?: number;
  longitude?: number;
  website?: string;
  stageConfiguration?: VenueStageConfiguration[];
  specialFeatures?: string;
  venueCapacity?: string;
  completionYear?: string;
  resourceLocation?: string;
  createdAt: Date;
  updatedAt: Date;
};

export enum VenueStageConfiguration {
  prosceniumArch = 'Proscenium Arch',
  endEndOn = 'End/End-On',
  thrust = 'Thrust',
  traverseProfile = 'Traverse/Profile',
  round = 'In the Round',
  concertHall = 'Concert Hall',
  blackBox = 'Black Box',
}
