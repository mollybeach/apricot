import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { Box, Divider, Grid, ListItem, Stack, Typography } from '@mui/material';
import {
  Alert,
  Autocomplete,
  Button,
  DatePicker,
  Paper,
  Select,
  TextField,
  UploadFileInput,
} from '../../../components';
import DialogHeader from '../../common/DialogHeader';
import { useStyles } from '../styles';
import { CreateProductionsValidation } from './ProductionsValidationSchema';
import ProductionsSideDrawers from './ProductionsSideDrawers';
import { SideBarState } from '../types';
import {
  useDeleteProduction,
  useGetProduction,
  usePostProduction,
  usePutProduction,
} from '../../../api/production';
import Details from '../../common/Details';
import { useGetAllStudios } from '../../../api/studios';
import { useGetAllVenues } from '../../../api/venues';
import { useGetAllPlays } from '../../../api/plays';
import { Play } from '../../../types/Play';
import { Studio } from '../../../types/Studio';
import { Venue, VenueStageConfiguration } from '../../../types/Venue';
import {
  ProductionContribution,
  ProductionContributionType,
} from '../../../types/ProductionContribution';
import { AlertState } from '../../../types/Global';
import {
  alertAutoHideDuration,
  GlobalMessages,
} from '../../../utils/globalConfig';
import Loader from '../../../components/Loader';
import { useGetAllInstitutions } from '../../../api/institutions';
import { Institution } from '../../../types/Institution';
import { LicenseType } from '../../../types/Production';
import SingleImageUpload from '../../../components/Upload/SingleImageUpload';
import SingleVideoUpload from '../../../components/Upload/SingleVideoUpload';
import MultiImageUpload from '../../../components/Upload/MultiImageUpload';

function getContributionText(contribution: ProductionContribution): string {
  switch (contribution.contributionType) {
    case ProductionContributionType.actor:
      return `${contribution.artist.firstName} ${contribution.artist.lastName} - ${contribution.contributionType} - ${contribution.character?.name}`;
    case ProductionContributionType.musician:
      return `${contribution.artist.firstName} ${contribution.artist.lastName} - ${contribution.contributionType} - ${contribution.orchestrationBook?.bookName}`;
    default:
      return `${contribution.artist.firstName} ${contribution.artist.lastName} - ${contribution.contributionType} - ${contribution.contributionName}`;
  }
}

export default function CreateProduction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deleteMutation = useDeleteProduction(id);
  const defaultSideBarState = {
    id: '',
    addProductionArtists: false,
    addFeaturedArtists: false,
    addVenueArtists: false,
    addOrchestrationBooks: false,
    addCharacters: false,
  };
  const [alertState, setAlertState] = useState<AlertState>({
    active: false,
    message: '',
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = CreateProductionsValidation();
  const watchSelectedStudio = watch().selectedStudio;

  console.log(errors);

  // useEffect(() => {
  //   if (watchSelectedStudio?.id !== production?.studioId) {
  //     setValue('selectedInstitution', null);
  //   }
  // }, [watchSelectedStudio]);

  const { data: production, isSuccess: isProductionLoaded } =
    useGetProduction(id);
  const { data: plays } = useGetAllPlays();
  const { data: studios } = useGetAllStudios();
  const { data: institutions } = useGetAllInstitutions();
  const { data: venues } = useGetAllVenues();
  const queryClient = useQueryClient();

  const [isSideDrawerOn, setSideDrawerOn] =
    useState<SideBarState>(defaultSideBarState);

  const classes = useStyles();
  const updateMutation = usePutProduction(id);
  const postMutation = usePostProduction();
  const {
    isSuccess: isProductionMetaSuccess,
    isError: isProductionError,
    isLoading: isProductionLoading,
  } = postMutation;

  const {
    isError: isUpdateProductionError,
    isLoading: isUpdateProductionLoading,
    isSuccess: isUpdateProductionSuccess,
  } = updateMutation;

  useEffect(() => {
    if (isProductionLoaded && production && plays && studios && venues) {
      reset({
        ...production,
        brandId: production.play.brand.id,
        playId: production.play.id,
        selectedPlay: {
          id: production.play.id,
          label: production.play.licenseName,
        },
        studioId: production.studio.id,
        selectedStudio: {
          id: production.studio.id,
          label: production.studio.name,
        },
        venueId: production.venueId,
        selectedVenue: {
          id: production.venue.id,
          label: production.venue.name,
        },
      });
      if (production.institution) {
        // TODO: Fix institution handling for create production
        // setValue('selectedInstitution', production.institution.id);
        // setValue('selectedInstitution', {
        //   id: production.institution.id,
        //   label: production.institution.name,
        // });
      }
    }
  }, [isProductionLoaded, plays, studios, venues]);

  const onSubmit = async (data: any) => {
    const formData = {
      ...data,
      playId: data.selectedPlay.id,
      studioId: data.selectedStudio.id,
      institutionId: data.selectedInstitution && data.selectedInstitution.id,
      venueId: data.selectedVenue.id,
    };
    console.log(data);
    try {
      id
        ? await updateMutation.mutateAsync(formData)
        : await postMutation.mutateAsync(formData);
      setAlertState({
        active: true,
        message: id
          ? GlobalMessages.updateProductionSuccessMsg
          : GlobalMessages.addProductionSuccessMsg,
      }),
        handleClose();
    } catch (e) {
      setAlertState({
        active: true,
        message: GlobalMessages.errorMsg,
      });
    }
  };

  const handleClose = () => {
    queryClient.removeQueries(['selectedProduction']);
    reset();
    navigate('/productions');
  };

  const handleDeleteProduction = async () => {
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

  useEffect(() => {
    return () => {
      queryClient.removeQueries(['selectedProduction']);
    };
  }, []);

  if (isProductionMetaSuccess || isUpdateProductionSuccess) {
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
      {(isProductionLoading || isUpdateProductionLoading) && (
        <Loader isLoading={isProductionLoading || isUpdateProductionLoading} />
      )}
      {(isProductionError || isUpdateProductionError) && (
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
          title={id ? 'Edit Production' : 'Create Production'}
          handleSave={handleSubmit(onSubmit)}
          handleDelete={id && handleDeleteProduction}
          cancel={() => {
            reset();
            navigate('/productions');
          }}
        />
        <Grid container className={classes.container}>
          <Grid item xs={12} md={8} lg={8}>
            <Box>
              <Paper>
                <Box className={classes.accountInfo}>
                  <Typography variant="h2">Add Production Info</Typography>
                  <Divider sx={{ marginBottom: '24px' }} />
                  <SingleImageUpload title={'Poster'} />
                  <Divider sx={{ margin: '24px' }} />
                  <SingleImageUpload title={'Banner'} />
                  <Divider sx={{ margin: '24px' }} />
                  <SingleVideoUpload title={'Video'} />
                  <Divider sx={{ margin: '24px' }} />
                  <MultiImageUpload title={'Production Photos'} />
                  <Divider sx={{ margin: '24px' }} />
                  <Box sx={{ display: 'flex', mt: 3 }}>
                    <Box sx={{ width: '100%' }}>
                      <Autocomplete
                        label={'License Name'}
                        placeholder="License Name"
                        name="selectedPlay"
                        control={control}
                        options={((plays as Play[]) || []).map((play: Play) => {
                          return {
                            id: play.id,
                            label: `${play.brand.name} - ${play.licenseName}`,
                          };
                        })}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', mt: 3 }}>
                    <Box sx={{ width: '100%' }}>
                      <Autocomplete
                        label={'Studio'}
                        placeholder="Selected Studio"
                        name="selectedStudio"
                        control={control}
                        options={((studios as Studio[]) || []).map(
                          (studio: Studio) => {
                            return {
                              id: studio.id,
                              label: studio.name,
                            };
                          },
                        )}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', mt: 3 }}>
                    <Box sx={{ width: '100%' }}>
                      <Autocomplete
                        label={'Institution'}
                        placeholder="Selected Institution"
                        name="selectedInstitution"
                        control={control}
                        options={(institutions || []).map(
                          (institution: Institution) => ({
                            id: institution.id,
                            label: institution.name,
                          }),
                        )}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', mt: 3 }}>
                    <Box sx={{ width: '100%' }}>
                      <Autocomplete
                        label={'Venue'}
                        placeholder="Selected Venue"
                        name="selectedVenue"
                        control={control}
                        options={((venues as Venue[]) || []).map(
                          (venue: Venue) => {
                            return { id: venue.id, label: venue.name };
                          },
                        )}
                      />
                    </Box>
                  </Box>
                  <Box mt={3}>
                    <TextField
                      name="runtime"
                      label="Runtime"
                      type={'number'}
                      control={control}
                    />
                  </Box>
                  <Box mt={3}>
                    <DatePicker
                      label="Production Start Date"
                      control={control}
                      name="productionStartDate"
                    />
                  </Box>
                  <Box mt={3}>
                    <DatePicker
                      label="Production End Date"
                      control={control}
                      name="productionEndDate"
                      minDate={getValues().productionStartDate}
                    />
                  </Box>
                  <Box mt={3}>
                    <DatePicker
                      label="Capture Start Date"
                      control={control}
                      name="captureStartDate"
                    />
                  </Box>
                  <Box mt={3}>
                    <DatePicker
                      label="Capture End Date"
                      control={control}
                      name="captureEndDate"
                      minDate={getValues().captureStartDate}
                    />
                  </Box>
                  <Box mt={3}>
                    <Select
                      label="License Type"
                      placeholder="License Type"
                      control={control}
                      name="licenseType"
                      options={(
                        Object.keys(LicenseType) as Array<
                          keyof typeof LicenseType
                        >
                      )
                        .map((key) => LicenseType[key])
                        .sort()}
                    />
                  </Box>
                  <Box mt={3}>
                    <Select
                      options={(
                        Object.keys(VenueStageConfiguration) as Array<
                          keyof typeof VenueStageConfiguration
                        >
                      ).map((key) => VenueStageConfiguration[key])}
                      name="stageConfiguration"
                      label="Stage Configuration"
                      control={control}
                      placeholder={'Stage Configuration'}
                    />
                  </Box>
                  <Box mt={3}>
                    <TextField
                      name="percentSeatsSold"
                      label="Percent Seats Sold"
                      control={control}
                      type="number"
                    />
                  </Box>
                </Box>
                <Box mt={'16px'} p={'32px'}>
                  <Details
                    title="Production Contributions"
                    onAddButton={() =>
                      setSideDrawerOn({
                        ...defaultSideBarState,
                        addProductionArtists:
                          !isSideDrawerOn.addProductionArtists,
                      })
                    }
                  >
                    {!isProductionLoaded ? (
                      <div>Loading Characters...</div>
                    ) : (
                      production.contributions?.map(
                        (contribution: ProductionContribution) => (
                          <>
                            <Stack
                              display="flex"
                              direction="row"
                              style={{ marginBottom: '24px' }}
                            >
                              <ListItem>
                                {getContributionText(contribution)}
                              </ListItem>
                              <Button
                                label="Edit"
                                variant={'outlined'}
                                color={'secondary'}
                                onClick={() =>
                                  setSideDrawerOn({
                                    ...defaultSideBarState,
                                    addProductionArtists:
                                      !isSideDrawerOn.addProductionArtists,
                                    id: `${contribution.id}`,
                                  })
                                }
                              />
                            </Stack>
                          </>
                        ),
                      )
                    )}
                  </Details>
                </Box>
                <ProductionsSideDrawers
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
