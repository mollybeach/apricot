import * as React from 'react';
import { Drawer, Box, styled, DrawerProps } from '@mui/material';

const MuiDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    boxShadow:
      '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    minWidth: 384,
    background: '#E5E5E5',
  },
});

type SideDrawerProps = {
  children: React.ReactNode;
  isActive: boolean;
  toggleDrawer: (isActive: boolean) => void;
  styles?: React.CSSProperties;
} & DrawerProps;

export default function SideDrawer(props: SideDrawerProps) {
  const { children, styles } = props;
  return (
    <>
      <MuiDrawer
        anchor="right"
        open={props.isActive}
        onClose={() => props.toggleDrawer(!props.isActive)}
      >
        <Box style={styles}>{children}</Box>
      </MuiDrawer>
    </>
  );
}
