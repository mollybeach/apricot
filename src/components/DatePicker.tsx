import * as React from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  FormGroup,
  InputLabel,
  TextField,
  Stack,
  FormHelperText,
  TextFieldProps,
} from '@mui/material';
import { Controller } from 'react-hook-form';

interface DatePickerProps {
  label: string;
  control: any;
  name: string;
  placeholder?: string;
  dateFormat?: string;
  minDate?: Date;
}

export default function DatePicker(props: DatePickerProps) {
  const {
    label,
    control,
    name,
    placeholder = 'Date',
    dateFormat = 'MM.dd.yyyy',
    minDate,
  } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <FormGroup>
          <InputLabel
            id={label.toLowerCase().replace(' ', '-')}
            aria-label={label}
            variant="standard"
          >
            {label}
          </InputLabel>
          <Controller
            name={name}
            control={control}
            render={({
              field: { ref, ...fieldProps },
              fieldState: { error },
            }) => (
              <>
                <MobileDatePicker
                  {...fieldProps}
                  inputRef={ref}
                  label=""
                  inputFormat={dateFormat}
                  renderInput={(params: TextFieldProps) => (
                    <TextField {...params} placeholder={placeholder} />
                  )}
                  minDate={minDate}
                />
                {error ? (
                  <FormHelperText error>{error.message}</FormHelperText>
                ) : null}
              </>
            )}
          />
        </FormGroup>
      </Stack>
    </LocalizationProvider>
  );
}
