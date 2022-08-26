import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Box, Divider, Grid, Typography } from '@mui/material';
import {
  Alert,
  Paper,
  Select,
  TextField,
  Autocomplete,
} from '../../../components';
import DialogHeader from '../../common/DialogHeader';
import { CreateVenueValidation } from './VenuesValidationSchema';
import { useStyles } from '../styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAllStudios } from '../../../api/studios';

import {
  useDeleteVenue,
  useGetVenue,
  usePostVenue,
  usePutVenue,
} from '../../../api/venues';
import { VenueStageConfiguration } from '../../../types/Venue';
import { AlertState } from '../../../types/Global';
import {
  alertAutoHideDuration,
  GlobalMessages,
} from '../../../utils/globalConfig';
import Loader from '../../../components/Loader';
import { Studio } from '../../../types/Studio';
import SingleImageUpload from '../../../components/Upload/SingleImageUpload';

export default function CreateVenue() {
  const { id: venueId } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleSubmit, control, reset } = CreateVenueValidation();
  const { data: venue, isSuccess: isVenueLoaded } = useGetVenue(venueId);
  const updateMutation = usePutVenue(venueId);
  const postMutation = usePostVenue();
  const deleteMutation = useDeleteVenue(venueId);
  const { data: studios, isSuccess: isStudiosLoaded } = useGetAllStudios();
  const [alertState, setAlertState] = useState<AlertState>({
    active: false,
    message: '',
  });

  const {
    isError: postError,
    isLoading: postLoading,
    isSuccess: postSuccess,
  } = postMutation;
  const {
    isError: updateError,
    isLoading: updateLoading,
    isSuccess: updateSuccess,
  } = updateMutation;
  const {
    isError: deleteArtistsError,
    isSuccess: deleteArtistsSuccess,
    isLoading: deleteArtistsLoading,
  } = deleteMutation;

  useEffect(() => {
    if (isVenueLoaded && isStudiosLoaded) {
      reset({
        ...venue,
        studioId: venue.studioId ? venue.studioId : null,
        selectedStudio: venue.studio
          ? {
              id: venue.studio?.id,
              label: venue.studio?.name,
            }
          : null,
      });
    }
  }, [isVenueLoaded, isStudiosLoaded]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries(['selectedVenue']);
    };
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const formData = { ...data, studioId: data.selectedStudio.id };
      console.log(formData);
      venueId
        ? await updateMutation.mutateAsync(formData).then(() =>
            setAlertState({
              active: true,
              message: GlobalMessages.updateVenueSuccessMsg,
            }),
          )
        : await postMutation.mutateAsync(formData).then(() =>
            setAlertState({
              active: true,
              message: GlobalMessages.addVenueSuccessMsg,
            }),
          );
      handleClose();
    } catch (e) {
      setAlertState({
        active: true,
        message: GlobalMessages.errorMsg,
      });
    }
  };

  const handleDeleteVenue = async () => {
    try {
      await deleteMutation.mutateAsync().then(() => {
        setAlertState({
          active: true,
          message: GlobalMessages.deleteVenueSuccessMsg,
        });
        handleClose();
      });
    } catch (e) {
      setAlertState({
        active: true,
        message: GlobalMessages.errorMsg,
      });
    }
  };
  const handleClose = () => {
    queryClient.invalidateQueries(['selectedVenue']).then(() => {
      reset();
      navigate('/venues');
    });
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries(['selectedVenue']);
    };
  }, []);

  if (postSuccess || updateSuccess || deleteArtistsSuccess) {
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
      {(postLoading || updateLoading || deleteArtistsLoading) && (
        <Loader
          isLoading={postLoading || updateLoading || deleteArtistsLoading}
        />
      )}
      {(postError || updateError || deleteArtistsError) && (
        <Alert
          message={alertState.message}
          open={alertState.active}
          severity="error"
          autoHideDuration={alertAutoHideDuration}
          onClose={() => setAlertState({ active: false })}
        />
      )}
      <Box className={classes.bodyBackground}>
        <DialogHeader
          title={venueId ? 'Edit Venue' : 'Create Venue'}
          handleSave={handleSubmit(onSubmit)}
          handleDelete={venueId && handleDeleteVenue}
          cancel={() => handleClose()}
        />
        <Grid container className={classes.container}>
          <Grid item xs={12} md={8} lg={8}>
            <Box>
              <Paper>
                <Box className={classes.accountInfo}>
                  <Typography variant="h2">Venue Info</Typography>
                  <Divider sx={{ marginBottom: '24px' }} />
                  <SingleImageUpload title={'Logo'} />
                  <Divider sx={{ marginBottom: '24px' }} />
                  <SingleImageUpload title={'Banner'} />
                  <Divider sx={{ marginBottom: '24px' }} />
                  <Box mt={3}>
                    <TextField
                      name="name"
                      label="Venue Name"
                      control={control}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', mt: 3 }}>
                    <Box sx={{ width: '100%' }}>
                      <Autocomplete
                        label={'Studio'}
                        placeholder="Selected Studio"
                        name="selectedStudio"
                        control={control}
                        options={((studios as Studio[]) || []).map(
                          (studio: Studio) => {
                            return {
                              id: studio.id,
                              label: studio.name,
                            };
                          },
                        )}
                      />
                    </Box>
                  </Box>
                  <Box mt={3}>
                    <TextField name="street" label="Street" control={control} />
                  </Box>
                  <Box mt={3}>
                    <TextField name="city" label="City" control={control} />
                  </Box>
                  <Box mt={3}>
                    <TextField label="State" name="state" control={control} />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      label="Zip Code"
                      name="zipcode"
                      control={control}
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      label="Website"
                      name="website"
                      control={control}
                    />
                  </Box>
                  <Box mt={3}>
                    <Select
                      options={(
                        Object.keys(VenueStageConfiguration) as Array<
                          keyof typeof VenueStageConfiguration
                        >
                      ).map((key) => VenueStageConfiguration[key])}
                      control={control}
                      name="stageConfiguration"
                      label="Stage Configuration"
                      placeholder={'Select Stage Configurations'}
                      multiple
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      label="Special Features"
                      name="specialFeatures"
                      control={control}
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      label="Venue Capacity"
                      name="venueCapacity"
                      control={control}
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      label="Completion Year"
                      name="completionYear"
                      control={control}
                    />
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
