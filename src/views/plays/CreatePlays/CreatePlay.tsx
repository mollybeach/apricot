import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import {
  Alert,
  Autocomplete,
  Button,
  Paper,
  Select,
  TextArea,
  TextField,
} from '../../../components';
import DialogHeader from '../../common/DialogHeader';
import AddIcon from '@mui/icons-material/Add';
import { CreatePlaysValidation } from './PlaysValidationSchema';
import AddBrands from './AddBrands';
import UploadFileInput from '../../../components/Upload/UploadFileInput';
import Details from '../../common/Details';
import { useStyles } from '../styles';
import PlaySideDrawers from './PlaySideDrawers';
import { SideBarState } from '../types';
import {
  Genre,
  LicenseHouse,
  PlayTheme,
  PlayType,
  PlayVocalRequirement,
} from '../../../types/Play';
import { Brand } from '../../../types/Brand';
import { useNavigate, useParams } from 'react-router-dom';
import { Character } from '../../../types/Character';
import { Orchestration } from '../../../types/Orchestration';
import { Song } from '../../../types/Song';
import { useGetAllBrands } from '../../../api/brands';
import {
  useGetPlay,
  usePostPlay,
  usePutPlay,
  useDeletePlay,
} from '../../../api/plays';
import { PlayContribution } from '../../../types/PlayContribution';
import Loader from '../../../components/Loader';
import {
  alertAutoHideDuration,
  GlobalMessages,
} from '../../../utils/globalConfig';
import { AlertState } from '../../../types/Global';
import SingleImageUpload from '../../../components/Upload/SingleImageUpload';
import MultiFileUpload from '../../../components/Upload/MultiFileUpload';

export default function CreatePlay() {
  const classes = useStyles();
  const { id: playId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const defaultSideBarState = {
    addPlayArtists: false,
    addCharacters: false,
    addSongs: false,
    addFeaturedArtists: false,
    addOrchestrations: false,
    addOrchestrationBooks: false,
  };

  const [state, setState] = useState({
    addBrandDialogState: false,
  });
  const [isSideDrawerOn, setSideDrawerOn] =
    useState<SideBarState>(defaultSideBarState);

  const { data: brands } = useGetAllBrands();
  const {
    data: play,
    isSuccess: isPlayLoaded,
    isLoading: isPlayLoading,
  } = useGetPlay(playId);
  const updateMutation = usePutPlay(playId);
  const { isSuccess: updatePlayMetaSuccess, isError: updatePlayMetaError } =
    updateMutation;
  const postMutation = usePostPlay();
  const { isSuccess: postPlayMetaSuccess, isError: postPlayMetaError } =
    postMutation;
  const deleteMutation = useDeletePlay(playId);
  const [alertState, setAlertState] = useState<AlertState>({
    active: false,
    message: '',
  });

  useEffect(() => {
    if (isPlayLoaded && brands && playId !== undefined) {
      reset({
        ...play,
        selectedBrand: play?.brand
          ? { id: play.brand.id, label: play.brand.name }
          : null,
      });
    }
  }, [isPlayLoaded, brands]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries(['selectedPlay']);
    };
  }, []);

  const { handleSubmit, control, reset } = CreatePlaysValidation();

  const onSubmit = async (data: any) => {
    const formData = {
      ...data,
      brandId: data.selectedBrand.id,
    };
    try {
      playId
        ? await updateMutation.mutateAsync(formData)
        : await postMutation.mutateAsync(formData);

      setAlertState({
        active: true,
        message: playId
          ? GlobalMessages.playUpdationSuccessMsg
          : GlobalMessages.playCreationSuccessMsg,
      });
      handleClose();
    } catch (e) {
      setAlertState({
        active: true,
        message: GlobalMessages.errorMsg,
      });
    }
  };
  const handleDeletePlay = async () => {
    try {
      await deleteMutation.mutateAsync().then(() => {
        setAlertState({
          active: true,
          message: GlobalMessages.deleteVenueSuccessMsg,
        });
        handleClose();
      });
    } catch (e) {
      setAlertState({
        active: true,
        message: GlobalMessages.errorMsg,
      });
    }
  };

  const handleClose = () => {
    reset();
    navigate('/plays');
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries(['selectedPlay']);
    };
  }, []);

  return (
    <>
      {isPlayLoading && <Loader isLoading={isPlayLoading} />}
      {(postPlayMetaSuccess || updatePlayMetaSuccess) && (
        <Alert
          message={alertState.message}
          open={alertState.active}
          autoHideDuration={alertAutoHideDuration}
          onClose={() => setAlertState({ active: false })}
        />
      )}
      {(postPlayMetaError || updatePlayMetaError) && (
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
          title={playId ? 'Edit Play' : 'Create Play'}
          handleSave={handleSubmit(onSubmit)}
          cancel={() => {
            reset();
            navigate('/plays');
          }}
          handleDelete={playId && handleDeletePlay}
        />
        <Grid
          container
          sx={{ justifyContent: 'center' }}
          className={classes.container}
        >
          <Grid item xs={12} md={8} lg={8}>
            <Box>
              <Paper>
                <Box className={classes.accountInfo}>
                  <Typography variant="h2">Play Info</Typography>
                  <Divider sx={{ marginBottom: '24px' }} />
                  <SingleImageUpload title={'Poster'} />
                  <Divider sx={{ margin: '24px' }} />
                  <SingleImageUpload title={'Banner'} />
                  <Divider sx={{ margin: '24px' }} />
                  <MultiFileUpload title={'Files'} />
                  <Divider sx={{ margin: '24px' }} />
                  <Box sx={{ display: 'flex', mt: '24px' }}>
                    <Box sx={{ width: '100%' }}>
                      <Autocomplete
                        label={'Brand'}
                        placeholder="Selected Brand"
                        name="selectedBrand"
                        control={control}
                        options={((brands as Brand[]) || []).map(
                          (brand: Brand) => {
                            return { id: brand.id, label: brand.name };
                          },
                        )}
                      />
                    </Box>
                    <Box>
                      <IconButton
                        color="primary"
                        aria-label="addBrand"
                        component="div"
                        onClick={() =>
                          setState({
                            ...state,
                            addBrandDialogState: !state.addBrandDialogState,
                          })
                        }
                      >
                        <AddIcon />
                      </IconButton>
                      <AddBrands
                        open={state.addBrandDialogState}
                        onCancel={() =>
                          setState({
                            ...state,
                            addBrandDialogState: !state.addBrandDialogState,
                          })
                        }
                      />
                    </Box>
                  </Box>
                  <Box mt={3}>
                    <Select
                      options={(
                        Object.keys(PlayType) as Array<keyof typeof PlayType>
                      ).map((key) => PlayType[key])}
                      placeholder="Play Type"
                      control={control}
                      name="playType"
                      label="Play Type"
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      name="licenseName"
                      label="License Name"
                      control={control}
                    />
                  </Box>
                  <Box mt={3}>
                    <Select
                      options={(
                        Object.keys(LicenseHouse) as Array<
                          keyof typeof LicenseHouse
                        >
                      )
                        .map((key) => LicenseHouse[key])
                        .sort()}
                      placeholder="MTI, Concord, TRW..."
                      control={control}
                      name="licenseHouse"
                      label="License House"
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      name="licenseWebsite"
                      label="License Website"
                      control={control}
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      label="Original Production Year"
                      name="originalProductionYear"
                      control={control}
                      type={'number'}
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      maxRows={4}
                      multiline={true}
                      placeholder="Short Description"
                      onChange={(e) => console.log(e.target.value)}
                      label="Short Description"
                      control={control}
                      name="shortDescription"
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      minRows={4}
                      multiline={true}
                      placeholder="Long Description"
                      onChange={(e) => console.log(e.target.value)}
                      style={{ width: '100%', height: 133 }}
                      label="Long Description"
                      control={control}
                      name="longDescription"
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      name="synopsis"
                      label="Synopsis"
                      control={control}
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      name="history"
                      label="History"
                      control={control}
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      name="duration"
                      label="Duration"
                      control={control}
                    />
                  </Box>
                  <Box mt={3}>
                    <Select
                      options={(Object.keys(Genre) as Array<keyof typeof Genre>)
                        .map((key) => Genre[key])
                        .sort()}
                      placeholder="Genres"
                      control={control}
                      name="genres"
                      label="Genres"
                      multiple
                    />
                  </Box>
                  <Box mt={3}>
                    <Select
                      options={(
                        Object.keys(PlayTheme) as Array<keyof typeof PlayTheme>
                      )
                        .map((key) => PlayTheme[key])
                        .sort()}
                      placeholder="Themes"
                      control={control}
                      name="themes"
                      label="Themes"
                      multiple
                    />
                  </Box>
                  <Box mt={3}>
                    <Select
                      options={(
                        Object.keys(PlayVocalRequirement) as Array<
                          keyof typeof PlayVocalRequirement
                        >
                      ).map((key) => PlayVocalRequirement[key])}
                      placeholder="Vocal Requirements"
                      control={control}
                      name="vocalRequirements"
                      label="Vocal Requirements"
                      multiple
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      name="ensembleSize"
                      label="Ensemble Size"
                      control={control}
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      name="numberOfActs"
                      label="Number of Acts"
                      control={control}
                      type={'number'}
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      name="audienceRating"
                      label="Audience Rating"
                      control={control}
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      name="playSetting"
                      label="Play Setting"
                      control={control}
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      name="danceRequirements"
                      label="Dance Requirements"
                      control={control}
                    />
                  </Box>
                </Box>
                {(isPlayLoaded || postPlayMetaSuccess) && (
                  <>
                    <Box mt={'16px'} p={'32px'}>
                      <Details
                        title="Play Contributions"
                        onAddButton={() =>
                          setSideDrawerOn({
                            ...defaultSideBarState,
                            addPlayArtists: !isSideDrawerOn.addPlayArtists,
                          })
                        }
                      >
                        {play.contributions?.map(
                          (contribution: PlayContribution) => (
                            <>
                              <Stack
                                display="flex"
                                direction="row"
                                style={{ marginBottom: '24px' }}
                              >
                                <ListItem>
                                  {contribution.artist.firstName}{' '}
                                  {contribution.artist.lastName} -{' '}
                                  {contribution.contributionType} -{' '}
                                  {contribution.contributionName}
                                </ListItem>
                                <Button
                                  label="Edit"
                                  variant={'outlined'}
                                  color={'secondary'}
                                  onClick={() =>
                                    setSideDrawerOn({
                                      ...defaultSideBarState,
                                      addPlayArtists:
                                        !isSideDrawerOn.addPlayArtists,
                                      id: `${contribution.id}`,
                                    })
                                  }
                                />
                              </Stack>
                            </>
                          ),
                        )}
                      </Details>
                    </Box>
                    <Box mt={'16px'} p={'32px'}>
                      <Details
                        title="Add Orchestrations"
                        onAddButton={() =>
                          setSideDrawerOn({
                            ...defaultSideBarState,
                            addOrchestrations:
                              !isSideDrawerOn.addOrchestrations,
                          })
                        }
                      >
                        {!isPlayLoaded ? (
                          <div>Loading Orchestrations...</div>
                        ) : (
                          play.orchestrations?.map(
                            (orchestration: Orchestration) => (
                              <Stack
                                display="flex"
                                direction="row"
                                style={{ marginBottom: '24px' }}
                                key={orchestration.id}
                              >
                                <ListItem>
                                  {orchestration.orchestrationName}
                                </ListItem>
                                <Button
                                  label="Edit"
                                  variant={'outlined'}
                                  color={'secondary'}
                                  onClick={() =>
                                    setSideDrawerOn({
                                      ...defaultSideBarState,
                                      addOrchestrations:
                                        !isSideDrawerOn.addOrchestrations,
                                      id: `${orchestration.id}`,
                                    })
                                  }
                                />
                              </Stack>
                            ),
                          )
                        )}
                      </Details>
                    </Box>
                    <Box mt={'16px'} p={'32px'}>
                      <Details
                        title="Add Characters"
                        onAddButton={() =>
                          setSideDrawerOn({
                            ...defaultSideBarState,
                            addCharacters: !isSideDrawerOn.addCharacters,
                          })
                        }
                      >
                        {!isPlayLoaded ? (
                          <div>Loading Characters...</div>
                        ) : (
                          play.characters?.map((character: Character) => (
                            <Stack
                              display="flex"
                              direction="row"
                              style={{ marginBottom: '24px' }}
                              key={character.id}
                            >
                              <ListItem>{character.name}</ListItem>
                              <Button
                                label="Edit"
                                variant={'outlined'}
                                color={'secondary'}
                                onClick={() =>
                                  setSideDrawerOn({
                                    ...defaultSideBarState,
                                    addCharacters:
                                      !isSideDrawerOn.addCharacters,
                                    id: `${character.id}`,
                                  })
                                }
                              />
                            </Stack>
                          ))
                        )}
                      </Details>
                    </Box>
                    <Box mt={'16px'} p={'32px'}>
                      <Details
                        title="Add Songs"
                        onAddButton={() =>
                          setSideDrawerOn({
                            ...defaultSideBarState,
                            addSongs: !isSideDrawerOn.addSongs,
                          })
                        }
                      >
                        {!isPlayLoaded ? (
                          <div>Loading Songs...</div>
                        ) : (
                          play.songs?.map((song: Song) => (
                            <Stack
                              display="flex"
                              direction="row"
                              style={{ marginBottom: '24px' }}
                              key={song.id}
                            >
                              <ListItem>{song.name}</ListItem>
                              <Button
                                label="Edit"
                                variant={'outlined'}
                                color={'secondary'}
                                onClick={() =>
                                  setSideDrawerOn({
                                    ...defaultSideBarState,
                                    addSongs: !isSideDrawerOn.addSongs,
                                    id: `${song.id}`,
                                  })
                                }
                              />
                            </Stack>
                          ))
                        )}
                      </Details>
                    </Box>
                    {/*<Box mt={'16px'} p={'32px'}>*/}
                    {/*  <Details*/}
                    {/*    title="Featured Songs"*/}
                    {/*    onAddButton={() =>*/}
                    {/*      setSideDrawerOn({*/}
                    {/*        ...defaultSideBarState,*/}
                    {/*        addFeaturedArtists:*/}
                    {/*          !isSideDrawerOn.addFeaturedArtists,*/}
                    {/*      })*/}
                    {/*    }*/}
                    {/*  >*/}
                    {/*    /!* TOD0: will be replaced with real data *!/*/}
                    {/*    {[0, 1].map((e: any, index: number) => (*/}
                    {/*      <>*/}
                    {/*        <Stack*/}
                    {/*          display="flex"*/}
                    {/*          direction="row"*/}
                    {/*          style={{ marginBottom: '24px' }}*/}
                    {/*        >*/}
                    {/*          <ListItem>Featured Songs</ListItem>*/}
                    {/*          <Button*/}
                    {/*            label="Delete"*/}
                    {/*            variant="contained"*/}
                    {/*            color="error"*/}
                    {/*            onClick={() =>*/}
                    {/*              setSideDrawerOn({*/}
                    {/*                ...defaultSideBarState,*/}
                    {/*                addPlayArtists:*/}
                    {/*                  !isSideDrawerOn.addPlayArtists,*/}
                    {/*                id: `${index}`,*/}
                    {/*              })*/}
                    {/*            }*/}
                    {/*          />*/}
                    {/*        </Stack>*/}
                    {/*      </>*/}
                    {/*    ))}*/}
                    {/*  </Details>*/}
                    {/*</Box>*/}
                  </>
                )}
                <PlaySideDrawers
                  sideDrawerState={isSideDrawerOn}
                  id={isSideDrawerOn.id}
                  defaultSideBarState={defaultSideBarState}
                  currentState={(state: any) => setSideDrawerOn(state)}
                />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
