import { Brand } from './Brand';
import { Song } from './Song';
import { Character } from './Character';
import { PlayContribution } from './PlayContribution';
import { Orchestration } from './Orchestration';

export type Play = {
  id: string;
  brandId: string;
  brand: Brand;
  playType: PlayType;
  licenseName: string;
  licenseHouse?: LicenseHouse;
  licenseWebsite?: string;
  originalProductionYear?: string;
  shortDescription?: string;
  longDescription?: string;
  synopsis?: string;
  history?: string;
  duration?: number;
  awards?: string[];
  genres?: Genre[];
  themes?: PlayTheme[];
  vocalRequirements?: PlayVocalRequirement[];
  ensembleSize?: string;
  numberOfActs?: number;
  audienceRating?: string;
  playSetting?: string;
  danceRequirements?: string;
  createdAt: Date;
  updatedAt: Date;

  characters?: Character[];
  songs?: Song[];
  orchestrations?: Orchestration[];
  contributions?: PlayContribution[];
  // featuredProductions?: Production[]
  // featuredArtistContributions: ProductionContribution[]
};

export enum PlayType {
  musicalFullLength = 'Musical, Full-Length',
  musicalShort = 'Musical, Short',
  musicalRevueCabaret = 'Musical, Revue/Cabaret',
  playFullLength = 'Play, Full-Length',
  playShort = 'Play, Short',
  playTenMinute = 'Play, 10-Minute',
}

export enum LicenseHouse {
  mti = 'MTI',
  concord = 'Concord',
  trw = 'TRW',
  broadwayLicensing = 'Broadway Licensing',
  dramatistsPlayServices = 'Dramatists Play Services',
  other = 'Other',
}

export enum PlayVocalRequirement {
  smallChorus = 'Small Chorus',
  mediumChorus = 'Medium Chorus',
  largeChorus = 'Large Chorus',
  strongLargeChorus = 'Strong/Large Chorus',
  vocalDemandsEasy = 'Vocal Demands - Easy',
  vocalDemandsModerate = 'Vocal Demands - Moderate',
  vocalDemandsDifficult = 'Vocal Demands - Difficult',
  trainedSingers = 'Trained Singers',
}

export enum Genre {
  comedy = 'Comedy',
  drama = 'Drama',
  dramaticComedy = 'Dramatic Comedy',
  darkComedy = 'Dark Comedy',
  satire = 'Satire',
  politicalSatire = 'Political Satire',
  melodrama = 'Melodrama',
  pantomime = 'Pantomime',
  farce = 'Face',
  fantasy = 'Fantasy',
  adventure = 'Adventure',
  adaptationsLiterature = 'Adaptations (Literature)',
  adaptationsShakespeare = 'Adaptations (Shakespeare)',
  adaptationsStageScreen = 'Adaptations (Stage & Screen)',
  youngAudiences = 'Theater for Young Audiences',
  mystery = 'Mystery',
  thriller = 'Thriller',
  christmas = 'Christmas',
  holiday = 'Holiday',
  biography = 'Biography',
  fablesFolktales = 'Fables/Folktales',
  period = 'Period',
  experimental = 'Experimental',
  chancelDramaPageant = 'Chancel Drama/Pageant',
  scienceFiction = 'Science Fiction',
  parodySpoof = 'Parody/Spoof',
  docudramaHistoric = 'Docudrama/Historic',
  commediaDelArte = 'Commedia Del Arte',
  faithBased = 'Faith-Based',
  romanticComedy = 'Romantic Comedy',
}

export enum PlayTheme {
  adolescenceChildhood = 'Adolescence/Childhood',
  aging = 'Aging',
  autism = 'Autism',
  asianExperience = 'Asian Experience',
  betrayal = 'Betrayal',
  blackExperience = 'Black Experience',
  business = 'Business',
  christianity = 'Christianity',
  currentEvents = 'Current Events',
  death = 'Death',
  fairyTales = 'Fairy Tales',
  friendship = 'Friendship',
  illnessHealth = 'Illness/Health',
  jewishExperience = 'Jewish Experience',
  LGBTQ = 'LGBTQ+ Experience',
  love = 'Love',
  marriage = 'Marriage',
  memory = 'Memory',
  parentingFamily = 'Parenting/Family',
  politics = 'Politics',
  religion = 'Religion',
  sports = 'Sports',
  warMilitary = 'War Military Experience',
  disability = 'Disability',
  womensExperience = 'Womens Experience',
  latinoLatinaExperience = 'Latino/Latina Experience',
  economicalFinancialExperience = 'Financial Interest',
  theaterEntertainment = 'Theater/Entertainment Industry',
  media = 'Media',
  asianAmericanExperience = 'American/American Experience',
  education = 'Education',
  sexuality = 'Sexuality',
  indiginousExperience = 'Indigenous Peoples’ Experience',
  middleEasternExperience = 'Middle Eastern Experience',
  environmentClimate = 'Environment/Climate',
  grief = 'Grief',
  masculinity = 'Masculinity',
  mentalHealth = 'Mental Health',
  race = 'Race',
  romance = 'Romance',
  supernatural = 'Supernatural',
  trueStory = 'True Story',
  classSocioeconomic = 'Class/Socioeconomic',
}
