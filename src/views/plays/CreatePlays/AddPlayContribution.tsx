import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { Autocomplete, Paper, Select, SideDrawer } from '../../../components';
import DialogHeader from '../../common/DialogHeader';
import { AddPlayContributionValidation } from './PlaysValidationSchema';
import AddIcon from '@mui/icons-material/Add';
import AddArtists from './AddArtists';
import { useStyles } from '../styles';
import { AddPlayArtistsProps, SideBarArtistsState } from '../types';
import { Play } from '../../../types/Play';
import { useGetAllArtists } from '../../../api/artists';
import { Artist } from '../../../types/Artist';
import {
  useDeletePlayContribution,
  usePostPlayContribution,
  usePutPlayContribution,
} from '../../../api/playContributions';
import {
  PlayContributionName,
  PlayContributionType,
} from '../../../types/PlayContribution';

export default function AddPlayContribution(props: AddPlayArtistsProps) {
  const { onClose, id } = props;
  const classes = useStyles();
  const queryClient = useQueryClient();
  const defaultSideBarState = {
    addPlayArtists: false,
  };
  const { handleSubmit, control, reset } = AddPlayContributionValidation();
  const { data: artists } = useGetAllArtists();
  const play: Play = queryClient.getQueryData(['selectedPlay']);

  const updateMutation = usePutPlayContribution(play.id, id);
  const postMutation = usePostPlayContribution(play.id);
  const deleteMutation = useDeletePlayContribution(play.id, id);

  useEffect(() => {
    if (id) {
      const contribution = play.contributions.find((val: any) => val.id === id);
      reset({
        ...contribution,
        artistId: contribution.artist.id,
        artist: {
          id: contribution.artist.id,
          label: `${contribution.artist.firstName} ${contribution.artist.lastName}`,
        },
      });
    }
  }, [id]);

  const [isSideDrawerOn, setSideDrawerOn] =
    useState<SideBarArtistsState>(defaultSideBarState);

  const onSubmit = async (data: any) => {
    try {
      const formData = { ...data, artistId: data.artist.id, playId: play.id };
      id
        ? await updateMutation.mutateAsync(formData)
        : await postMutation.mutateAsync(formData);
      await queryClient.invalidateQueries(['selectedPlay']);
      reset();
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteContribution = async () => {
    try {
      await deleteMutation.mutateAsync();
      await queryClient.invalidateQueries(['selectedPlay']);
      reset();
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <DialogHeader
        title={id ? 'Edit Play Contribution' : 'Add Play Contribution'}
        handleSave={handleSubmit(onSubmit)}
        handleDelete={id && handleDeleteContribution}
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

            <Box mt={3}>
              <Select
                label="Contribution Type"
                placeholder="Contribution Type"
                control={control}
                name="contributionType"
                options={(
                  Object.keys(PlayContributionType) as Array<
                    keyof typeof PlayContributionType
                  >
                )
                  .map((key) => PlayContributionType[key])
                  .sort()}
              />
            </Box>
            <Box mt={3}>
              <Select
                label="Contribution Name"
                control={control}
                placeholder="Contribution Name"
                name="contributionName"
                options={(
                  Object.keys(PlayContributionName) as Array<
                    keyof typeof PlayContributionName
                  >
                )
                  .map((key) => PlayContributionName[key])
                  .sort()}
              />
            </Box>

            <Box mt={3} style={{ display: 'flex' }}>
              <Box style={{ width: '100%' }}>
                <Autocomplete
                  placeholder="Select Artist"
                  name="artist"
                  control={control}
                  options={((artists as Artist[]) || []).map(
                    (artist: Artist) => {
                      return {
                        id: artist.id,
                        label: `${artist.firstName} ${artist.lastName}`,
                      };
                    },
                  )}
                />
              </Box>
              <Box>
                <IconButton
                  color="primary"
                  aria-label="addArtists"
                  component="div"
                  onClick={() =>
                    setSideDrawerOn({
                      ...defaultSideBarState,
                      addPlayArtists: !isSideDrawerOn.addPlayArtists,
                    })
                  }
                >
                  <AddIcon />
                </IconButton>
                <SideDrawer
                  isActive={isSideDrawerOn.addPlayArtists}
                  toggleDrawer={() =>
                    setSideDrawerOn({
                      ...defaultSideBarState,
                      addPlayArtists: !isSideDrawerOn.addPlayArtists,
                    })
                  }
                  styles={{
                    width: '650px',
                  }}
                >
                  <AddArtists
                    onClose={() =>
                      setSideDrawerOn({
                        ...defaultSideBarState,
                        addPlayArtists: !isSideDrawerOn.addPlayArtists,
                      })
                    }
                  />
                </SideDrawer>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
