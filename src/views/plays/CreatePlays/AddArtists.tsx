import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Box, Divider, Typography } from '@mui/material';
import { Alert, DatePicker, Paper, TextField } from '../../../components';
import DialogHeader from '../../common/DialogHeader';
import { AddArtistsValidation } from './PlaysValidationSchema';
import { useStyles } from '../styles';
import { AddArtistsProps } from '../types';
import { usePostArtist } from '../../../api/artists';
import ErrorMessage from '../../../components/ErrorMessage';
import Loader from '../../../components/Loader';
import { AlertState } from '../../../types/Global';
import {
  alertAutoHideDuration,
  GlobalMessages,
} from '../../../utils/globalConfig';

export default function AddArtists(props: AddArtistsProps) {
  const { onClose } = props;
  const queryClient = useQueryClient();
  const classes = useStyles();
  const { handleSubmit, control, reset } = AddArtistsValidation();

  const postMutation = usePostArtist();

  const [alertState, setAlertState] = useState<AlertState>({
    active: false,
    message: '',
  });

  const { isLoading, isError, isSuccess } = postMutation;
  const onSubmit = async (data: any) => {
    try {
      await postMutation.mutateAsync(data).then(() =>
        setAlertState({
          active: true,
          message: GlobalMessages.addArtistSuccessMsg,
        }),
      );
      await queryClient.invalidateQueries(['allArtists'], data);
      reset();
      onClose();
    } catch (e) {
      setAlertState({
        active: true,
        message: GlobalMessages.errorMsg,
      });
    }
  };

  if (isError) {
    return <ErrorMessage />;
  }

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (isSuccess) {
    return (
      <Alert
        message={alertState.message}
        open={alertState.active}
        autoHideDuration={alertAutoHideDuration}
        onClose={() => setAlertState({ active: false })}
      />
    );
  }
  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      {isError && (
        <Alert
          message={alertState.message}
          open={alertState.active}
          severity="error"
          autoHideDuration={alertAutoHideDuration}
          onClose={() => setAlertState({ active: false })}
        />
      )}
      <Box>
        <DialogHeader
          title="Add Artists"
          handleSave={handleSubmit(onSubmit)}
          cancel={() => {
            reset();
            onClose();
          }}
        />
        <Box className={classes.content}>
          <Paper>
            <Box className={classes.subContent}>
              <Typography variant="h2">Details</Typography>
              <Divider style={{ marginBottom: '24px' }} />
              <Box>
                <TextField
                  name="firstName"
                  label="First Name"
                  control={control}
                />
              </Box>
              <Box className={classes.mt}>
                <TextField
                  name="lastName"
                  label="Last Name"
                  control={control}
                />
              </Box>
              <Box className={classes.mt}>
                <DatePicker
                  label="Date of Birth"
                  control={control}
                  name="dob"
                />
              </Box>
              <Box className={classes.mt}>
                <TextField
                  name="hometown"
                  label="Home Town"
                  control={control}
                />
              </Box>
              <Box className={classes.mt}>
                <TextField
                  name="homeState"
                  label="Home State"
                  control={control}
                />
              </Box>
              <Box className={classes.mt}>
                <TextField
                  name="unionAffiliation"
                  label="Union Affiliation"
                  control={control}
                />
              </Box>
              <Box className={classes.mt}>
                <TextField
                  name="homeCountry"
                  label="Home Country"
                  control={control}
                />
              </Box>
              <Box className={classes.mt}>
                <TextField name="bio" label="Bio" control={control} />
              </Box>
              <Box className={classes.mt}>
                <TextField
                  name="professionalName"
                  label="Professional Name"
                  control={control}
                />
              </Box>
              <Box className={classes.mt}>
                <TextField name="award" label="Award" control={control} />
              </Box>
              <Box className={classes.mt}>
                <TextField name="website" label="Website" control={control} />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
