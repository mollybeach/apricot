import * as React from 'react';
import {
  Switch as MuiSwitch,
  SwitchProps,
  FormGroup,
  styled,
  Stack,
  Typography,
  FormHelperText,
  Box,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { useState } from 'react';

const CustomSwitch = styled((props: SwitchProps) => (
  <MuiSwitch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 48,
  height: 31,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#6CD86B',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    boxShadow: '0px 3px 7px rgba(0, 0, 0, 0.12)',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    width: 27,
    height: 27,
  },
  '& .MuiSwitch-track': {
    borderRadius: 16,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

type CustomSwitchProps = {
  label: string;
  name: string;
  control: any;
  checked?: boolean;
};

export default function Switch(props: CustomSwitchProps) {
  const { label, name, control, checked } = props;
  const [errorState, setErrorState] = useState<string | undefined>('');
  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography style={{ color: '#6B7280' }}>{label}</Typography>
        <FormGroup>
          <Controller
            name={name}
            control={control}
            defaultValue={false}
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
              <>
                <CustomSwitch
                  {...props}
                  {...field}
                  defaultChecked={checked ? checked : false}
                  inputProps={{ 'aria-label': name }}
                  inputRef={ref}
                />
                {error ? setErrorState(error.message) : setErrorState('')}
              </>
            )}
          />
        </FormGroup>
      </Stack>
      {errorState !== '' && <FormHelperText error>{errorState}</FormHelperText>}
    </Box>
  );
}
