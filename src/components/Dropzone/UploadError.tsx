import React from 'react';
import {
  Box,
  createStyles,
  LinearProgress,
  styled,
  Typography,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import { UploadProgress } from './UploadProgress';
import { UploadErrorProps } from './types';

const ErrorLinearProgress = withStyles((theme) =>
  createStyles({
    bar: {
      backgroundColor: theme.palette.error.main,
    },
  }),
)(LinearProgress);

let currentId = 0;
const getNewId = () => ++currentId;

export function UploadError({ file, onDelete, errors }: UploadErrorProps) {
  return (
    <>
      <UploadProgress file={file} onDelete={onDelete}>
        <ErrorLinearProgress variant="determinate" value={100} />
      </UploadProgress>

      {errors.map((error) => (
        <Box key={getNewId()}>
          <Typography color="error" component="span">
            {error.message}
          </Typography>
        </Box>
      ))}
    </>
  );
}
