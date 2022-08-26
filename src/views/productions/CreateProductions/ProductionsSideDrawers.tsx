import React from 'react';
import { SideDrawer } from '../../../components';
import AddProductionContributions from './AddProductionContributions';
import { ProductionSideDrawersProps } from '../types';
import AddFeaturedArtists from '../../plays/CreatePlays/AddFeaturedArtists';
import AddVenues from './AddVenues';

export default function ProductionsSideDrawers(
  props: ProductionSideDrawersProps,
) {
  const { sideDrawerState, defaultSideBarState, currentState, id } = props;
  const width = '650px';

  return (
    <>
      <SideDrawer
        isActive={sideDrawerState.addVenueArtists}
        toggleDrawer={() =>
          currentState({
            ...defaultSideBarState,
            addVenueArtists: !sideDrawerState.addVenueArtists,
          })
        }
        styles={{
          width,
        }}
      >
        <AddVenues
          onClose={() =>
            currentState({
              ...defaultSideBarState,
              addVenueArtists: !sideDrawerState.addVenueArtists,
            })
          }
          id={id}
        />
      </SideDrawer>
      <SideDrawer
        isActive={sideDrawerState.addProductionArtists}
        toggleDrawer={() =>
          currentState({
            ...defaultSideBarState,
            addProductionArtists: !sideDrawerState.addProductionArtists,
          })
        }
        styles={{
          width,
        }}
      >
        <AddProductionContributions
          onClose={() =>
            currentState({
              ...defaultSideBarState,
              addProductionArtists: !sideDrawerState.addProductionArtists,
            })
          }
          id={id}
        />
      </SideDrawer>
      <SideDrawer
        isActive={sideDrawerState.addFeaturedArtists}
        toggleDrawer={() =>
          currentState({
            ...defaultSideBarState,
            addFeaturedArtists: !sideDrawerState.addFeaturedArtists,
          })
        }
        styles={{
          width,
        }}
      >
        <AddFeaturedArtists
          onClose={() =>
            currentState({
              ...defaultSideBarState,
              addFeaturedArtists: !sideDrawerState.addFeaturedArtists,
            })
          }
          id={id}
        />
      </SideDrawer>
    </>
  );
}
