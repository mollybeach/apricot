import * as React from 'react';
import { Paper as MuiPaper, styled, PaperProps } from '@mui/material';

const Item = styled(MuiPaper)(() => ({
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
  borderRadius: 6,
  background: '#FFFFFF',
}));

type MuiPaperProps = {
  children: React.ReactNode;
} & PaperProps;

export default function Paper({ children }: MuiPaperProps) {
  return <Item>{children}</Item>;
}
