import { Institution } from './Institution';

export type Studio = {
  id: string;
  studioId: string;
  institutionId?: string;
  type: StudioType;
  name: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  website?: string;
  institution?: Institution;
};

export enum StudioType {
  highSchoolProgram = 'High School Program',
  middleSchoolProgram = 'Middle School Program',
  universityDepartment = 'University Department',
  universityProgram = 'University Program',
  universityStudentRunOrganization = 'University Student Run Organization',
  allAgesCommunityTheater = 'All Ages Community Theater',
  youthOnlyCommunityTheater = 'Youth Only Community Theater',
  youthRunCommunityTheaterOrganization = 'Youth Run Community Theater Organization',
  commercialTheater = 'Commercial Theater',
  nonProfitLORTTheater = 'Non-Profit LORT Theater',
  nonProfitNonUnionTheater = 'Non-Profit Non-Union Theater',
  nonProfitTheater = 'Non-Profit Theater',
  touringProductionOrganization = 'Touring Production Organization',
  internationalProductionOrganization = 'International Production Organization',
}
