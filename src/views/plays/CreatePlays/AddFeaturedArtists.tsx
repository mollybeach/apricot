import React, { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from '../../../config/http-common';
import { Box, Divider, Typography } from '@mui/material';
import { Paper, TextField } from '../../../components';
import DialogHeader from '../../common/DialogHeader';
import { AddFeaturedArtistsValidation } from './PlaysValidationSchema';
import { useStyles } from '../styles';
import { AddFeaturedArtistsProps } from '../types';

export default function AddFeaturedArtists(props: AddFeaturedArtistsProps) {
  const { onClose, id } = props;
  const queryClient = useQueryClient();
  const classes = useStyles();
  const { handleSubmit, control, reset } = AddFeaturedArtistsValidation();

  useEffect(() => {
    if (id) {
      const data: any = queryClient.getQueryData(['featuredArtists']);
      const results = data.find((val: any) => val.id === id);
      reset(results);
    }
  }, []);

  const postFeaturedArtistsData = async (data: any) =>
    await (
      await axios.post('', data)
    ).data;

  const updateMutation = useMutation(
    (updatedFeaturedArtists) =>
      axios.put(`/replacethis/${id}`, updatedFeaturedArtists),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['featuredArtists', id]);
      },
    },
  );

  const postMutation = useMutation((data) => postFeaturedArtistsData(data), {
    onSuccess: (data: any) => {
      queryClient.setQueryData(['featuredArtists'], data);
    },
  });
  const { isLoading, isError, isSuccess } = postMutation;

  if (isSuccess) {
    reset();
    onClose();
  }

  if (isError) {
    return <Box>An error occurred..</Box>;
  }

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  const onSubmit = async (data: any) => {
    if (!id) {
      postMutation.mutate(data);
    }
    updateMutation.mutate(data);
  };

  return (
    <Box>
      <DialogHeader
        title={id ? 'Edit Featured Artists' : 'Add Featured Artists'}
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
              <TextField name="artists" label="Artists" control={control} />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
