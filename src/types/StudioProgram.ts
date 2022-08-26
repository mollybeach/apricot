//import { Production } from './Production';
import { Artist } from './Artist';
import { Studio } from './Studio';

export type StudioProgram = {
  id: string;
  studioId: string;
  name: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
  artistHeadId?: string;
  studio?: Studio;
  artistHead?: Artist;
  // featuredProductions?: Production[];
  // featuredArtistContributions: FeaturedPlayArtistContribution[];
};
