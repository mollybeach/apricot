import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Box, Divider, ListItem, Stack, Typography } from '@mui/material';
import {
  Autocomplete,
  Button,
  Paper,
  Select,
  TextField,
} from '../../../components';
import DialogHeader from '../../common/DialogHeader';
import { AddOrchestrationBooksValidation } from './PlaysValidationSchema';
import { useStyles } from '../styles';
import { AddOrchestrationBooksProps } from '../types';
import { Play } from '../../../types/Play';
import { Orchestration } from '../../../types/Orchestration';
import {
  useDeleteOrchestrationBook,
  useDeleteOrchestrationInstrument,
  useGetOrchestrationBook,
  usePatchOrchestrationInstrument,
  usePostOrchestrationBook,
  usePutOrchestrationBook,
} from '../../../api/orchestrationBooks';
import { OrchestrationBookLabel } from '../../../types/OrchestrationBook';
import { Instrument } from '../../../types/Instrument';
import { useGetAllInstruments } from '../../../api/instruments';

export default function AddOrchestrationBooks(
  props: AddOrchestrationBooksProps,
) {
  const { onClose, id: orchestrationBookId } = props;
  const classes = useStyles();
  const queryClient = useQueryClient();
  const { handleSubmit, control, reset, setValue, watch } =
    AddOrchestrationBooksValidation();
  const play: Play = queryClient.getQueryData(['selectedPlay']);
  const orchestration: Orchestration = queryClient.getQueryData([
    'selectedOrchestration',
  ]);

  const { data: instruments } = useGetAllInstruments();
  const [instrumentTypes, setInstrumentTypes] = useState([]);
  useEffect(() => {
    setInstrumentTypes([
      ...new Set(
        instruments?.map((instrument: Instrument) => instrument.type).sort(),
      ),
    ]);
  }, [instruments]);

  const { data: orchestrationBook } = useGetOrchestrationBook(
    play.id,
    orchestration.id,
    orchestrationBookId,
  );
  const updateMutation = usePutOrchestrationBook(
    play.id,
    orchestration.id,
    orchestrationBookId,
  );
  const postMutation = usePostOrchestrationBook(play.id, orchestration.id);
  const deleteMutation = useDeleteOrchestrationBook(
    play.id,
    orchestration.id,
    orchestrationBookId,
  );

  const { mutate: addInstrumentMutation } = usePatchOrchestrationInstrument(
    play.id,
    orchestration.id,
    orchestrationBookId,
  );
  const { mutate: deleteInstrumentMutation } = useDeleteOrchestrationInstrument(
    play.id,
    orchestration.id,
    orchestrationBookId,
  );

  useEffect(() => {
    if (orchestrationBookId && orchestrationBook) {
      reset(orchestrationBook);
      setSelectedInstruments(orchestrationBook.instruments || []);
    }
  }, [orchestrationBookId, orchestrationBook]);

  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const watchSelectedInstrument = watch('selectedInstrument');
  useEffect(() => {
    if (watchSelectedInstrument) {
      const selectedInstrument: Instrument = instruments.find(
        (instrument: Instrument) =>
          instrument.id === watchSelectedInstrument.id,
      );
      if (
        selectedInstrument &&
        selectedInstruments.findIndex(
          (element) => element.id === selectedInstrument.id,
        ) === -1
      ) {
        if (orchestrationBookId) {
          addInstrumentMutation(selectedInstrument.id);
        }
        setSelectedInstruments([...selectedInstruments, selectedInstrument]);
      }
      setValue('selectedInstrument', null);
    }
  }, [watchSelectedInstrument]);

  const onSubmit = async (data: any) => {
    const formData = {
      ...data,
      playId: play.id,
      playOrchestrationId: orchestration.id,
      instrumentIds: selectedInstruments.map(
        (instrument: Instrument) => instrument.id,
      ),
    };
    try {
      orchestrationBookId
        ? await updateMutation.mutateAsync(formData)
        : await postMutation.mutateAsync(formData);
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteOrchestrationBook = async () => {
    try {
      await deleteMutation.mutateAsync();
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    Promise.all([
      queryClient.invalidateQueries(['selectedPlay']),
      queryClient.invalidateQueries(['selectedOrchestration']),
    ]).then(() => {
      reset();
      onClose();
    });
  };

  const handleDeleteInstrument = async (instrumentId: string) => {
    try {
      if (orchestrationBookId) {
        await deleteInstrumentMutation(instrumentId);
      }
      setSelectedInstruments([
        ...selectedInstruments.filter(
          (instrument: Instrument) => instrument.id !== instrumentId,
        ),
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <DialogHeader
        title={
          orchestrationBookId
            ? 'Edit Orchestration Book'
            : 'Add Orchestration Book'
        }
        handleSave={handleSubmit(onSubmit)}
        handleDelete={() => handleDeleteOrchestrationBook()}
        cancel={() => handleClose()}
      />
      <Box className={classes.content}>
        <Paper>
          <Box className={classes.subContent}>
            <Typography variant="h2">Details</Typography>
            <Divider style={{ marginBottom: '24px' }} />
            <Box className={classes.mt}>
              <TextField name="bookName" label="Book Name" control={control} />
            </Box>
            <Box mt={3}>
              <Select
                options={(
                  Object.keys(OrchestrationBookLabel) as Array<
                    keyof typeof OrchestrationBookLabel
                  >
                )
                  .map((key) => OrchestrationBookLabel[key])
                  .sort()}
                placeholder="Book Label"
                control={control}
                name="bookLabel"
                label="Book Label"
              />
            </Box>

            {/*<Box mt={3}>*/}
            {/*  <Select*/}
            {/*    label="Instrument Type"*/}
            {/*    placeholder="Instrument Type"*/}
            {/*    control={control}*/}
            {/*    name="selectedInstrumentType"*/}
            {/*    options={instrumentTypes}*/}
            {/*  />*/}
            {/*</Box>*/}
            <Box mt={3}>
              <Autocomplete
                label="Instruments"
                placeholder="Instruments"
                control={control}
                name="selectedInstrument"
                options={instruments?.map((instrument: Instrument) => ({
                  id: instrument.id,
                  label: `${instrument.type} - ${instrument.name}`,
                }))}
              />
              {selectedInstruments?.map((instrument: Instrument) => (
                <Stack
                  display="flex"
                  direction="row"
                  sx={{ my: '24px' }}
                  key={instrument.id}
                >
                  <ListItem>
                    {instrument.type} - {instrument.name}
                  </ListItem>
                  <Button
                    label="Delete"
                    variant={'outlined'}
                    color={'secondary'}
                    onClick={() => handleDeleteInstrument(instrument.id)}
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
