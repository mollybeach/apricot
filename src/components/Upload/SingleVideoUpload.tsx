import React from 'react';
import { Box, Typography } from '@mui/material';
import Paper from '../Paper';
import UploadFileInput from './UploadFileInput';

interface SingleVideoUploadProps {
  title: string;
  id?: string;
  message?: string;
  coverTitle?: string;
  videoTitle?: string;
  uploadCallback?: (blob: string) => void;
}

export default function SingleVideoUpload(props: SingleVideoUploadProps) {
  const {
    id,
    title,
    message = `This information will be displayed publicly so be careful what you
  share.`,
    coverTitle = 'Video',
    videoTitle = 'Video Title',
    uploadCallback,
  } = props;

  const [fileSrc, setFileSrc] = React.useState<string>(null);

  const fileUploadComplete = (blob: string) => {
    uploadCallback(blob);
    setFileSrc(blob);
  };

  return (
    <>
      <Box>
        <Box sx={{ marginBottom: '24px' }}>
          <Typography variant="h2">{title}</Typography>
          <p style={{ margin: 0 }}>{message}</p>
        </Box>
        <Box sx={{ marginBottom: '24px' }}>
          <Typography variant="h5" sx={{ marginBottom: '4px' }}>
            {videoTitle}
          </Typography>
          <UploadFileInput imageData={fileUploadComplete} id={id} />
        </Box>
        <Box>
          <Box
            sx={{
              maxWidth: '100%',
              maxHeight: '300px',
            }}
            component="img"
            src={fileSrc}
          />
        </Box>
      </Box>
    </>
  );
}
