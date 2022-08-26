import * as React from 'react';
import { styled } from '@mui/styles';
import { SxProps, Theme } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { Box } from '@mui/material';
import Avatar from '../Avatar';

const Input = styled('input')({
  display: 'none',
});

interface UploadFileInputProps {
  imageData: (data: string | ArrayBuffer | null) => void;
  id: string;
  buttonVariant?: 'text' | 'outlined' | 'contained';
  uploadBtnLabel?: string;
  sx?: SxProps<Theme>;
}

export default function UploadFileInput(props: UploadFileInputProps) {
  const {
    imageData,
    id,
    buttonVariant = 'outlined',
    uploadBtnLabel = 'Upload',
    sx,
  } = props;

  function encodeImageFileAsURL(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      imageData(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const handleChange = (event: any) => {
    encodeImageFileAsURL(event);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={sx}>
      <label htmlFor={id}>
        <Input id={id} multiple type="file" onChange={handleChange} />
        <Button
          variant={buttonVariant}
          component="span"
          sx={{
            color: '#374151',
            border: '1px solid #D1D5DB',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
            borderRadius: '6px',
            textTransform: 'capitalize',
            '&:hover': {
              backgroundColor: '#D1D5DB',
              borderColor: '#D1D5DB',
            },
          }}
        >
          {uploadBtnLabel}
        </Button>
      </label>
    </Stack>
  );
}
