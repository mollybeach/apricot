import React from 'react';
import { SideDrawer } from '../../../components';
import { PlaySideDrawersProps } from '../types';
import AddCharacters from './AddCharacters';
import AddFeaturedArtists from './AddFeaturedArtists';
import AddPlayContribution from './AddPlayContribution';
import AddSongs from './AddSongs';
import AddOrchestrations from './AddOrchestrations';

export default function PlaySideDrawers(props: PlaySideDrawersProps) {
  const { sideDrawerState, defaultSideBarState, currentState, id } = props;
  const width = '650px';

  return (
    <>
      <SideDrawer
        isActive={sideDrawerState.addPlayArtists}
        toggleDrawer={() =>
          currentState({
            ...defaultSideBarState,
            addPlayArtists: !sideDrawerState.addPlayArtists,
          })
        }
        styles={{
          width,
        }}
      >
        <AddPlayContribution
          onClose={() =>
            currentState({
              ...defaultSideBarState,
              addPlayArtists: !sideDrawerState.addPlayArtists,
            })
          }
          id={id}
        />
      </SideDrawer>
      <SideDrawer
        isActive={sideDrawerState.addCharacters}
        toggleDrawer={() =>
          currentState({
            ...defaultSideBarState,
            addCharacters: !sideDrawerState.addCharacters,
          })
        }
        styles={{
          width,
        }}
      >
        <AddCharacters
          onClose={() =>
            currentState({
              ...defaultSideBarState,
              addCharacters: !sideDrawerState.addCharacters,
            })
          }
          id={id}
        />
      </SideDrawer>
      <SideDrawer
        isActive={sideDrawerState.addOrchestrations}
        toggleDrawer={() =>
          currentState({
            ...defaultSideBarState,
            addOrchestrations: !sideDrawerState.addOrchestrations,
          })
        }
        styles={{
          width,
        }}
      >
        <AddOrchestrations
          onClose={() =>
            currentState({
              ...defaultSideBarState,
              addOrchestrations: !sideDrawerState.addOrchestrations,
            })
          }
          id={id}
        />
      </SideDrawer>

      <SideDrawer
        isActive={sideDrawerState.addSongs}
        toggleDrawer={() =>
          currentState({
            ...defaultSideBarState,
            addSongs: !sideDrawerState.addSongs,
          })
        }
        styles={{
          width,
        }}
      >
        <AddSongs
          onClose={() =>
            currentState({
              ...defaultSideBarState,
              addSongs: !sideDrawerState.addSongs,
              id: null,
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
        />
      </SideDrawer>
    </>
  );
}
