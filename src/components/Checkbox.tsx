import * as React from 'react';
import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  styled,
} from '@mui/material';
import { Controller } from 'react-hook-form';

const Icon = styled('span')(() => ({
  border: '1px solid #4F46E5',
  borderRadius: 4,
  width: 16,
  height: 16,
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: '#E0E7FF',
  },
  'input:disabled ~ &': {
    border: '1px solid rgba(0, 0, 0, 0.38)',
    boxShadow: 'none',
    background: 'transparent',
  },
}));

const CheckedIcon = styled(Icon)({
  backgroundColor: '#4F46E5',
  width: 16,
  height: 16,
  '&:before': {
    display: 'block',
    position: 'relative',
    right: 1,
    bottom: 1,
    width: 16,
    height: 16,
    backgroundImage:
      // eslint-disable-next-line quotes
      "url(\"data:image/svg+xml,%3Csvg width='9' height='7' viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.20741 0.792787C9.39488 0.980314 9.50019 1.23462 9.50019 1.49979C9.50019 1.76495 9.39488 2.01926 9.20741 2.20679L4.20741 7.20679C4.01988 7.39426 3.76557 7.49957 3.50041 7.49957C3.23524 7.49957 2.98094 7.39426 2.79341 7.20679L0.793407 5.20679C0.611249 5.01818 0.510455 4.76558 0.512733 4.50339C0.515012 4.24119 0.62018 3.99038 0.805589 3.80497C0.990997 3.61956 1.24181 3.51439 1.50401 3.51211C1.7662 3.50983 2.0188 3.61063 2.20741 3.79279L3.50041 5.08579L7.79341 0.792787C7.98094 0.605316 8.23524 0.5 8.50041 0.5C8.76557 0.5 9.01988 0.605316 9.20741 0.792787Z' fill='white'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#4F46E5',
  },
});

function CustomCheckbox(props: MuiCheckboxProps) {
  return (
    <MuiCheckbox
      sx={{
        '&:hover': { bgcolor: 'transparent' },
      }}
      color="default"
      checkedIcon={<CheckedIcon />}
      icon={<Icon />}
      {...props}
    />
  );
}

type CheckboxProps = {
  label: string;
  control: any;
  name: string;
  checked?: boolean;
};

export default function Checkbox(props: CheckboxProps) {
  const { label, control, name, checked } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <FormGroup>
          <FormControlLabel
            control={
              <CustomCheckbox
                icon={<Icon />}
                {...field}
                inputProps={{ 'aria-label': `${label}` }}
                defaultChecked={checked ? checked : false}
                inputRef={ref}
              />
            }
            label={label}
          />
          {error ? (
            <FormHelperText error>{error.message}</FormHelperText>
          ) : null}
        </FormGroup>
      )}
    />
  );
}
