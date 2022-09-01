export type User = {
  email: string;
  name: string;
  studioId?: string;
  primaryRole?: Role;
  isOperator?: boolean;
};

export enum Role {
  apricotUser = 'apricot:user',
  studioMember = 'apricot:studio:member',
  studioManager = 'apricot:studio:manager',
  studioAdmin = 'apricot:studio:admin',
  apricotOperator = 'apricot:operator',
}
