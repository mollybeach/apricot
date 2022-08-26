import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../config/http-common';
import { Alert, Dialog, TextField } from '../../../components';
import { AddBrandsValidation } from './PlaysValidationSchema';
import { AddBrandsProps } from '../types';
import { Box } from '@mui/material';
import Loader from '../../../components/Loader';
import { alertAutoHideDuration } from '../../../utils/globalConfig';

export default function AddBrands(props: AddBrandsProps) {
  const { open, onCancel } = props;
  const [alertState, setAlertState] = useState(false);
  const queryClient = useQueryClient();
  const { handleSubmit, control, reset } = AddBrandsValidation();

  const postBrandsData = async (data: any) =>
    await (
      await axios.post('/brands', data)
    ).data;

  const postMutation = useMutation(
    (data: { brand: string }) => {
      return postBrandsData({ name: data.brand });
    },
    {
      onSuccess: async (data: any) => {
        await queryClient.invalidateQueries(['brands'], data);
        setAlertState(true);
        onCancel();
        // TODO: TEMP FIX: need to check why popup is not loading on second time without page reload
        window.location.reload();
      },
    },
  );

  const { isLoading, isError, isSuccess } = postMutation;
  const onSubmit = (data: any) => postMutation.mutate(data);

  if (isError) {
    return (
      <Alert
        message="Something went wrong. Try again later"
        open={alertState}
        autoHideDuration={alertAutoHideDuration}
        onClose={() => setAlertState(false)}
        severity="error"
      />
    );
  }

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (isSuccess) {
    return (
      <Alert
        message="Brand added successfully"
        open={alertState}
        autoHideDuration={alertAutoHideDuration}
        onClose={() => setAlertState(false)}
      />
    );
  }

  return (
    <Dialog
      isOpen={open}
      handleClose={onCancel}
      handlePrimaryBtn={handleSubmit(onSubmit)}
      handleSecondaryBtn={() => {
        onCancel();
        reset();
      }}
      title="Add Brands"
      primaryBtnLabel="Save"
      secondaryBtnLabel="Cancel"
      primaryVariantColor="success"
      secondaryVariantColor="info"
      primaryVariant="contained"
      secondaryVariant="outlined"
    >
      <TextField name="brand" control={control} />
    </Dialog>
  );
}
