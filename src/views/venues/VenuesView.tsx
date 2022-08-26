import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TablePlot from '../../components/tableplot/TablePlot';
import { Role } from '../../types/User';

export default function VenuesView() {
  const navigate = useNavigate();
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
            Venues
          </Typography>
        </Box>
        <TablePlot
          columns={columns}
          onEdit={(venueId: string) => navigate(`/venues/${venueId}/edit`)}
          tableName="Venues"
          route="venues"
          requiredEditScopes={[
            Role.spectraOperator,
            Role.studioAdmin,
            Role.studioManager,
          ]}
          studioIdKey={'studioId'}
          enableSearch={false}
        />
      </Box>
    </>
  );
}
