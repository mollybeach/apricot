import { PlayContribution } from './PlayContribution';
import { Studio } from './Studio';
import { Venue } from './Venue';
import { Play } from './Play';
import { Institution } from './Institution';
import { ProductionContribution } from './ProductionContribution';

export type Production = {
  id: string;
  playId: string;
  brandId: string;
  runtime: string;
  productionStartDate: Date;
  productionEndDate: Date;
  captureStartDate: Date;
  captureEndDate: Date;
  themes: string;
  licenseType: LicenseType;
  stageConfiguration: string;
  percentSeatsSold: number;
  contributions?: ProductionContribution[];
  play?: Play;
  studio?: Studio;
  institution?: Institution;
  venue?: Venue;
  createdAt: Date;
  updatedAt: Date;
};

export enum LicenseType {
  fullVersion = 'Full Version',
  concertVersion = 'Concert Version',
  adaptionForYoungPerformers = 'Adaption for Young Performers',
}
