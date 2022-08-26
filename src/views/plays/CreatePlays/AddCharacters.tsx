import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { Box, Divider, Typography } from '@mui/material';
import {
  Autocomplete,
  Paper,
  Select,
  TextArea,
  TextField,
} from '../../../components';
import DialogHeader from '../../common/DialogHeader';
import { AddCharacterValidation } from './PlaysValidationSchema';
import { useStyles } from '../styles';
import { AddArtistsProps } from '../types';
import { Play } from '../../../types/Play';
import {
  useDeleteCharacter,
  usePostCharacter,
  usePutCharacter,
} from '../../../api/characters';
import {
  Character,
  CharacterEthnicity,
  CharacterRace,
  CharacterTier,
  Gender,
  VoiceType,
} from '../../../types/Character';
import { ProductionContributionType } from '../../../types/ProductionContribution';

export default function AddCharacters(props: AddArtistsProps) {
  const { onClose, id } = props;
  const queryClient = useQueryClient();
  const classes = useStyles();
  const { handleSubmit, control, reset } = AddCharacterValidation();
  const play: Play = queryClient.getQueryData(['selectedPlay']);

  const postMutation = usePostCharacter(play.id);
  const updateMutation = usePutCharacter(play.id, id);
  const deleteMutation = useDeleteCharacter(play.id, id);

  useEffect(() => {
    if (id) {
      reset(play.characters.find((val: any) => val.id === id));
    }
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const formData = { ...data, characterId: id };
      id
        ? await updateMutation.mutateAsync(formData)
        : await postMutation.mutateAsync(formData);
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteCharacter = async () => {
    try {
      await deleteMutation.mutateAsync();
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = async () => {
    await queryClient.invalidateQueries(['selectedPlay']);
    reset();
    onClose();
  };

  return (
    <Box>
      <DialogHeader
        title={id ? 'Edit Character' : 'Add Character'}
        handleSave={handleSubmit(onSubmit)}
        handleDelete={id && handleDeleteCharacter}
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
              <TextField name="name" label="Name" control={control} />
            </Box>
            <Box className={classes.mt}>
              <Select
                label="Tier"
                placeholder="Select Tier"
                control={control}
                name="tier"
                options={(
                  Object.keys(CharacterTier) as Array<
                    keyof typeof CharacterTier
                  >
                )
                  .map((key) => CharacterTier[key])
                  .sort()}
              />
            </Box>
            <Box mt={3}>
              <Select
                label="Gender"
                placeholder="Gender"
                control={control}
                name="gender"
                options={(Object.keys(Gender) as Array<keyof typeof Gender>)
                  .map((key) => Gender[key])
                  .sort()}
              />
            </Box>
            <Box className={classes.mt}>
              <TextField
                name="ageRangeTop"
                label="Age Range Top"
                control={control}
                type="number"
              />
            </Box>
            <Box className={classes.mt}>
              <TextField
                name="ageRangeBottom"
                label="Age Range Bottom"
                control={control}
                type="number"
              />
            </Box>
            <Box className={classes.mt}>
              <TextField
                name="vocalRangeTop"
                label="Vocal Range Top"
                control={control}
              />
            </Box>
            <Box className={classes.mt}>
              <TextField
                name="vocalRangeBottom"
                label="Vocal Range Bottom"
                control={control}
              />
            </Box>
            <Box className={classes.mt}>
              <Select
                label="Voice Type"
                placeholder="Voice Type"
                control={control}
                name="voiceType"
                options={(
                  Object.keys(VoiceType) as Array<keyof typeof VoiceType>
                )
                  .map((key) => VoiceType[key])
                  .sort()}
              />
            </Box>
            <Box className={classes.mt}>
              <TextField
                name="castingNotes"
                label="Casting Notes"
                control={control}
              />
            </Box>
            <Box className={classes.mt}>
              <TextArea
                maxRows={4}
                placeholder="Description"
                style={{ width: '100%', height: 133 }}
                label="Description"
                control={control}
                name="description"
              />
            </Box>
            <Box className={classes.mt}>
              <Select
                label="Race"
                placeholder="Race"
                control={control}
                name="race"
                options={(
                  Object.keys(CharacterRace) as Array<
                    keyof typeof CharacterRace
                  >
                )
                  .map((key) => CharacterRace[key])
                  .sort()}
              />
            </Box>
            <Box className={classes.mt}>
              <Box className={classes.mt}>
                <Select
                  label="Ethnicity"
                  placeholder="Ethnicity"
                  control={control}
                  name="ethnicity"
                  options={(
                    Object.keys(CharacterEthnicity) as Array<
                      keyof typeof CharacterEthnicity
                    >
                  )
                    .map((key) => CharacterEthnicity[key])
                    .sort()}
                />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
