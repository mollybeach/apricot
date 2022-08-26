import React from 'react';
import { SideDrawer } from '../../../components';
import { StudioSideDrawersProps } from '../types';
import AddInstitution from './AddInstitution';

export default function CreateSideDrawer(props: StudioSideDrawersProps) {
  const { sideDrawerState, defaultSideBarState, currentState, id } = props;
  const width = '650px';

  return (
    <>
      <SideDrawer
        isActive={sideDrawerState.addInstitution}
        toggleDrawer={() =>
          currentState({
            ...defaultSideBarState,
            addInstitution: !sideDrawerState.addInstitution,
          })
        }
        styles={{
          width,
        }}
      >
        <AddInstitution
          onClose={() =>
            currentState({
              ...defaultSideBarState,
              addInstitution: !sideDrawerState.addInstitution,
            })
          }
          id={id}
        />
      </SideDrawer>
    </>
  );
}
