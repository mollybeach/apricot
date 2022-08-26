interface SideBarState {
  id?: string;
  addStudios: boolean;
}

type SideBarArtistsState = Omit<SideBarState, 'addStudios'>;

interface AddProps {
  id?: string;
  onClose: () => void;
}

interface VenueSideDrawersProps {
  id?: string;
  sideDrawerState: SideBarState;
  defaultSideBarState: SideBarState;
  currentState: (state: SideBarState) => void;
}

export type {
  VenueSideDrawersProps,
  SideBarState,
  SideBarArtistsState,
  AddProps as AddStudiosProps,
};
