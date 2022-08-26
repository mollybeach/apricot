import React, { useEffect } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { Paper, TextField } from '../../../components';
import DialogHeader from '../../common/DialogHeader';
import { useStyles } from '../styles';
import { AddInstitutionProps } from '../types';
import { CreateInstitutionValidation } from '../../institutions/CreateInstitutions/InstitutionValidationSchema';
import Select from '../../../components/Select';
import { InstitutionType } from '../../../types/Institution';
import {
  useDeleteInstitution,
  useGetInstitution,
  usePostInstitution,
} from '../../../api/institutions';
import { useQueryClient } from 'react-query';

export default function AddInstitution(props: AddInstitutionProps) {
  const { onClose, id } = props;
  const queryClient = useQueryClient();
  const classes = useStyles();
  const { handleSubmit, control, reset } = CreateInstitutionValidation();

  const { data: institution, isSuccess: isInstitutionLoaded } =
    useGetInstitution(id);

  const postMutation = usePostInstitution();

  useEffect(() => {
    if (id) {
      reset(institution);
    }
  }, [isInstitutionLoaded]);

  const onSubmit = async (data: any) => {
    try {
      const formData = { ...data };
      await postMutation.mutateAsync(formData);
      await handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = async () => {
    await queryClient.invalidateQueries(['allInstitutions']);
    reset();
    onClose();
  };

  return (
    <Box>
      <DialogHeader
        title={id ? 'Edit Institution' : 'Add Institution'}
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
              <TextField label="Zip Code" name="zipcode" control={control} />
            </Box>
            <Box mb={3}>
              <TextField label="Website" name="website" control={control} />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
