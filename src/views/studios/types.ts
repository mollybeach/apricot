interface SideBarState {
  id?: string;
  addInstitution: boolean;
}

//type SideBarProgramState = Omit<SideBarState, 'addProgram'>;

interface StudioSideDrawersProps {
  id?: string;
  sideDrawerState: SideBarState;
  defaultSideBarState: SideBarState;
  currentState: (state: SideBarState) => void;
}

interface AddProps {
  id?: string;
  onClose: () => void;
}

export type {
  SideBarState,
  StudioSideDrawersProps,
  AddProps as AddInstitutionProps,
};
