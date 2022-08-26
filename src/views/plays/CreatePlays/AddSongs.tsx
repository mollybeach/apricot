import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Box, Divider, ListItem, Stack, Typography } from '@mui/material';
import {
  Autocomplete,
  Button,
  Paper,
  TextArea,
  TextField,
} from '../../../components';
import DialogHeader from '../../common/DialogHeader';
import { AddSongsValidation } from './PlaysValidationSchema';
import { useStyles } from '../styles';
import { AddSongsProps } from '../types';
import { Play } from '../../../types/Play';
import { Character } from '../../../types/Character';
import {
  useDeleteSong,
  useDeleteSongCharacter,
  useGetSong,
  usePatchSongCharacter,
  usePostSong,
  usePutSong,
} from '../../../api/songs';

export default function AddSongs(props: AddSongsProps) {
  const { onClose, id: songId } = props;
  const queryClient = useQueryClient();
  const classes = useStyles();
  const play: Play = queryClient.getQueryData(['selectedPlay']);
  const playCharacters: Character[] = play.characters;
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);

  const { data: song } = useGetSong(play.id, songId);

  useEffect(() => {
    if (song) {
      reset(song);
      setSelectedCharacters(song.characters || []);
    }
  }, [song]);

  const { handleSubmit, control, reset, watch, setValue } =
    AddSongsValidation();

  const postMutation = usePostSong(play.id);
  const updateMutation = usePutSong(play.id, songId);
  const deleteMutation = useDeleteSong(play.id, songId);

  const { mutate: addCharacterMutation } = usePatchSongCharacter(
    play.id,
    songId,
  );
  const { mutate: deleteCharacterMutation } = useDeleteSongCharacter(
    play.id,
    songId,
  );

  // @ts-ignore
  const watchCharacters = watch('selectedCharacter');

  useEffect(() => {
    if (watchCharacters) {
      const thisCharacter: Character = playCharacters.find(
        (character: Character) => character.id === watchCharacters.id,
      );
      if (
        thisCharacter &&
        selectedCharacters.findIndex(
          (element) => element.id === thisCharacter.id,
        ) === -1
      ) {
        if (songId) {
          addCharacterMutation(thisCharacter.id);
        }
        setSelectedCharacters([...selectedCharacters, thisCharacter]);
      }
      setValue('selectedCharacter', null);
    }
  }, [watchCharacters]);

  const onSubmit = async (data: any) => {
    try {
      const formData = {
        ...data,
        characterIds: selectedCharacters.map(
          (character: Character) => character.id,
        ),
      };
      console.log(formData);
      songId
        ? await updateMutation.mutateAsync(formData)
        : await postMutation.mutateAsync(formData);
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteSong = async () => {
    try {
      await deleteMutation.mutateAsync();
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteCharacter = async (characterId: string) => {
    try {
      if (songId) {
        await deleteCharacterMutation(characterId);
      }
      setSelectedCharacters([
        ...selectedCharacters.filter(
          (character: Character) => character.id !== characterId,
        ),
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    queryClient.invalidateQueries(['selectedPlay']).then(() => {
      reset();
      onClose();
    });
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries(['selectedSong']);
    };
  }, []);

  return (
    <Box>
      <DialogHeader
        title={songId ? 'Edit Song' : 'Add Song'}
        handleSave={handleSubmit(onSubmit)}
        handleDelete={songId && handleDeleteSong}
        cancel={() => handleClose()}
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
              <TextField name="website" label="Website" control={control} />
            </Box>
            <Box className={classes.mt}>
              <TextField
                label="Song Duration (minutes)"
                placeholder="Song Duration"
                control={control}
                name="songDuration"
              />
            </Box>
            <Box className={classes.mt}>
              <TextField
                name="scoreNumber"
                label="Score Number"
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
            <Box mt={3}>
              <Autocomplete
                label="Character"
                placeholder="Character"
                control={control}
                name="selectedCharacter"
                options={(playCharacters || []).map((character: Character) => ({
                  id: character.id,
                  label: character.name,
                }))}
              />
              {selectedCharacters?.map((character: Character) => (
                <Stack
                  display="flex"
                  direction="row"
                  sx={{ my: '24px' }}
                  key={character.id}
                >
                  <ListItem>{character.name}</ListItem>
                  <Button
                    label="Delete"
                    variant={'outlined'}
                    color={'secondary'}
                    onClick={() => handleDeleteCharacter(character.id)}
                  />
                </Stack>
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
