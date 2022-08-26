import React, { useEffect, useState } from 'react';
import { useExpanded, useGroupBy, useSortBy, useTable } from 'react-table';
import { makeStyles } from '@mui/styles';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import moment from 'moment';
import { useQuery } from 'react-query';
import { useAuth } from '../../hooks/useAuth';
import { SearchBar } from '../index';
import { fetchPagination } from '../../api/utils';
import { Role } from '../../types/User';

const useStyles = makeStyles(() => ({
  Table: {
    fontSize: '14px',
    borderCollapse: 'collapse',
    width: '100%',
    boxSizing: 'border-box',
    boxShadow:
      '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    marginBottom: '54px',
    borderRadius: '8px',
    'overflow-x': 'auto',
  },
  'TableHead , TableCell': {
    textAlign: 'left',
  },
  TableCell: {
    padding: '16px 24px',
    fontSize: '14px',
    color: '#111827',
    fontWeight: '500',
    justifyContent: 'center',
    borderBottom: '1px solid #E5E7EB',
  },
  TableHead: {
    backgroundColor: '#F9FAFB',
    color: '#6B7280',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '500',
    padding: '12px 24px',
    borderRadius: '8px',
    borderBottom: '1px solid #E5E7EB',
  },
  TableRow: {
    backgroundColor: 'fff',
  },
  ' TableCell:last-child': {
    borderBottom: 'none',
  },
  TableFooter: {
    backgroundColor: '#fff',
  },
  TablePagination: {
    padding: '16px 24px',
  },
  TableEditButton: {
    cursor: 'pointer',
    color: '#4F46E5 !important',
  },
}));
interface TablePlotProps {
  columns: any;
  data?: any;
  tableName?: string;
  onEdit?: (tableId: any) => void;
  route?: string;
  model?: any;
  enableSearch?: boolean;
  requiredEditScopes?: Role[];
  isScoped?: boolean;
  studioIdKey?: string;
}

const initialNumOfRows = 5;
const rowsPerPageOptions = [5, 10, 25];

export default function TablePlot(props: TablePlotProps) {
  const classes = useStyles();
  const { columns: columns, onEdit, route, enableSearch = false } = props;
  const { isAuthenticated, user } = useAuth();
  // const canEdit = props.requiredEditScopes?.includes(user.primaryRole) || false
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearchText] = useState('');
  const [emptyRows, setEmptyRows] = useState([]);
  const {
    isLoading,
    isError,
    data: response,
    refetch: refetchData,
    isSuccess: fetchedSuccessfully,
  } = useQuery(
    [route],
    () => fetchPagination(route, page, rowsPerPage, search),
    {
      keepPreviousData: true,
      retry: false,
    },
  );

  const hasEditRole =
    isAuthenticated && props.requiredEditScopes?.includes(user?.primaryRole);

  useEffect(() => {
    if (isAuthenticated) {
      Promise.all([refetchData]).then(() => {
        console.log('refetched');
      });
    }
  }, [isAuthenticated]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    route && fetchPagination(route, newPage, rowsPerPage, '');
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    route && fetchPagination(route, page, rowsPerPage, '');
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: columns,
        data: response && response.data ? response.data : emptyRows,
      },
      useGroupBy,
      useSortBy,
      useExpanded,
    );
  return (
    <React.Fragment>
      {enableSearch && (
        <SearchBar
          searchCallback={(text: string) => {
            console.log(text);
          }}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            minWidth: '227px',
          }}
          placeholder="Search by name, location, or performance"
        />
      )}
      <TableContainer>
        <Table
          {...getTableProps()}
          className={classes.Table}
          stickyHeader={true}
        >
          <TableHead className={classes.TableHead}>
            {headerGroups.map((headerGroup) => (
              <TableRow
                className={classes.TableRow}
                {...headerGroup.getHeaderGroupProps()}
                key={headerGroup.id}
              >
                {headerGroup.headers.map((column: any) => (
                  <TableCell
                    className={classes.TableHead}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id}
                  >
                    {column.canGroupBy && column.id === 'category' ? (
                      <span {...column.getGroupByToggleProps()}>
                        {' '}
                        {column.isGrouped ? '+ ' : '- '}
                      </span>
                    ) : null}
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' ▼'
                          : ' ▲'
                        : ''}
                    </span>
                  </TableCell>
                ))}
                {onEdit && <TableCell className={classes.TableHead} />}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row: any) => {
              prepareRow(row);
              const canEditRow =
                user?.isOperator ||
                (hasEditRole &&
                  Object.keys(row.original).includes(props.studioIdKey) &&
                  row.original[props.studioIdKey] === user.studioId);
              return (
                <TableRow {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell: any) => {
                    return (
                      <TableCell {...cell.getCellProps()} key={cell.column.id}>
                        {cell.isGrouped ? (
                          // If it's a grouped cell, add an expander and row count
                          <>
                            <span {...row.getToggleRowExpandedProps()}>
                              {row.isExpanded ? '-' : '+'}
                            </span>{' '}
                            {cell.render('Cell')} ({row.subRows.length})
                          </>
                        ) : cell.isAggregated ? (
                          // If the cell is aggregated, use the Aggregated
                          cell.render('Aggregated')
                        ) : cell.isPlaceholder ? null : cell.column.id.match(
                            // For cells with repeated values, render null
                            /site/gi,
                          ) ? (
                          <a
                            href={`${cell.value}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {cell.render('Cell')}
                          </a>
                        ) : cell.column.type === 'date' &&
                          moment.utc(cell.value).isValid() ? (
                          moment.utc(cell.value).format('MM/DD/YYYY')
                        ) : (
                          cell.render('Cell')
                        )}
                      </TableCell>
                    );
                  })}
                  {onEdit && canEditRow && (
                    <TableCell>
                      <Button
                        onClick={() => onEdit(response.data[row.index].id)}
                        role="gridcell"
                        className={classes.TableEditButton}
                        color="secondary"
                        variant="outlined"
                      >
                        Edit
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter
            className={classes.TableFooter}
            sx={{
              justifyContent: 'flex-start',
            }}
          >
            {rows.length > 5 && (
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="tr"
                labelRowsPerPage={'Rows Per Page'}
                colSpan={4}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
