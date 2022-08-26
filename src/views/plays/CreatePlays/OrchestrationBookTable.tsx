import React, { useMemo } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import SearchBar from '../../../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { OrchestrationBook } from '../../../types/OrchestrationBook';
import TablePlot from '../../../components/tableplot/TablePlot';
import { useGetAllOrchestrationBooks } from '../../../api/orchestrationBooks';

interface OrchestrationBooksProps {
  playId?: string;
  orchestrationId?: string;
}
export default function OrchestrationBooksView(props: OrchestrationBooksProps) {
  const { playId, orchestrationId } = props;
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    data: orchestrationBooks,
  } = useGetAllOrchestrationBooks(playId, orchestrationId);

  const unFilteredRowData = orchestrationBooks?.map(
    (orchestrationBook: OrchestrationBook) => {
      return {
        id: orchestrationBook.id,
        bookName: orchestrationBook.bookName,
        bookLabel: orchestrationBook.bookLabel,
        createdAt: orchestrationBook.createdAt,
        updatedAt: orchestrationBook.updatedAt,
        orchestration: orchestrationBook.orchestration,
        instruments: orchestrationBook.instruments,
      };
    },
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Book Name',
        accessor: 'bookName',
      },
      {
        Header: 'Book Label',
        accessor: 'bookLabel',
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
      },
      {
        Header: 'Updated At',
        accessor: 'updatedAt',
      },
      {
        Header: 'Orchestration',
        accessor: 'orchestration',
      },
      {
        Header: 'Instruments',
        accessor: 'instruments',
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
  // const [searchedRow, setSearchedRow] = React.useState(unFilteredRowData);
  return (
    <>
      <Box
        sx={{
          maxWidth: '400px',
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
            OrchestrationBooks
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
          onEdit={(orchestrationBookId: string) =>
            navigate(`/orchestrationBooks/${orchestrationBookId}/edit`)
          }
        ></TablePlot>
      </Box>
    </>
  );
}
