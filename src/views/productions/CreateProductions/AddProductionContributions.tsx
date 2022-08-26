import React, { useEffect, useState } from 'react';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import {
  Alert,
  Autocomplete,
  Paper,
  Select,
  SideDrawer,
} from '../../../components';
import DialogHeader from '../../common/DialogHeader';
import { AddProductionContributionValidation } from './ProductionsValidationSchema';
import { useStyles } from '../styles';
import { ProductionArtistsProps, SideBarArtistsState } from '../types';
import {
  useDeleteProductionContribution,
  usePostProductionContribution,
  usePutProductionContribution,
} from '../../../api/productionContribution';
import { Production } from '../../../types/Production';
import { useQueryClient } from 'react-query';
import { Artist } from '../../../types/Artist';
import AddIcon from '@mui/icons-material/Add';
import AddArtists from '../../plays/CreatePlays/AddArtists';
import { useGetAllArtists } from '../../../api/artists';
import { useGetAllOrchestrationBooksForPlay } from '../../../api/orchestrationBooks';
import { OrchestrationBook } from '../../../types/OrchestrationBook';
import { useGetAllCharacters } from '../../../api/characters';
import { Character } from '../../../types/Character';
import {
  AdministrativeProductionContribution,
  ArtisticProductionContribution,
  CharacterProductionContribution,
  CrewProductionContribution,
  OrchestrationBooksProductionContribution,
  ProductionContributionType,
} from '../../../types/ProductionContribution';
import Loader from '../../../components/Loader';
import {
  alertAutoHideDuration,
  GlobalMessages,
} from '../../../utils/globalConfig';
import { AlertState } from '../../../types/Global';

export default function AddProductionContributions(
  props: ProductionArtistsProps,
) {
  const { onClose, id } = props;
  const [alertState, setAlertState] = useState<AlertState>({
    active: false,
    message: '',
  });
  const defaultSideBarState = {
    addProductionArtists: false,
    addOrchestrationBooks: false,
    addCharacters: false,
  };
  const [isSideDrawerOn, setSideDrawerOn] =
    useState<SideBarArtistsState>(defaultSideBarState);

  const queryClient = useQueryClient();

  const classes = useStyles();
  const { handleSubmit, control, reset, watch } =
    AddProductionContributionValidation();

  // Contribution Types and Names
  const watchContributionType: ProductionContributionType =
    watch('contributionType');
  const [contributionNameOptions, setContributionNameOptions] = useState([]);
  useEffect(() => {
    let selectedEnum: any = null;
    switch (watchContributionType) {
      case ProductionContributionType.administrative:
        selectedEnum = AdministrativeProductionContribution;
        break;
      case ProductionContributionType.artistic:
        selectedEnum = ArtisticProductionContribution;
        break;
      case ProductionContributionType.crew:
        selectedEnum = CrewProductionContribution;
        break;
      case ProductionContributionType.musician:
        selectedEnum = OrchestrationBooksProductionContribution;
        break;
      case ProductionContributionType.actor:
        selectedEnum = CharacterProductionContribution;
    }

    if (watchContributionType) {
      setContributionNameOptions(
        (Object.keys(selectedEnum) as Array<keyof typeof selectedEnum>)
          .map((key) => selectedEnum[key])
          .sort(),
      );
    } else {
      setContributionNameOptions([]);
    }
  }, [watchContributionType]);

  const { data: artists } = useGetAllArtists();

  const production: Production = queryClient.getQueryData([
    'selectedProduction',
  ]);

  const updateMutation = usePutProductionContribution(production.id, id);
  const postMutation = usePostProductionContribution(production.id);
  const deleteMutation = useDeleteProductionContribution(production.id, id);
  const { data: characters } = useGetAllCharacters(production.playId);
  const { data: orchestrationBooks } = useGetAllOrchestrationBooksForPlay(
    production.playId,
  );
  console.log(orchestrationBooks);
  const {
    isError: postError,
    isLoading: postLoading,
    isSuccess: postSuccess,
  } = postMutation;
  const {
    isError: updateError,
    isLoading: updateLoading,
    isSuccess: updateSuccess,
  } = updateMutation;
  const {
    isError: deleteError,
    isSuccess: deleteSuccess,
    isLoading: deleteLoading,
  } = deleteMutation;

  useEffect(() => {
    if (id) {
      const contribution = production.contributions.find(
        (val: any) => val.id === id,
      );
      let specificContribution = {};
      if (contribution.contributionType === ProductionContributionType.actor) {
        specificContribution = {
          contributionName: ProductionContributionType.actor,
          characterId: contribution.character.id,
          selectedCharacter: {
            id: contribution.character.id,
            label: contribution.character.name,
          },
        };
      } else if (
        contribution.contributionType === ProductionContributionType.musician
      ) {
        specificContribution = {
          contributionName: ProductionContributionType.musician,
          orchestrationBookId: contribution.orchestrationBook.id,
          selectedOrchestrationBook: {
            id: contribution.orchestrationBook.id,
            label: contribution.orchestrationBook.bookName,
          },
        };
      }
      reset({
        ...contribution,
        artistId: contribution.artist.id,
        artist: {
          id: contribution.artist.id,
          label: `${contribution.artist.firstName} ${contribution.artist.lastName}`,
        },
        ...specificContribution,
      });
    }
  }, [id, orchestrationBooks]);

  const onSubmit = async (data: any) => {
    const formData = {
      ...data,
      artistId: data.artist.id,
      productionId: production.id,
    };
    if (watchContributionType === ProductionContributionType.actor) {
      formData.contributionName = ProductionContributionType.actor;
      formData.characterId = data.selectedCharacter.id;
      formData.orchestrationBookId = null;
    } else if (watchContributionType === ProductionContributionType.musician) {
      formData.contributionName = ProductionContributionType.musician;
      formData.orchestrationBookId = data.selectedOrchestrationBook.id;
      formData.characterId = null;
    }
    try {
      id
        ? await updateMutation.mutateAsync(formData)
        : await postMutation.mutateAsync(formData);
      setAlertState({
        active: true,
        message: id
          ? GlobalMessages.updateProductionSuccessMsg
          : GlobalMessages.addProductionSuccessMsg,
      });
      handleClose();
    } catch (e) {
      setAlertState({
        active: true,
        message: GlobalMessages.errorMsg,
      });
    }
  };

  const handleDeleteContribution = async () => {
    try {
      await deleteMutation.mutateAsync();
      await handleClose();
    } catch (e) {
      setAlertState({
        active: true,
        message: GlobalMessages.errorMsg,
      });
    }
  };

  const handleClose = () => {
    queryClient.invalidateQueries(['selectedProduction']).then(() => {
      reset();
      onClose();
    });
  };

  if (postSuccess || updateSuccess || deleteSuccess) {
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
      {(postLoading || updateLoading || deleteLoading) && (
        <Loader isLoading={postLoading || updateLoading || deleteLoading} />
      )}
      {(postError || updateError || deleteError) && (
        <Alert
          message={alertState.message}
          open={alertState.active}
          severity="error"
          autoHideDuration={alertAutoHideDuration}
          onClose={() => setAlertState({ active: false })}
        />
      )}
      <Box>
        <DialogHeader
          title={
            id ? 'Edit Production Contribution' : 'Add  Production Contribution'
          }
          handleSave={handleSubmit(onSubmit)}
          handleDelete={id && handleDeleteContribution}
          cancel={() => handleClose()}
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
                    Object.keys(ProductionContributionType) as Array<
                      keyof typeof ProductionContributionType
                    >
                  )
                    .map((key) => ProductionContributionType[key])
                    .sort()}
                />
              </Box>
              {(watchContributionType ===
                ProductionContributionType.administrative ||
                watchContributionType ===
                  ProductionContributionType.artistic) && (
                <Box mt={3}>
                  <Select
                    label="Contribution Name"
                    control={control}
                    placeholder="Contribution Name"
                    name="contributionName"
                    options={contributionNameOptions}
                  />
                </Box>
              )}

              <Box mt={3} sx={{ display: 'flex' }}>
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
                        addProductionArtists:
                          !isSideDrawerOn.addProductionArtists,
                      })
                    }
                  >
                    <AddIcon />
                  </IconButton>
                  <SideDrawer
                    isActive={isSideDrawerOn.addProductionArtists}
                    toggleDrawer={() =>
                      setSideDrawerOn({
                        ...defaultSideBarState,
                        addProductionArtists:
                          !isSideDrawerOn.addProductionArtists,
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
                          addProductionArtists:
                            !isSideDrawerOn.addProductionArtists,
                        })
                      }
                    />
                  </SideDrawer>
                </Box>
              </Box>
              <Box
                mt={3}
                sx={{
                  display:
                    watchContributionType === ProductionContributionType.actor
                      ? 'flex'
                      : 'none',
                }}
              >
                <Box style={{ width: '100%' }}>
                  <Autocomplete
                    placeholder="Select Character"
                    name="selectedCharacter"
                    control={control}
                    options={((characters as Character[]) || []).map(
                      (character: Character) => {
                        return {
                          id: character.id,
                          label: `${character.name}`,
                        };
                      },
                    )}
                  />
                </Box>
              </Box>
              <Box
                mt={3}
                sx={{
                  display:
                    watchContributionType ===
                    ProductionContributionType.musician
                      ? 'flex'
                      : 'none',
                }}
              >
                <Box style={{ width: '100%' }}>
                  <Autocomplete
                    placeholder="Select Orchestration Book"
                    name="selectedOrchestrationBook"
                    control={control}
                    options={(
                      (orchestrationBooks as OrchestrationBook[]) || []
                    ).map((orchestrationBook: OrchestrationBook) => {
                      return {
                        id: orchestrationBook.id,
                        label: `${orchestrationBook.bookName}`,
                      };
                    })}
                  />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
