import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Box, Divider, ListItem, Stack, Typography } from '@mui/material';
import {
  Button,
  Paper,
  Select,
  SideDrawer,
  TextField,
} from '../../../components';
import DialogHeader from '../../common/DialogHeader';
import { AddOrchestrationsValidation } from './PlaysValidationSchema';
import { useStyles } from '../styles';
import { AddOrchestrationsProps, SideBarState } from '../types';
import { Play } from '../../../types/Play';
import {
  useDeleteOrchestration,
  useGetOrchestration,
  usePostOrchestration,
  usePutOrchestration,
} from '../../../api/orchestrations';
import {
  AvantGardeGenre,
  BluesGenre,
  ClassicalGenre,
  CountryGenre,
  EasyListeningGenre,
  ElectronicGenre,
  FolkGenre,
  HipHopRapGenre,
  JazzGenre,
  KidsFamilyGenre,
  LatinGenre,
  MetalPunk,
  NewAgeGenre,
  OrchestrationMusicGenre,
  OrchestrationMusicMoodStyle,
  OrchestrationMusicStyle,
  OrchestrationTypes,
  PopGenre,
  ReggaeGenre,
  RockGenre,
  SpiritualGenre,
  SpokenWordGenre,
  WorldGenre,
} from '../../../types/Orchestration';
import Details from '../../common/Details';
import AddOrchestrationBooks from './AddOrchestrationBooks';
import { OrchestrationBook } from '../../../types/OrchestrationBook';

export default function AddOrchestration(props: AddOrchestrationsProps) {
  const { onClose, id } = props;
  const classes = useStyles();
  const queryClient = useQueryClient();
  const defaultSideBarState = {
    id: '',
    addPlayArtists: false,
    addCharacters: false,
    addSongs: false,
    addFeaturedArtists: false,
    addOrchestrations: false,
    addOrchestrationBooks: false,
  };

  const play: Play = queryClient.getQueryData(['selectedPlay']);
  const { handleSubmit, control, reset, watch } = AddOrchestrationsValidation();
  const { data: orchestration, isSuccess: isOrchestrationLoaded } =
    useGetOrchestration(play.id, id);

  useEffect(() => {
    if (id) {
      reset({
        ...orchestration,
      });
    }
  }, [id, orchestration]);

  const updateMutation = usePutOrchestration(play.id, id);
  const postMutation = usePostOrchestration(play.id);
  const { isSuccess: postOrchestrationMetaSuccess } = postMutation;
  const deleteMutation = useDeleteOrchestration(play.id, id);

  const watchMusicGenrePrimaryCategory: OrchestrationMusicGenre = watch(
    'musicGenrePrimaryCategory',
  );
  const watchMusicGenreSecondaryCategory: OrchestrationMusicGenre = watch(
    'musicGenreSecondaryCategory',
  );
  const [
    musicGenrePrimarySubcategoryOptions,
    setMusicGenrePrimarySubcategoryOptions,
  ] = useState([]);
  const [
    musicGenreSecondarySubcategoryOptions,
    setMusicGenreSecondarySubcategoryOptions,
  ] = useState([]);

  useEffect(() => {
    let selectedEnum: any = null;
    switch (watchMusicGenrePrimaryCategory) {
      case OrchestrationMusicGenre.avantGarde:
        selectedEnum = AvantGardeGenre;
        break;
      case OrchestrationMusicGenre.blues:
        selectedEnum = BluesGenre;
        break;
      case OrchestrationMusicGenre.classical:
        selectedEnum = ClassicalGenre;
        break;
      case OrchestrationMusicGenre.country:
        selectedEnum = CountryGenre;
        break;
      case OrchestrationMusicGenre.easyListening:
        selectedEnum = EasyListeningGenre;
        break;
      case OrchestrationMusicGenre.electronic:
        selectedEnum = ElectronicGenre;
        break;
      case OrchestrationMusicGenre.folk:
        selectedEnum = FolkGenre;
        break;
      case OrchestrationMusicGenre.hipHopRap:
        selectedEnum = HipHopRapGenre;
        break;
      case OrchestrationMusicGenre.jazz:
        selectedEnum = JazzGenre;
        break;
      case OrchestrationMusicGenre.kidsFamily:
        selectedEnum = KidsFamilyGenre;
        break;
      case OrchestrationMusicGenre.latin:
        selectedEnum = LatinGenre;
        break;
      case OrchestrationMusicGenre.metalPunk:
        selectedEnum = MetalPunk;
        break;
      case OrchestrationMusicGenre.newAge:
        selectedEnum = NewAgeGenre;
        break;
      case OrchestrationMusicGenre.pop:
        selectedEnum = PopGenre;
        break;
      case OrchestrationMusicGenre.reggae:
        selectedEnum = ReggaeGenre;
        break;
      case OrchestrationMusicGenre.rock:
        selectedEnum = RockGenre;
        break;
      case OrchestrationMusicGenre.spiritual:
        selectedEnum = SpiritualGenre;
        break;
      case OrchestrationMusicGenre.spokenWord:
        selectedEnum = SpokenWordGenre;
        break;
      case OrchestrationMusicGenre.world:
        selectedEnum = WorldGenre;
        break;
    }
    if (selectedEnum) {
      setMusicGenrePrimarySubcategoryOptions(
        (Object.keys(selectedEnum) as Array<keyof typeof selectedEnum>)
          .map((key) => selectedEnum[key])
          .sort(),
      );
    } else {
      setMusicGenrePrimarySubcategoryOptions([]);
    }
  }, [watchMusicGenrePrimaryCategory]);

  useEffect(() => {
    let selectedEnum: any = null;
    switch (watchMusicGenreSecondaryCategory) {
      case OrchestrationMusicGenre.avantGarde:
        selectedEnum = AvantGardeGenre;
        break;
      case OrchestrationMusicGenre.blues:
        selectedEnum = BluesGenre;
        break;
      case OrchestrationMusicGenre.classical:
        selectedEnum = ClassicalGenre;
        break;
      case OrchestrationMusicGenre.country:
        selectedEnum = CountryGenre;
        break;
      case OrchestrationMusicGenre.easyListening:
        selectedEnum = EasyListeningGenre;
        break;
      case OrchestrationMusicGenre.electronic:
        selectedEnum = ElectronicGenre;
        break;
      case OrchestrationMusicGenre.folk:
        selectedEnum = FolkGenre;
        break;
      case OrchestrationMusicGenre.hipHopRap:
        selectedEnum = HipHopRapGenre;
        break;
      case OrchestrationMusicGenre.jazz:
        selectedEnum = JazzGenre;
        break;
      case OrchestrationMusicGenre.kidsFamily:
        selectedEnum = KidsFamilyGenre;
        break;
      case OrchestrationMusicGenre.latin:
        selectedEnum = LatinGenre;
        break;
      case OrchestrationMusicGenre.metalPunk:
        selectedEnum = MetalPunk;
        break;
      case OrchestrationMusicGenre.newAge:
        selectedEnum = NewAgeGenre;
        break;
      case OrchestrationMusicGenre.pop:
        selectedEnum = PopGenre;
        break;
      case OrchestrationMusicGenre.reggae:
        selectedEnum = ReggaeGenre;
        break;
      case OrchestrationMusicGenre.rock:
        selectedEnum = RockGenre;
        break;
      case OrchestrationMusicGenre.spiritual:
        selectedEnum = SpiritualGenre;
        break;
      case OrchestrationMusicGenre.spokenWord:
        selectedEnum = SpokenWordGenre;
        break;
      case OrchestrationMusicGenre.world:
        selectedEnum = WorldGenre;
        break;
    }
    if (selectedEnum) {
      setMusicGenreSecondarySubcategoryOptions(
        (Object.keys(selectedEnum) as Array<keyof typeof selectedEnum>)
          .map((key) => selectedEnum[key])
          .sort(),
      );
    } else {
      setMusicGenreSecondarySubcategoryOptions([]);
    }
  }, [watchMusicGenreSecondaryCategory]);

  const [isSideDrawerOn, setSideDrawerOn] =
    useState<SideBarState>(defaultSideBarState);

  const onSubmit = async (data: any) => {
    try {
      const formData = { ...data, artistId: id };
      id
        ? await updateMutation.mutateAsync(formData)
        : await postMutation.mutateAsync(formData);
      await queryClient.invalidateQueries(['selectedPlay']);
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteOrchestration = async () => {
    try {
      await deleteMutation.mutateAsync();
      await queryClient.invalidateQueries(['selectedPlay']);
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    queryClient.removeQueries(['selectedOrchestration']);
    reset();
    onClose();
  };

  return (
    <Box>
      <DialogHeader
        title={id ? 'Edit Orchestration' : 'Add Orchestration'}
        handleSave={handleSubmit(onSubmit)}
        handleDelete={id && handleDeleteOrchestration}
        cancel={() => handleClose()}
      />
      <Box className={classes.content}>
        <Paper>
          <Box className={classes.subContent}>
            <Typography variant="h2">Details</Typography>
            <Box className={classes.mt}>
              <TextField
                name="orchestrationName"
                label="Orchestration Name"
                control={control}
              />
            </Box>
            <Divider style={{ marginBottom: '24px' }} />
            <Box className={classes.mt}>
              <TextField
                name="orchestrationDescription"
                label="Orchestration Description"
                control={control}
              />
            </Box>

            <Box mt={3}>
              <Select
                label="Orchestration Type"
                placeholder="Orchestration Type"
                control={control}
                name="orchestrationType"
                options={(
                  Object.keys(OrchestrationTypes) as Array<
                    keyof typeof OrchestrationTypes
                  >
                )
                  .map((key) => OrchestrationTypes[key])
                  .sort()}
              />
            </Box>
            <Box mt={3}>
              <Select
                label="Music Style"
                placeholder="Music Style"
                control={control}
                name="musicStyle"
                options={(
                  Object.keys(OrchestrationMusicStyle) as Array<
                    keyof typeof OrchestrationMusicStyle
                  >
                )
                  .map((key) => OrchestrationMusicStyle[key])
                  .sort()}
              />
            </Box>
            <Box mt={3}>
              <Select
                label="Music Mood Style"
                placeholder="Music Mood Style"
                control={control}
                name="musicMoodStyle"
                options={(
                  Object.keys(OrchestrationMusicMoodStyle) as Array<
                    keyof typeof OrchestrationMusicMoodStyle
                  >
                )
                  .map((key) => OrchestrationMusicMoodStyle[key])
                  .sort()}
              />
            </Box>
            <Box mt={3}>
              <Select
                label="Music Genre Primary Category"
                placeholder="Music Genre Primary Category"
                control={control}
                name="musicGenrePrimaryCategory"
                options={(
                  Object.keys(OrchestrationMusicGenre) as Array<
                    keyof typeof OrchestrationMusicGenre
                  >
                )
                  .map((key) => OrchestrationMusicGenre[key])
                  .sort()}
              />
            </Box>
            <Box mt={3}>
              <Select
                label="Music Genre Primary Subcategory"
                placeholder="Music Genre Primary Subcategory"
                control={control}
                name="musicGenrePrimarySubcategory"
                options={musicGenrePrimarySubcategoryOptions}
              />
            </Box>
            <Box mt={3}>
              <Select
                label="Music Genre Secondary Category"
                placeholder="Music Genre Secondary Category"
                control={control}
                name="musicGenreSecondaryCategory"
                options={(
                  Object.keys(OrchestrationMusicGenre) as Array<
                    keyof typeof OrchestrationMusicGenre
                  >
                )
                  .map((key) => OrchestrationMusicGenre[key])
                  .sort()}
              />
            </Box>
            <Box mt={3}>
              <Select
                label="Music Genre Secondary Subcategory"
                placeholder="Music Genre Secondary Subcategory"
                control={control}
                name="musicGenreSecondarySubcategory"
                options={musicGenreSecondarySubcategoryOptions}
              />
            </Box>
          </Box>
          {((id && isOrchestrationLoaded) || postOrchestrationMetaSuccess) && (
            <Box mt={'16px'} p={'32px'}>
              <Details
                title="Orchestration Books"
                onAddButton={() =>
                  setSideDrawerOn({
                    ...defaultSideBarState,
                    addOrchestrationBooks:
                      !isSideDrawerOn.addOrchestrationBooks,
                  })
                }
              >
                {id &&
                  orchestration?.orchestrationBooks?.map(
                    (orchestrationBook: OrchestrationBook) => (
                      <div key={orchestrationBook.id}>
                        <Stack
                          display="flex"
                          direction="row"
                          style={{ marginBottom: '24px' }}
                        >
                          <ListItem>{orchestrationBook.bookName}</ListItem>
                          <Button
                            label="Edit"
                            variant={'outlined'}
                            color={'secondary'}
                            onClick={() =>
                              setSideDrawerOn({
                                ...defaultSideBarState,
                                addOrchestrationBooks:
                                  !isSideDrawerOn.addOrchestrationBooks,
                                id: `${orchestrationBook.id}`,
                              })
                            }
                          />
                        </Stack>
                      </div>
                    ),
                  )}
              </Details>
              <SideDrawer
                isActive={isSideDrawerOn.addOrchestrationBooks}
                toggleDrawer={() =>
                  setSideDrawerOn({
                    ...defaultSideBarState,
                    addOrchestrationBooks:
                      !isSideDrawerOn.addOrchestrationBooks,
                  })
                }
                styles={{
                  width: '650px',
                }}
              >
                <AddOrchestrationBooks
                  onClose={() =>
                    setSideDrawerOn({
                      ...defaultSideBarState,
                      addOrchestrationBooks:
                        !isSideDrawerOn.addOrchestrationBooks,
                    })
                  }
                  id={isSideDrawerOn.id}
                />
              </SideDrawer>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
