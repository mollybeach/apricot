import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Box, Divider, Grid, Typography } from '@mui/material';
import {
  Alert,
  DatePicker,
  Paper,
  TextField,
  Select,
} from '../../../components';
import DialogHeader from '../../common/DialogHeader';
import { AddArtistsValidation } from './ArtistsValidationSchema';
import { useStyles } from '../styles';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetArtist,
  usePostArtist,
  usePutArtist,
  useDeleteArtist,
} from '../../../api/artists';
import Loader from '../../../components/Loader';
import {
  alertAutoHideDuration,
  GlobalMessages,
} from '../../../utils/globalConfig';
import { AlertState } from '../../../types/Global';
import { UnionAffiliation } from '../../../types/Artist';
import SingleImageUpload from '../../../components/Upload/SingleImageUpload';

export default function AddArtist() {
  const { id } = useParams() || {};
  const navigate = useNavigate();
  const classes = useStyles();
  const queryClient = useQueryClient();
  const { handleSubmit, control, reset } = AddArtistsValidation();
  const { data: artist, isSuccess: isArtistLoaded } = useGetArtist(id);
  const updateMutation = usePutArtist(id);
  const postMutation = usePostArtist();
  const deleteMutation = useDeleteArtist(id);

  const [alertState, setAlertState] = useState<AlertState>({
    active: false,
    message: '',
  });

  useEffect(() => {
    if (isArtistLoaded) {
      reset({
        ...artist,
      });
    }
  }, [isArtistLoaded]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries(['selectedArtist']);
    };
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const formData = { ...data, artistId: id };
      id
        ? await updateMutation.mutateAsync(formData).then(() =>
            setAlertState({
              active: true,
              message: GlobalMessages.addArtistSuccessMsg,
            }),
          )
        : await postMutation.mutateAsync(formData).then(() =>
            setAlertState({
              active: true,
              message: GlobalMessages.updateArtistSuccessMsg,
            }),
          );
      await queryClient.invalidateQueries(['selectedArtist']);
      reset();
      setTimeout(() => {
        navigate('/artists');
      }, 2000);
    } catch (e) {
      setAlertState({
        active: true,
        message: GlobalMessages.errorMsg,
      });
    }
  };

  const handleDeleteArtist = async () => {
    try {
      await deleteMutation.mutateAsync();
      await queryClient.invalidateQueries(['selectedArtist']).then(() =>
        setAlertState({
          active: true,
          message: GlobalMessages.deleteArtistsMsg,
        }),
      );
      reset();
      setTimeout(() => {
        navigate('/artists');
      }, 2000);
    } catch (e) {
      setAlertState({
        active: true,
        message: GlobalMessages.errorMsg,
      });
    }
  };

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
          title={id ? 'Edit Artist' : 'Create Artist'}
          handleSave={handleSubmit(onSubmit)}
          handleDelete={id && handleDeleteArtist}
          cancel={() => {
            reset();
            navigate('/artists');
          }}
        />
        <Grid container className={classes.container}>
          <Grid item xs={12} md={8} lg={8}>
            <Paper>
              <Box className={classes.subContent}>
                <Typography variant="h2">Details</Typography>
                <Divider sx={{ marginBottom: '24px' }} />
                <SingleImageUpload title={'Profile Picture'} />
                <Divider sx={{ marginBottom: '24px' }} />
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
                    name="dob"
                    label="Date of Birth"
                    control={control}
                  />
                </Box>
                <Box className={classes.mt}>
                  <TextField name="bio" label="Bio" control={control} />
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
                    name="homeCountry"
                    label="Home Country"
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
                {id && (
                  <Box className={classes.mt}>
                    <Select
                      label="UnionAffiliation"
                      placeholder="UnionAffiliation"
                      control={control}
                      name="unionAffiliation"
                      options={(
                        Object.keys(UnionAffiliation) as Array<
                          keyof typeof UnionAffiliation
                        >
                      )
                        .map((key) => UnionAffiliation[key])
                        .sort()}
                    />
                  </Box>
                )}
                <Box className={classes.mt}>
                  <TextField
                    name="professionalName"
                    label="Professional Name"
                    control={control}
                  />
                </Box>
                <Box className={classes.mt}>
                  <TextField name="awards" label="Award" control={control} />
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
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
