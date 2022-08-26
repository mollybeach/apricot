import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { Alert, Paper, TextField } from '../../../components';
import DialogHeader from '../../common/DialogHeader';
import { useStyles } from '../styles';
import { CreateInstitutionValidation } from './InstitutionValidationSchema';
import Select from '../../../components/Select';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertState } from '../../../types/Global';
import Loader from '../../../components/Loader';
import {
  alertAutoHideDuration,
  GlobalMessages,
} from '../../../utils/globalConfig';
import {
  useDeleteInstitution,
  useGetInstitution,
  usePostInstitution,
  usePutInstitution,
} from '../../../api/institutions';
import { InstitutionType } from '../../../types/Institution';
import SingleImageUpload from '../../../components/Upload/SingleImageUpload';

export default function CreateInstitution() {
  const { id: institutionId } = useParams() || {};
  const navigate = useNavigate();
  const classes = useStyles();
  const queryClient = useQueryClient();
  const { handleSubmit, control, reset } = CreateInstitutionValidation();
  const { data: studio, isSuccess: isInstitutionLoaded } =
    useGetInstitution(institutionId);

  const updateMutation = usePutInstitution(institutionId);
  const {
    isSuccess: updateInstitutionMetaSuccess,
    isError: updateInstitutionMetaFailed,
    isLoading: updateInstitutionMetaLoading,
  } = updateMutation;

  const postMutation = usePostInstitution();
  const {
    isSuccess: postInstitutionMetaSuccess,
    isError: postInstitutionMetaFailed,
    isLoading: postInstitutionMetaLoading,
  } = postMutation;

  const deleteMutation = useDeleteInstitution(institutionId);
  const {
    isSuccess: deleteInstitutionMetaSuccess,
    isError: deleteInstitutionMetaFailed,
    isLoading: deleteInstitutionMetaLoading,
  } = deleteMutation;

  const [alertState, setAlertState] = useState<AlertState>({
    active: false,
    message: '',
  });

  useEffect(() => {
    if (isInstitutionLoaded) {
      reset({
        ...studio,
      });
    }
  }, [isInstitutionLoaded]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries(['selectedInstitution']);
    };
  }, []);

  const handleClose = () => {
    queryClient.removeQueries(['selectedInstitution']);
    queryClient.invalidateQueries(['allInstitutions']).then(() => {
      reset();
      navigate('/institutions');
    });
  };

  const onSubmit = async (data: any) => {
    const formData = { ...data, institutionId };
    try {
      institutionId
        ? await updateMutation.mutateAsync(formData)
        : await postMutation.mutateAsync(formData);

      setAlertState({
        active: true,
        message: institutionId
          ? GlobalMessages.updateInstitutionSuccessMsg
          : GlobalMessages.addInstitutionSuccessMsg,
      });
      handleClose();
    } catch (e) {
      setAlertState({
        active: true,
        message: GlobalMessages.errorMsg,
      });
    }
  };

  const handleDeleteInstitution = async () => {
    try {
      await deleteMutation.mutateAsync();
      await queryClient.invalidateQueries(['selectedInstitution']);
      setAlertState({
        active: true,
        message: GlobalMessages.deleteInstitutionSuccessMsg,
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
    updateInstitutionMetaSuccess ||
    postInstitutionMetaSuccess ||
    deleteInstitutionMetaSuccess
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
      {(postInstitutionMetaLoading ||
        updateInstitutionMetaLoading ||
        deleteInstitutionMetaLoading) && (
        <Loader
          isLoading={
            postInstitutionMetaLoading ||
            updateInstitutionMetaLoading ||
            deleteInstitutionMetaLoading
          }
        />
      )}
      {(postInstitutionMetaFailed ||
        updateInstitutionMetaFailed ||
        deleteInstitutionMetaFailed) && (
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
          title={institutionId ? 'Edit Institution' : 'Create Institution'}
          handleSave={handleSubmit(onSubmit)}
          handleDelete={institutionId && handleDeleteInstitution}
          cancel={() => {
            reset();
            navigate('/institutions');
          }}
        />
        <Grid container className={classes.container}>
          <Grid item xs={12} md={8} lg={8}>
            <Paper>
              <Box className={classes.accountInfo}>
                <Typography variant="h2">Institution Info</Typography>
                <Divider sx={{ marginBottom: '24px' }} />
                <SingleImageUpload title={'Logo'} />
                <SingleImageUpload title={'Banner'} />
                <Box mb={3}>
                  <TextField label="Name" name="name" control={control} />
                </Box>
                <Box mb={3}>
                  <Select
                    options={(
                      Object.keys(InstitutionType) as Array<
                        keyof typeof InstitutionType
                      >
                    ).map((key) => InstitutionType[key])}
                    placeholder="Institution Type"
                    control={control}
                    name="type"
                    label="Type"
                  />
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
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
