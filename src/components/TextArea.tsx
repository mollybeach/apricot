import * as React from 'react';
import { Controller } from 'react-hook-form';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from '@mui/material/TextareaAutosize';
import { FormGroup, FormHelperText, InputLabel, styled } from '@mui/material';

const MuiTextareaAutosize = styled(TextareaAutosize)({
  border: '1px solid #D1D5DB',
  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  borderRadius: 6,
  padding: '9px 13px',
  outlineColor: 'red',
  '::placeholder': {
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 24,
    color: '#6B7280',
  },
});

type TextAreaProps = {
  label: string;
  control: any;
  name: string;
} & TextareaAutosizeProps;

export default function Textarea(props: TextAreaProps) {
  const { label, control, name } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormGroup>
          <InputLabel
            id={label.toLowerCase().replace(' ', '-')}
            aria-label={label}
            variant="standard"
          >
            {label}
          </InputLabel>
          <MuiTextareaAutosize {...props} onChange={onChange} value={value} />
          {error ? (
            <FormHelperText error>{error.message}</FormHelperText>
          ) : null}
        </FormGroup>
      )}
    />
  );
}
