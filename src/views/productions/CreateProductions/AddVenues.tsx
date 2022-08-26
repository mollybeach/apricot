import React, { useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { Alert, DatePicker, Paper, TextField } from '../../../components';
import DialogHeader from '../../common/DialogHeader';
import { useStyles } from '../styles';
import { ProductionArtistsProps } from '../types';
import { CreateVenueValidation } from '../../venues/CreateVenues/VenuesValidationSchema';
import { usePostVenue } from '../../../api/venues';
import {
  alertAutoHideDuration,
  GlobalMessages,
} from '../../../utils/globalConfig';
import { AlertState } from '../../../types/Global';
import { useQueryClient } from 'react-query';

export default function AddVenues(props: ProductionArtistsProps) {
  const { onClose, id } = props;

  const classes = useStyles();
  const queryClient = useQueryClient();
  const { handleSubmit, control, reset } = CreateVenueValidation();
  const postMutation = usePostVenue();
  const { isError: postError } = postMutation;

  const [alertState, setAlertState] = useState<AlertState>({
    active: false,
    message: '',
  });

  const onSubmit = async (data: any) => {
    try {
      const formData = { ...data };
      await postMutation.mutateAsync(formData);
      handleClose();
    } catch (e) {
      setAlertState({
        active: true,
        message: GlobalMessages.errorMsg,
      });
    }
  };

  const handleClose = () => {
    queryClient.invalidateQueries(['allVenues']).then(() => {
      reset();
      onClose();
    });
  };

  return (
    <Box>
      {postError && (
        <Alert
          message={alertState.message}
          open={alertState.active}
          severity="error"
          autoHideDuration={alertAutoHideDuration}
          onClose={() => setAlertState({ active: false })}
        />
      )}
      <DialogHeader
        title={id ? 'Edit Venues' : 'Add Venues'}
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
              <TextField name="lastName" label="Last Name" control={control} />
            </Box>
            <Box className={classes.mt}>
              <DatePicker label="Date of Birth" control={control} name="dob" />
            </Box>
            <Box className={classes.mt}>
              <TextField name="hometown" label="Home Town" control={control} />
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
              <TextField
                name="resourceLocation"
                label="Resource Location"
                control={control}
              />
            </Box>
            <Box className={classes.mt}>
              <TextField name="website" label="Website" control={control} />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
