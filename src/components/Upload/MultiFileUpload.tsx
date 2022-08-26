import React from 'react';
import { Box, Typography } from '@mui/material';
import Paper from '../Paper';
import UploadFileInput from './UploadFileInput';

interface MultiFileUploadProps {
  title: string;
  message?: string;
  coverTitle?: string;
  photoTitle?: string;
  files?: UploadedFile[];
  uploadCallback?: (blob: string) => void;
}

export interface UploadedFile {
  id?: string;
  url?: string;
  title?: string;
}

export default function MultiFileUpload(props: MultiFileUploadProps) {
  const {
    title,
    message = `This information will be displayed publicly so be careful what you
  share.`,
    coverTitle = 'Cover Photo',
    photoTitle = 'Photo',
    files = [],
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
        <UploadFileInput imageData={fileUploadComplete} id={'title'} />
        <Box
          sx={{
            borderRadius: '7.5px',
            border: '1.5px solid #E0E0E0',
            marginTop: '24px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <Box
              sx={{
                padding: '8px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1.5px solid #E0E0E0',
              }}
              key={i}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box
                  component={'img'}
                  src={'/images/paperclip-icon.png'}
                  sx={{
                    padding: '0 8px 0 0',
                    maxHeight: '16px',
                  }}
                />
                <Typography
                  variant="h5"
                  component={'a'}
                  href={'https://www.google.com'}
                  sx={{ textDecoration: 'none' }}
                >
                  File Name
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '20px' }}>
                <Box sx={{ color: 'blue' }}>Replace</Box>
                <Box sx={{ color: 'red' }}>Delete</Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
