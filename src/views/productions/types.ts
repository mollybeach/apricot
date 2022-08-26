interface SideBarState {
  id?: string;
  addProductionArtists: boolean;
  addFeaturedArtists: boolean;
  addVenueArtists: boolean;
}

type SideBarArtistsState = Omit<
  SideBarState,
  'addFeaturedArtists' | 'addVenueArtists'
>;

interface AddProps {
  id?: string;
  onClose: () => void;
}

interface ProductionSideDrawersProps {
  id?: string;
  sideDrawerState: SideBarState;
  defaultSideBarState: SideBarState;
  currentState: (state: SideBarState) => void;
}

export type {
  ProductionSideDrawersProps,
  SideBarState,
  AddProps as ProductionArtistsProps,
  SideBarArtistsState,
  AddProps as AddArtistsProps,
};
