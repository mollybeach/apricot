import * as React from 'react';
import { Controller } from 'react-hook-form';
import {
  FormGroup,
  TextField as InputField,
  TextFieldProps,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';

type TextFieldCustomProps = {
  label?: string;
  name: string;
  control: any;
  fullWidth?: boolean;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
} & TextFieldProps;

export default function TextField(props: TextFieldCustomProps) {
  const {
    label,
    fullWidth = true,
    placeholder = label,
    type = 'text',
    name = 'element',
    control,
    multiline = false,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormGroup>
          {label && (
            <InputLabel
              id={label.toLowerCase().replace(' ', '-')}
              aria-label={label}
              variant="standard"
              sx={{ paddingBottom: '4px' }}
            >
              {label}
            </InputLabel>
          )}

          <InputField
            error
            hiddenLabel
            name={name}
            fullWidth={fullWidth}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            helperText={error ? error.message : null}
            multiline={multiline}
            minRows={multiline ? 4 : 1}
          />
        </FormGroup>
      )}
    />
  );
}
