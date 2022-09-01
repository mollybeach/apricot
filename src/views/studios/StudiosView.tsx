import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { SearchBar } from '../../components';
import { useNavigate } from 'react-router-dom';
import TablePlot from '../../components/tableplot/TablePlot';
import { Role } from '../../types/User';

export default function StudiosView() {
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Institution',
        accessor: 'institution.name',
      },
      {
        Header: 'Type',
        accessor: 'type',
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

  //const [searchedRow, setSearchedRow] = React.useState(unFilteredRowData,);
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
            Studios
          </Typography>
          <SearchBar
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
          onEdit={(studioId: string) => navigate(`/studios/${studioId}/edit`)}
          tableName="Studios"
          route="studios"
          enableSearch={false}
          requiredEditScopes={[
            Role.apricotOperator,
            Role.studioAdmin,
            Role.studioManager,
          ]}
          studioIdKey="id"
        />
      </Box>
    </>
  );
}
