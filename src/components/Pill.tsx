import * as React from 'react';
import Chip, { ChipProps } from '@mui/material/Chip';

type PillProps = {
  label: string;
  color: 'error' | 'success' | 'default' | 'disabled';
  variant: 'outlined' | 'filled';
} & ChipProps;

export default function Pill(props: PillProps) {
  return <Chip {...props} label={props.label} color={props.color} />;
}
