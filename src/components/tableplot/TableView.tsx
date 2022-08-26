/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import SearchBar from '../SearchBar';
import TablePlot from './TablePlot';
import { Venue } from '../../types/Venue';
import { useGetAllVenues } from '../../api/venues';
import { useNavigate } from 'react-router-dom';

export default function TableView() {
  const navigate = useNavigate();
  const { isLoading, isError, data: venues } = useGetAllVenues();
  const unFilteredRowData = venues?.map((venue: Venue) => {
    return {
      id: venue.id,
      name: venue.name,
      street: venue.street,
      city: venue.city,
      state: venue.state,
      zipcode: venue.zipcode,
      website: venue.website,
    };
  });
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Street',
        accessor: 'street',
      },
      {
        Header: 'City',
        accessor: 'city',
      },
      {
        Header: 'State',
        accessor: 'state',
      },
      {
        Header: 'Zipcode',
        accessor: 'zipcode',
      },
      {
        Header: 'Website',
        accessor: 'website',
      },
    ],
    [],
  );

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
  return (
    <>
      <Box
        sx={{
          maxWidth: '1440px',
          mx: { xs: 2, md: 3, lg: 6, xl: 'auto' },
          my: 6,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 4,
          }}
        >
          <Typography flexGrow="1" variant="h1">
            Table
          </Typography>
          <SearchBar
            rows={unFilteredRowData}
            searchedItem={(e: any) => console.log(e)}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              minWidth: '227px',
            }}
            placeholder="Search by name, location, or performance"
          />
        </Box>
        <TablePlot
          columns={columns}
          data={unFilteredRowData}
          onEdit={(tableId: string) => navigate(`/venues/${tableId}/edit`)}
        />
      </Box>
    </>
  );
}
