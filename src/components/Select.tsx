import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import {
  Box,
  FormGroup,
  FormHelperText,
  InputLabel,
  Select as MuiSelect,
} from '@mui/material';
import { Controller } from 'react-hook-form';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, options: readonly string[], theme: Theme) {
  return {
    fontWeight:
      options.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface MultiSelectProps {
  options: string[];
  placeholder: string;
  control: any;
  name: string;
  label?: string;
  multiple?: boolean;
}

export default function Select(props: MultiSelectProps) {
  const {
    options,
    placeholder,
    control,
    name,
    label,
    multiple = false,
  } = props;
  const theme = useTheme();

  return (
    <Box>
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
          render={({
            field: { onChange, value, ...field },
            fieldState: { error },
          }) => (
            <>
              <MuiSelect
                {...field}
                style={{ width: '100%' }}
                multiple={multiple}
                displayEmpty
                value={value ? (multiple ? value : [value]) : []}
                onChange={(e) => {
                  onChange(e);
                }}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <span>{placeholder}</span>;
                  }
                  return selected.join(', ');
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'multi select' }}
              >
                <MenuItem disabled value="">
                  <span>{placeholder}</span>
                </MenuItem>
                {options.map((item) => (
                  <MenuItem
                    key={item}
                    value={item}
                    style={getStyles(item, options, theme)}
                  >
                    {item}
                  </MenuItem>
                ))}
              </MuiSelect>
              {error ? (
                <FormHelperText error>{error.message}</FormHelperText>
              ) : null}
            </>
          )}
        />
      </FormGroup>
    </Box>
  );
}
