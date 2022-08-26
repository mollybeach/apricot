import React from 'react';
import {
  Autocomplete as MuiAutocomplete,
  FormGroup,
  FormHelperText,
  InputLabel,
  styled,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { Controller } from 'react-hook-form';

type SelectType = {
  id: string | number;
  label: string;
  onClick?: () => void;
};

type AutocompleteCustomProps = {
  options: SelectType[];
  control: any;
  name: string;
  label?: string;
  fullWidth?: boolean;
  placeholder?: string;
  getOptionLabel?: (value: any) => string;
} & TextFieldProps;

const MuiTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    padding: '0 !important',
  },
}));

export default function Autocomplete(props: AutocompleteCustomProps) {
  const { label, options, control, name, placeholder = 'Select' } = props;

  return (
    <FormGroup>
      {label && (
        <InputLabel
          id={label.toLowerCase().replace(' ', '-')}
          aria-label={label}
          variant="standard"
        >
          {label}
        </InputLabel>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ...field }, fieldState: { error } }) => (
          <>
            <MuiAutocomplete
              {...field}
              options={options}
              disableClearable
              getOptionLabel={(option: any) => option.label}
              onChange={(event: any, newValue: any | null) => {
                onChange(newValue);
              }}
              isOptionEqualToValue={(option: any, value: any) =>
                option.id === value.id
              }
              renderInput={(params) => (
                <MuiTextField {...params} placeholder={placeholder} fullWidth />
              )}
            />
            {error ? (
              <FormHelperText error>{error.message}</FormHelperText>
            ) : null}
          </>
        )}
      />
    </FormGroup>
  );
}
