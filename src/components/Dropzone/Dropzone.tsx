import React, { useCallback, useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SvgGalleryIcon } from '../../utils/svg';
import { DropzoneProps, UploadableFile } from './types';
import { useMutation, useQueryClient } from 'react-query';

let currentId = 0;
const getNewId = () => ++currentId;

const useStyles = makeStyles(() => ({
  dropzone: {
    border: '1px solid #6B7280',
    borderStyle: 'dashed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 0px',
    outline: 'none',
  },
  upload: {
    marginTop: '12px',
  },
  uploadText: {
    color: '#4F46E5',
  },
  formatText: {
    color: '#6B7280',
    marginTop: '4px',
  },
}));

export default function Dropzone(props: DropzoneProps) {
  const classes = useStyles();
  const queryClient = useQueryClient();

  const {
    supportedFormats = ['image/*', 'video/*'],
    supportedFormatLabel = ' PNG, JPG, GIF up to 10MB',
    maxFileSize,
    uploadedFiles,
  } = props;
  const [files, setFiles] = useState<UploadableFile[]>([]);

  const { mutate: dataUpload } = useMutation(
    // @ts-ignore
    (data) => {
      queryClient.setQueryData(['uploadData'], () => data);
      props.isUpload();
    },
  );

  useEffect(() => {
    uploadedFiles(files);
    // @ts-ignore
    dataUpload(files);
  }, [files, dataUpload]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      const mappedAccepted = acceptedFiles.map((file) => ({
        file,
        errors: [],
        id: getNewId(),
      }));

      const mappedRejected = rejectedFiles.map((rejected) => ({
        ...rejected,
        id: getNewId(),
      }));

      setFiles((current) => [...current, ...mappedAccepted, ...mappedRejected]);
    },
    [],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // @ts-ignore
    accept: supportedFormats,
    maxSize: maxFileSize && maxFileSize * 1024,
  });

  return (
    <>
      <Box {...getRootProps({ className: classes.dropzone })}>
        <SvgGalleryIcon />
        <input {...getInputProps()} />
        <Typography variant="h5" component="p" className={classes.upload}>
          <span className={classes.uploadText}>Upload a file</span> or drag and
          drop
        </Typography>
        <Typography variant="h6" component="p" className={classes.formatText}>
          {supportedFormatLabel}
        </Typography>
      </Box>
    </>
  );
}
