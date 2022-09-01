import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TablePlot from '../../components/tableplot/TablePlot';
import { Role } from '../../types/User';

export default function PlaysView() {
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: 'Brand Name',
        accessor: 'brand.name',
      },
      {
        Header: 'License Name',
        accessor: 'licenseName',
      },
      {
        Header: 'License House',
        accessor: 'licenseHouse',
      },
      {
        Header: 'Type',
        accessor: 'type',
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
            Plays
          </Typography>
        </Box>
        <TablePlot
          columns={columns}
          onEdit={(playId: string) => navigate(`/plays/${playId}/edit`)}
          tableName="Plays"
          route="plays"
          enableSearch={false}
          requiredEditScopes={[Role.apricotOperator]}
        />
      </Box>
    </>
  );
}
