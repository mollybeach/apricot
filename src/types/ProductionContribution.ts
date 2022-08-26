import { Production } from './Production';
import { Artist } from './Artist';
import { Character } from './Character';
import { OrchestrationBook } from './OrchestrationBook';

export type ProductionContribution = {
  id: string;
  productionId: string;
  artistId: string;
  contributionType: ProductionContributionType;
  contributionName: ProductionContributionName;
  award?: string;
  createdAt: Date;
  updatedAt: Date;
  production?: Production;
  artist?: Artist;
  character?: Character;
  orchestrationBook?: OrchestrationBook;
};

export enum ProductionContributionType {
  artistic = 'Artistic',
  crew = 'Crew',
  administrative = 'Administrative',
  actor = 'Actor',
  musician = 'Musician',
}

export type ProductionContributionName =
  | AdministrativeProductionContribution
  | ArtisticProductionContribution
  | CrewProductionContribution
  | OrchestrationBooksProductionContribution
  | CharacterProductionContribution;

export enum AdministrativeProductionContribution {
  productionManager = 'Production Manager',
  departmentChair = 'Department Chair',
  faculty = 'Faculty',
  officeAssistant = 'Office Assistant',
  administrativeAssociate = 'Administrative Associate',
  computerAdministrator = 'Computer Administrator',
  bannerArtist = 'Banner Artist',
  dean = 'Dean',
  marketingPR = 'Marketing & PR',
  facilitiesManager = 'Facilities Manager',
  companyManager = 'Company Manager',
  productionAssistant = 'Production Assistant',
}

export enum ArtisticProductionContribution {
  director = 'Director',
  choreographer = 'Choreographer',
  musicDirector = 'Music Director',
  soundDesigner = 'Sound Designer',
  intimacyDirector = 'Intimacy Director',
  costumeDesigner = 'Costume Designer',
  setDesigner = 'Set Designer',
  lightingDesigner = 'Lighting Designer',
  projectionDesigner = 'Projection Designer',
  productionStageManager = 'Production Stage Manager',
  stageManager = 'Stage Manager',
  assistantStageManager = 'Assistant Stage Manager',
  wigDesigner = 'Wig Designer',
  danceCaptain = 'Dance Captain',
  fightCaptain = 'Fight Captain',
  assistantChoreographer = 'Assistant Choreographer',
  assistantToTheDirector = 'Assistant to the Director',
}

export enum CrewProductionContribution {
  costumer = 'Costumer',
  paint = 'Paint',
  scenery = 'Scenery',
  lighting = 'Lighting',
  electrics = 'Electrics',
  properties = 'Properties',
  propertiesMaster = 'Properties Master',
  propertiesArtisan = 'Properties Artisan',
  houseTechnician = 'House Technician',
  runningCrew = 'Running Crew',
  houseManager = 'House Manager',
  wardrobe = 'Wardrobe',
  technicalDirector = 'Technical Director',
  associateTechnicalDirector = 'Associate Technical Director',
  craftsArtisan = 'Crafts Artisan',
  stockManager = 'Stock Manager',
  costumeShopManager = 'Costume Shop Manager',
  draper = 'Draper',
  assistantCostumeDesigner = 'Assistant Costume Designer',
  assistantWigDesigner = 'Assistant Wig Designer',
  assistantSetDesigner = 'Assistant Set Designer',
  productionsDirector = 'Productions Director',
  makeup = 'Makeup',
  associateDraper = 'Associate Draper',
  masterElectrician = 'Master Electrician',
  sound = 'Sound  ',
  lightBoardOperator = 'Light Board Operator',
  soundBoardOperator = 'Sound Board Operator',
  soundEngineer = 'Sound Engineer',
  scenicArtist = 'Scenic Artist',
  scenicPainter = 'Scenic Painter',
}

export enum CharacterProductionContribution {
  character = 'Character',
}

export enum OrchestrationBooksProductionContribution {
  orchestrationBook = 'Orchestration Book',
}
