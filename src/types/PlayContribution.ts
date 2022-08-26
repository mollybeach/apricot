import { Play } from './Play';
import { Artist } from './Artist';

export type PlayContribution = {
  id: string;
  playId: string;
  artistId: string;
  contributionType: PlayContributionType;
  contributionName: PlayContributionName;
  award?: string;
  play: Play;
  artist: Artist;
};

export enum PlayContributionType {
  creator = 'Creator',
  author = 'Author',
}

export enum PlayContributionName {
  music = 'Music',
  additionalMusic = 'Additional Music',
  lyrics = 'Lyrics',
  additionalLyrics = 'Additional Lyrics',
  book = 'Book',
  originalBook = 'Original Book',
  conceived = 'Conceived',
}
