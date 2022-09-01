import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TablePlot from '../../components/tableplot/TablePlot';
import { Role } from '../../types/User';

export default function ProductionsView() {
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        Header: 'Brand',
        accessor: 'play.brand.name',
      },
      {
        Header: 'License Name',
        accessor: 'play.licenseName',
      },
      {
        Header: 'Studio',
        accessor: 'studio.name',
      },
      {
        Header: 'Production Start Date',
        accessor: 'productionStartDate',
        type: 'date',
      },
      {
        Header: 'Production End Date',
        accessor: 'productionEndDate',
        type: 'date',
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
            Productions
          </Typography>
        </Box>
        <TablePlot
          columns={columns}
          onEdit={(productionId: string) =>
            navigate(`/productions/${productionId}/edit`)
          }
          tableName="Productions"
          route="productions"
          requiredEditScopes={[
            Role.apricotOperator,
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
