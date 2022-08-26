export type User = {
  email: string;
  name: string;
  studioId?: string;
  primaryRole?: Role;
  isOperator?: boolean;
};

export enum Role {
  spectraUser = 'spectra:user',
  studioMember = 'spectra:studio:member',
  studioManager = 'spectra:studio:manager',
  studioAdmin = 'spectra:studio:admin',
  spectraOperator = 'spectra:operator',
}
