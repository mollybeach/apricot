import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import Paper from '../Paper';
import UploadFileInput from './UploadFileInput';
import { Button } from '../index';

interface MultiImageUploadProps {
  title: string;
  message?: string;
  coverTitle?: string;
  photoTitle?: string;
  images?: UploadedImage[];
  uploadCallback?: (blob: string) => void;
}

export interface UploadedImage {
  id?: string;
  url?: string;
  title?: string;
}

export default function MultiImageUpload(props: MultiImageUploadProps) {
  const {
    title,
    message = `This information will be displayed publicly so be careful what you
  share.`,
    coverTitle = 'Cover Photo',
    photoTitle = 'Photo',
    images = [],
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
        <Grid
          container
          sx={{
            marginTop: '24px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <Grid item xs={12} md={4} lg={3} key={i} sx={{ textAlign: 'left' }}>
              <Image />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

const Image: React.FC = ({ imageFile }: { imageFile?: UploadedImage }) => {
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Box
        component={'div'}
        sx={{
          borderRadius: '7px',
          backgroundImage: 'url(https://via.placeholder.com/250x250)',
          backgroundSize: 'contain',
          height: '200px',
          width: '200px',
        }}
      >
        <Box
          sx={{
            borderRadius: '7px',
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            width: '200px',
            height: '200px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            opacity: 0,
            transition: '.3s ease',
            display: 'block',
            ':hover': {
              cursor: 'pointer',
              opacity: 1,
            },
          }}
        >
          <Stack
            sx={{
              gap: '8px',
              top: '50%',
              left: '50%',
              position: 'absolute',
              textAlign: 'center',
              '-webkit-transform': 'translate(-50%, -50%)',
              '-ms-transform': 'translate(-50%, -50%)',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Button
              label={'View Details'}
              variant={'contained'}
              color={'primary'}
              sx={{}}
            />
            <Button label={'Delete'} variant={'contained'} color={'error'} />
          </Stack>
        </Box>
      </Box>
      <Box sx={{ fontWeight: 'bold' }}>
        <Typography variant="h5" sx={{ color: '#111827' }}>
          Photo Title
        </Typography>
        <Typography variant="h5" sx={{ color: '#6B7280' }}>
          Photo Size
        </Typography>
      </Box>
    </Box>
  );
};
