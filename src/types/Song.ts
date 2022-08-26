import { Play } from './Play';
import { Character } from './Character';

export type Song = {
  id: string;
  playId: string;
  name: string;
  website?: string;
  songDuration?: string;
  scoreNumber?: string;
  description?: string;
  play?: Play;
  characters?: Character[];
};
