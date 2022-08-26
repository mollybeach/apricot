import * as React from 'react';
import { Typography, CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { Box } from '@mui/system';
import { GlobalMessages } from '../utils/globalConfig';

interface LoaderProps {
  isLoading: boolean;
  message?: string;
}

export default function Loader(props: LoaderProps) {
  const { isLoading = false, message = GlobalMessages.loadingMsg } = props;

  return (
    <Backdrop
      sx={{
        backgroundColor: 'rgba(0,0,0,0)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isLoading}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <CircularProgress color="inherit" />
        <Box>
          <Typography variant="h4">{message}</Typography>
        </Box>
      </Box>
    </Backdrop>
  );
}
