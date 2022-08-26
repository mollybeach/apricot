import React from 'react';
import IndividualNav from '../../components/IndividualNav';
import { Box, Grid, CircularProgress } from '@mui/material';
import Table from '../../components/Table';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useGetAllArtists } from '../../api/artists';
import { Artist } from '../../types/Artist';

export default function ArtistsView() {
  const { isLoading, isError, data: artists } = useGetAllArtists();
  const unFilteredRowData = artists?.map((artist: Artist) => {
    return {
      id: artist.id,
      firstName: artist.firstName,
      lastName: artist.lastName,
      dob: artist.dob,
    };
  });
  if (isError) {
    return <Box>Error Fetching data...</Box>;
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }
  //const [searchedRow, setSearchedRow] = React.useState(unFilteredRowData);
  return (
    <Box
      sx={{
        maxWidth: '1440px',
        mx: { xs: 2, md: 3, lg: 6, xl: 'auto' },
        my: 6,
      }}
    >
      <Grid container justifyContent={'space-between'}>
        <Grid
          item
          xs={12}
          md={4}
          lg={3}
          sx={{
            my: 2,
          }}
        >
          <Box
            sx={{
              mb: 5,
            }}
          >
            <Breadcrumbs />
          </Box>
          <IndividualNav
            name={''}
            avatarImgSrc={'https://via.placeholder.com/150'}
            userRole={''}
            buttonNames={['Send Email', 'Add Affiliation']}
            dropDownNames={['Add']}
          />
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          <Table
            title={'Productions'}
            columnHeadings={['PRODUCTION-NAME', 'ROLE', 'START-END-DATE']}
            rows={unFilteredRowData}
          />
          <Table
            title={'Studios'}
            columnHeadings={['STUDIO-NAME', 'ROLE']}
            rows={unFilteredRowData}
          />
          <Table
            title={'Awards'}
            columnHeadings={[
              'AWARD-NAME',
              'ROLE',
              'PRODUCTION',
              'START-END-DATE',
            ]}
            rows={unFilteredRowData}
          />
          <Table
            title={'Account Information'}
            rowHeadings={[
              'First Name',
              'Last Name',
              'Date of birth',
              'Address',
              'Last Login',
            ]}
            rows={unFilteredRowData}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
