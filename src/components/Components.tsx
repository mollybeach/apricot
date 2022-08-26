import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import {
  Avatar,
  Breadcrumbs,
  Button,
  DropDownMenu,
  NavTabs,
  Paper,
  Pill,
  Switch,
  Table,
  TableAvatar,
  Checkbox,
  Alert,
  Dialog,
  TextField,
  Autocomplete,
  SideDrawer,
  TextArea,
  SearchBar,
  DatePicker,
  Select,
} from './';
import Dropzone from './Dropzone/Dropzone';
import { UploadableFile } from './Dropzone/types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import UploadFileInput from './Upload/UploadFileInput';
import SingleImageUpload from './Upload/SingleImageUpload';
import SingleVideoUpload from './Upload/SingleVideoUpload';
import MultiFileUpload from './Upload/MultiFileUpload';
import MultiImageUpload from './Upload/MultiImageUpload';

interface ComponentProps {
  isUpload: any;
}
const Components = (props: ComponentProps) => {
  const [alertState, setAlertState] = React.useState(true);
  const [halfDialog, setHalfDialog] = React.useState(false);
  const [fullDialog, setFullDialog] = React.useState(false);
  const [isSideDrawerOn, setSideDrawerOn] = React.useState(false);

  const unFilteredRowData = [
    {
      name: 'Frozen yoghurt',
      calories: 159,
      fat: 6,
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9,
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16,
    },
    {
      name: 'Cupcake',
      calories: 305,
      fat: 3.7,
    },
  ];
  const [searchedRow, setSearchedRow] = React.useState(unFilteredRowData);

  const sampleImg = '';

  const Schema = yup.object().shape({
    textField: yup.string().min(2).max(500).required('Field is required'),
    textArea: yup
      .string()
      .min(20)
      .max(1000)
      .required('Description is required'),
    checkbox: yup.bool().oneOf([true], 'Checkbox required'),
    switch: yup.bool().oneOf([true], 'Switch required'),
    select: yup.object().required('Select is required!'),
    datePicker: yup.string().nullable().required('Choose date is required!'),
    Select: yup.array().min(1, 'at least 1').required('required'),
  });

  const methods = useForm<any>({
    defaultValues: {
      textField: '',
      textArea: '',
      checkbox: false,
      switch: false,
      datePicker: null,
    },
    mode: 'onSubmit',
    resolver: yupResolver(Schema),
  });

  const items = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  const { handleSubmit, control } = methods;
  const onSubmit = (data: any) => console.log(data);

  const handlePosterUpload = (blob: string) => {
    console.log('Received poster file blob: ', blob);
  };

  return (
    <>
      <div style={{ padding: 32 }}>
        <TextField label="Label" control={control} name="textField" />
        <Autocomplete
          label="Select Label"
          name="select"
          control={control}
          options={[
            {
              label: 'One',
              id: 1,
            },
            {
              label: 'Two',
              id: 2,
            },
            {
              label: 'Three',
              id: 3,
            },
          ]}
        />
        <Box style={{ marginTop: 16 }}>
          <UploadFileInput
            imageData={(data: any) => console.log(data)}
            id="img-upload"
          />
        </Box>
        <Box style={{ marginTop: 16 }}>
          <TextArea
            maxRows={4}
            placeholder="Description"
            style={{ width: '100%', height: 133 }}
            label="Description"
            control={control}
            name="textArea"
          />
        </Box>
        <Box style={{ marginTop: 16 }}>
          <Select
            options={items}
            placeholder="Multi Select"
            control={control}
            name="Select"
            multiple
          />
        </Box>
        <Stack direction="row" spacing={1} style={{ marginTop: 16 }}>
          <Switch label="Live" name="switch" control={control} />
          <Checkbox label="Checkbox label" control={control} name="checkbox" />
        </Stack>
        <Button
          style={{ marginTop: 16 }}
          onClick={handleSubmit(onSubmit)}
          variant={'contained'}
          label={'Validate'}
          color={'primary'}
        />
        <Box style={{ marginTop: 16 }}>
          <DatePicker label="DOB" control={control} name="datePicker" />
        </Box>
        <Button
          onClick={() => setSideDrawerOn(!isSideDrawerOn)}
          label={'SideDrawer'}
          variant={'contained'}
          color={'primary'}
          style={{ margin: '16px 0' }}
        >
          Side Drawer
        </Button>
        <SideDrawer
          isActive={isSideDrawerOn}
          toggleDrawer={(e: any) => setSideDrawerOn(e)}
        >
          <TextField label="Label" control={control} name="firstName" />
        </SideDrawer>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h1">Heading1</Typography>
          <Typography variant="h2">Heading2</Typography>
          <Typography variant="h3">Heading3</Typography>
          <Typography variant="h4">Heading4</Typography>
          <Typography variant="h5">Heading5</Typography>
          <Typography variant="h6">Heading6</Typography>
        </Stack>

        <Box style={{ marginTop: 16 }}>
          <Dropzone
            uploadedFiles={(files: UploadableFile[]) => console.log(files)}
            isUpload={() => props.isUpload()}
          />
        </Box>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          style={{ marginTop: 32 }}
        >
          <Button
            variant="contained"
            color="primary"
            label="Half Dialog"
            onClick={() => setHalfDialog(!halfDialog)}
          />
          <Button
            variant="contained"
            color="primary"
            label="Full Screen Dialog"
            onClick={() => setFullDialog(!fullDialog)}
          />
        </Stack>
        <Dialog
          isOpen={halfDialog}
          handleClose={() => setHalfDialog(!halfDialog)}
          handlePrimaryBtn={() => setHalfDialog(!halfDialog)}
          handleSecondaryBtn={() => setHalfDialog(!halfDialog)}
          title="Half dialog title"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          ex, eveniet sequi doloremque accusamus consequuntur laborum
          similique odit!"
          primaryBtnLabel="Delete"
          secondaryBtnLabel="Cancel"
          primaryVariantColor="error"
          secondaryVariantColor="info"
          primaryVariant="contained"
          secondaryVariant="outlined"
        />
        <Dialog
          isOpen={fullDialog}
          handleClose={() => setFullDialog(!fullDialog)}
          handlePrimaryBtn={() => setFullDialog(!fullDialog)}
          handleSecondaryBtn={() => setFullDialog(!fullDialog)}
          title="Full Dialog title"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          ex, eveniet sequi doloremque accusamus consequuntur laborum
          similique odit!"
          primaryBtnLabel="Delete"
          secondaryBtnLabel="Cancel"
          primaryVariantColor="error"
          secondaryVariantColor="info"
          primaryVariant="contained"
          secondaryVariant="outlined"
          isFullScreen
        />
        <Alert
          open={alertState}
          // autoHideDuration={5000}
          message="This is a test alert"
          onClose={() => setAlertState(false)}
        />

        <div style={{ marginTop: 32 }}>
          <Breadcrumbs />
        </div>
        <div style={{ marginTop: 32 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar imgSrc={sampleImg} alt="avatar" />
            <DropDownMenu
              label="Create New"
              id="create-new"
              options={[
                {
                  label: 'User',
                  id: '1',
                  onClick: () => console.log('User'),
                },
                {
                  label: 'Plays',
                  id: '2',
                  onClick: () => console.log('Plays'),
                },
                {
                  label: 'Studio',
                  id: '3',
                  onClick: () => console.log('Studio'),
                },
                {
                  label: 'Production',
                  id: '4',
                  onClick: () => console.log('Production'),
                },
              ]}
              styles={{ padding: '4px 12px' }}
            />
            <Pill label="Active" color="success" variant="filled" />
            <Pill label="Claimed" color="default" variant="outlined" />
            <Pill label="Error" color="error" variant="filled" />
            <Button color="primary" variant="contained" label="Primary" />
            <Button color="secondary" variant="outlined" label="Secondary" />
          </Stack>
        </div>
        <div>
          <Box sx={{ p: 3 }} />
          <Paper>
            <>
              <Grid container spacing={2} style={{ padding: 32 }}>
                <h1>Paper</h1>
              </Grid>
            </>
          </Paper>
        </div>
        <div
          style={{
            padding: 32,
          }}
        >
          <Box style={{ paddingBottom: 16 }}>
            <SearchBar
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            />
          </Box>
          <Paper>
            <Table
              rows={searchedRow}
              columnHeadings={['Name', 'Calories', 'Fat']}
            />
          </Paper>
        </div>
        <Box style={{ paddingBottom: 16 }}>
          <SingleImageUpload
            id="singleImgUpload"
            title="Poster Upload"
            uploadCallback={handlePosterUpload}
          />
          <SingleVideoUpload
            id="singleVideoUpload"
            title="Production Video Upload"
          />
          <MultiFileUpload title={'Files'} />
          <MultiImageUpload title={'Images'} />
        </Box>
        <div style={{ padding: 32 }}>
          <Paper>
            <TableAvatar
              rows={[
                {
                  id: '1',
                  name: 'Frozen yoghurt',
                  img: sampleImg,
                  email: 'test@testmail.com',
                  dateJoined: '------',
                  status: true,
                  role: 'artist',
                },
                {
                  id: '2',
                  name: 'Ice cream sandwich',
                  img: sampleImg,
                  email: 'test@testmail.com',
                  dateJoined: '------',
                  status: false,
                  role: 'artist',
                },
                {
                  id: '3',
                  name: 'Eclair',
                  img: sampleImg,
                  email: 'test@testmail.com',
                  dateJoined: '------',
                  status: true,
                  role: 'member',
                },
                {
                  id: '4',
                  name: 'Cupcake',
                  img: sampleImg,
                  email: 'test@testmail.com',
                  dateJoined: '------',
                  status: true,
                  role: 'member',
                },
              ]}
              columnHeadings={['Name', 'Joined On', 'Status', 'Role', '']}
              onEdit={(e: number) => console.log(e)}
            />
          </Paper>
        </div>
      </div>
    </>
  );
};

export default Components;
