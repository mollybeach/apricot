import React, { useEffect, useState } from 'react';
import { Box, Divider, Fab, Typography } from '@mui/material';
import { UploadFile } from '@mui/icons-material';
import SideDrawer from '../SideDrawer';
import { UploadError } from './UploadError';
import { UploadSuccess } from './UploadSuccess';
import { UploadableFile } from './types';

interface UploaderProps {
  children: any;
  isUploadData?: any;
}

export default function Upload(props: UploaderProps) {
  const [state, setState] = useState<boolean>(false);
  const [files, setFiles] = useState<UploadableFile[]>();
  const [enableBtn, setEnableBtn] = useState<boolean>(false);

  useEffect(() => {
    if (props.isUploadData?.length > 0) {
      setFiles(props.isUploadData);
    }
  }, [props.isUploadData]);

  useEffect(() => {
    if (files?.length > 0) {
      setEnableBtn(true);
    } else {
      setEnableBtn(false);
    }
  }, [files, props.isUploadData]);

  const onDelete = (file: File) => {
    setFiles((current: any) =>
      current.filter((item: any) => item.file !== file),
    );
  };

  const onUpload = (file: File, url: string) => {
    setFiles((current: any) =>
      current.map((item: any) => {
        if (item.file === file) {
          return { ...item, url };
        }
      }),
    );
  };

  return (
    <>
      <div className="floating-progress">
        {props.children}

        {enableBtn && files?.length > 0 && (
          <Box
            sx={{
              position: 'fixed',
              display: 'flex',
              justifyContent: 'flex-end',
              zIndex: 1400,
              bottom: '24px',
              right: '24px',
              left: 'auto',
            }}
          >
            <Fab
              color="secondary"
              aria-label="edit"
              onClick={() => setState(!state)}
            >
              <UploadFile />
            </Fab>
          </Box>
        )}

        <SideDrawer isActive={state} toggleDrawer={() => setState(!state)}>
          <>
            <Box sx={{ padding: '16px' }}>
              <Typography variant="h1">Uploading Files...</Typography>
              <Divider />
              <Box sx={{ mt: 2 }}>
                {files?.map((fileWrapper: any) => (
                  <Box key={fileWrapper.id}>
                    {fileWrapper.errors.length ? (
                      <UploadError
                        file={fileWrapper.file}
                        errors={fileWrapper.errors}
                        onDelete={onDelete}
                      />
                    ) : (
                      <UploadSuccess
                        onDelete={onDelete}
                        onUpload={onUpload}
                        file={fileWrapper.file}
                      />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        </SideDrawer>
      </div>
    </>
  );
}
