import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import { Alert, Autocomplete, Paper, TextField } from '../../../components';
import DialogHeader from '../../common/DialogHeader';
import { useStyles } from '../styles';
import { CreateStudioValidation } from './StudioValidationSchema';
import Select from '../../../components/Select';
import { StudioType } from '../../../types/Studio';
import { useNavigate, useParams } from 'react-router-dom';
import CreateStudioSideDrawer from './CreateStudioSideDrawer';
import {
  useDeleteStudio,
  useGetStudio,
  usePostStudio,
  usePutStudio,
} from '../../../api/studios';
import { SideBarState } from '../types';
import { AlertState } from '../../../types/Global';
import Loader from '../../../components/Loader';
import {
  alertAutoHideDuration,
  GlobalMessages,
} from '../../../utils/globalConfig';
import AddIcon from '@mui/icons-material/Add';
import { useGetAllInstitutions } from '../../../api/institutions';
import { Institution } from '../../../types/Institution';
import SingleImageUpload from '../../../components/Upload/SingleImageUpload';

export default function CreateStudio() {
  const { id: studioId } = useParams() || {};

  const navigate = useNavigate();
  const classes = useStyles();
  const queryClient = useQueryClient();
  const { handleSubmit, control, reset } = CreateStudioValidation();
  const { data: studio, isSuccess: isStudioLoaded } = useGetStudio(studioId);
  const { data: institutions, isSuccess: isInstitutionsLoaded } =
    useGetAllInstitutions();

  const updateMutation = usePutStudio(studioId);
  const {
    isSuccess: updateStudioMetaSuccess,
    isError: updateStudioMetaFailed,
    isLoading: updateStudioMetaLoading,
  } = updateMutation;

  const postMutation = usePostStudio();
  const {
    isSuccess: postStudioMetaSuccess,
    isError: postStudioMetaFailed,
    isLoading: postStudioMetaLoading,
  } = postMutation;

  const deleteMutation = useDeleteStudio(studioId);
  const {
    isSuccess: deleteStudioMetaSuccess,
    isError: deleteStudioMetaFailed,
    isLoading: deleteStudioMetaLoading,
  } = deleteMutation;

  const defaultSideBarState = {
    id: '',
    addInstitution: false,
  };
  const [alertState, setAlertState] = useState<AlertState>({
    active: false,
    message: '',
  });

  const [isSideDrawerOn, setSideDrawerOn] =
    useState<SideBarState>(defaultSideBarState);

  useEffect(() => {
    if (isStudioLoaded && isInstitutionsLoaded) {
      console.log(studio, institutions);
      reset({
        ...studio,
        institutionId: studio?.institution?.id,
        selectedInstitution: studio?.institution
          ? { id: studio.institution.id, label: studio.institution.name }
          : null,
      });
    }
  }, [isStudioLoaded, isInstitutionsLoaded]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries(['selectedStudio']);
    };
  }, []);

  const handleClose = () => {
    queryClient.removeQueries(['selectedStudio']);
    reset();
    navigate('/studios');
  };

  const onSubmit = async (data: any) => {
    const formData = { ...data, institutionId: data.selectedInstitution?.id };
    try {
      studioId
        ? await updateMutation.mutateAsync(formData)
        : await postMutation.mutateAsync(formData);

      setAlertState({
        active: true,
        message: studioId
          ? GlobalMessages.updateStudioSuccessMsg
          : GlobalMessages.addStudioSuccessMsg,
      });
      handleClose();
    } catch (e) {
      setAlertState({
        active: true,
        message: GlobalMessages.errorMsg,
      });
    }
  };

  const handleDeleteStudio = async () => {
    try {
      await deleteMutation.mutateAsync();
      await queryClient.invalidateQueries(['selectedStudio']);
      setAlertState({
        active: true,
        message: GlobalMessages.deleteStudioSuccessMsg,
      });
      handleClose();
    } catch (e) {
      setAlertState({
        active: true,
        message: GlobalMessages.errorMsg,
      });
    }
  };

  if (
    updateStudioMetaSuccess ||
    postStudioMetaSuccess ||
    deleteStudioMetaSuccess
  ) {
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
      {(postStudioMetaLoading ||
        updateStudioMetaLoading ||
        deleteStudioMetaLoading) && (
        <Loader
          isLoading={
            postStudioMetaLoading ||
            updateStudioMetaLoading ||
            deleteStudioMetaLoading
          }
        />
      )}
      {(postStudioMetaFailed ||
        updateStudioMetaFailed ||
        deleteStudioMetaFailed) && (
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
          title={studioId ? 'Edit Studio' : 'Create Studio'}
          handleSave={handleSubmit(onSubmit)}
          handleDelete={studioId && handleDeleteStudio}
          cancel={() => {
            reset();
            navigate('/studios');
          }}
        />
        <Grid
          container
          sx={{ justifyContent: 'center !important' }}
          className={classes.container}
        >
          <Grid item xs={12} md={8} lg={8}>
            <Paper>
              <Box className={classes.accountInfo}>
                <Typography variant="h2">Studio Info</Typography>
                <Divider sx={{ marginBottom: '24px' }} />
                <SingleImageUpload title={'Logo'} />
                <Divider sx={{ margin: '24px' }} />
                <SingleImageUpload title={'Banner'} />
                <Divider sx={{ margin: '24px' }} />
                <Box mb={3}>
                  <TextField label="Name" name="name" control={control} />
                </Box>
                <Box mb={3}>
                  <Select
                    options={(
                      Object.keys(StudioType) as Array<keyof typeof StudioType>
                    ).map((key) => StudioType[key])}
                    placeholder="Studio Type"
                    control={control}
                    name="type"
                    label="Type"
                  />
                </Box>
                <Box mb={3} style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Box style={{ width: '100%' }}>
                    <Autocomplete
                      placeholder="Select Institution"
                      name="selectedInstitution"
                      label={'Select Institution'}
                      control={control}
                      options={((institutions as Institution[]) || []).map(
                        (institution: Institution) => {
                          return {
                            id: institution.id,
                            label: institution.name,
                          };
                        },
                      )}
                    />
                  </Box>
                  <Box>
                    <IconButton
                      color="primary"
                      aria-label="addInstitution"
                      component="div"
                      onClick={() =>
                        setSideDrawerOn({
                          ...isSideDrawerOn,
                          addInstitution: !isSideDrawerOn.addInstitution,
                        })
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="h2">Address</Typography>
                <Divider style={{ marginBottom: '24px' }} />
                <Box mb={3}>
                  <TextField label="Street" name="street" control={control} />
                </Box>
                <Box mb={3}>
                  <TextField label="City" name="city" control={control} />
                </Box>
                <Box mb={3}>
                  <TextField label="State" name="state" control={control} />
                </Box>
                <Box mb={3}>
                  <TextField
                    label="Zip Code"
                    name="zipcode"
                    control={control}
                  />
                </Box>
                <Box mb={3}>
                  <TextField label="Website" name="website" control={control} />
                </Box>
              </Box>
              <CreateStudioSideDrawer
                sideDrawerState={isSideDrawerOn}
                id={isSideDrawerOn.id}
                defaultSideBarState={defaultSideBarState}
                currentState={(state: any) => setSideDrawerOn(state)}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
