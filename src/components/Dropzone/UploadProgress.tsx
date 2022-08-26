import React from 'react';
import { Box, IconButton } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { UploadProgressProps } from './types';

export function UploadProgress({
  file,
  onDelete,
  children,
}: UploadProgressProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box>{file.name}</Box>
      <Box sx={{ width: '100%', ml: 1 }}>{children}</Box>
      <Box>
        <IconButton
          aria-label="delete"
          size="medium"
          onClick={() => onDelete(file)}
          color="error"
        >
          <DeleteOutlineOutlinedIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </Box>
  );
}
