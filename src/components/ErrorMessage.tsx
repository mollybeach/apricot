import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface ErrorMessageProps {
  message?: string;
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
  },
}));

export default function ErrorMessage(props: ErrorMessageProps) {
  const classes = useStyles();
  const {
    message = 'Ohh no. Something went Wrong. Please try after sometime...',
  } = props;
  return (
    <Box className={classes.container}>
      <Typography variant="h4">{message}</Typography>
    </Box>
  );
}
