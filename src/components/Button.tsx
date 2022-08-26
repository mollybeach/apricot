import * as React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';

type CustomButtonProps = {
  label: string;
  variant: 'text' | 'outlined' | 'contained';
  color: 'primary' | 'secondary' | 'info' | 'error';
} & ButtonProps;

export default function Button(props: CustomButtonProps) {
  return (
    <>
      <MuiButton {...props}>{props.label}</MuiButton>
    </>
  );
}
