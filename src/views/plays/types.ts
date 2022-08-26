interface SideBarState {
  id?: string;
  addPlayArtists: boolean;
  addCharacters: boolean;
  addSongs: boolean;
  addFeaturedArtists: boolean;
  addOrchestrations: boolean;
  addOrchestrationBooks: boolean;
}

type SideBarArtistsState = Omit<
  SideBarState,
  | 'addCharacters'
  | 'addSongs'
  | 'addFeaturedArtists'
  | 'addOrchestrations'
  | 'addOrchestrationBooks'
>;

interface PlaySideDrawersProps {
  id?: string;
  sideDrawerState: SideBarState;
  defaultSideBarState: SideBarState;
  currentState: (state: SideBarState) => void;
}

interface AddBrandsProps {
  open: boolean;
  onCancel: () => void;
}

interface AddProps {
  id?: string;
  onClose: () => void;
}

export type {
  SideBarState,
  PlaySideDrawersProps,
  AddBrandsProps,
  AddProps as AddArtistsProps,
  AddProps as AddSongsProps,
  AddProps as AddFeaturedArtistsProps,
  AddProps as AddPlayArtistsProps,
  AddProps as AddOrchestrationsProps,
  AddProps as AddOrchestrationBooksProps,
  SideBarArtistsState,
};
