import React, { useEffect, useState } from 'react';
import { Box, LinearProgress } from '@mui/material';
import { UploadProgress } from './UploadProgress';
import { uploadFile } from './UploadService';
import { UploadSuccessProps } from './types';

export function UploadSuccess({
  file,
  onDelete,
  onUpload,
}: UploadSuccessProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function upload() {
      const url = await uploadFile(file, setProgress);
      onUpload(file, url);
    }

    upload();
  }, []);

  return (
    <Box>
      <UploadProgress file={file} onDelete={onDelete}>
        <LinearProgress
          variant="determinate"
          value={progress}
          color="success"
        />
      </UploadProgress>
    </Box>
  );
}
