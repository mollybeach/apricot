import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TablePlot from '../../components/tableplot/TablePlot';

export default function ArtistsView() {
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'DOB',
        accessor: 'dob',
        type: 'date',
      },
      {
        Header: 'Bio',
        accessor: 'bio',
      },
      {
        Header: 'Hometown',
        accessor: 'hometown',
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
            Artists
          </Typography>
        </Box>
        <TablePlot
          columns={columns}
          onEdit={(artistId: string) => navigate(`/artists/${artistId}/edit`)}
          tableName="Artists"
          route="artists"
          enableSearch={false}
        />
      </Box>
    </>
  );
}
