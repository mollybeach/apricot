import * as React from 'react';
import { Typography, TablePagination, styled, Box } from '@mui/material';
import Avatar from './Avatar';
import { makeStyles } from '@mui/styles';
import Pill from './Pill';

const useStyles = makeStyles(() => ({
  editCell: {
    cursor: 'pointer',
    color: '#4F46E5 !important',
  },
  userName: {
    fontSize: 14,
  },
  email: {
    color: '#6B7280 !important',
    fontSize: 14,
  },
}));

const Root = styled('div')(
  () => `
    table {
      font-size: 14px;
      border-collapse: collapse;
      width: 100%;
      box-sizing: border-box;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
      border-radius: 8px;
    }
  
    td,
    th {
      border: 1px solid #E5E7EB;
      text-align: left;
      padding: 6px;
    }
  
    td {
      padding: 16px 24px;
      font-size: 14px;
      color: #111827;
      font-weight: 500;
    }
  
    th {
      background-color: #F9FAFB;
      color: #6B7280;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      font-size: 12px;
      line-height: 16px;
      font-weight: 500;
      padding: 12px 24px;
    }
    `,
);

interface TableAvatarProps {
  rows: Array<unknown>;
  initialNumOfRows?: number;
  rowsPerPageOptions?: number[];
  labelRowsPerPage?: string;
  columnHeadings: string[];
  showPagination?: boolean;
  onEdit: (e: any) => void;
}

export default function TableAvatar(props: TableAvatarProps) {
  const classes = useStyles();
  const {
    rows,
    columnHeadings,
    initialNumOfRows = 5,
    rowsPerPageOptions = [5, 10, 25],
    labelRowsPerPage = 'Rows Per Page',
    showPagination = false,
    onEdit,
  } = props;

  let keyIndex = 0;
  const headings = columnHeadings.map((heading: string) => {
    keyIndex += 1;
    return (
      <th key={`${heading.toLowerCase().replace(' ', '')}${keyIndex}`}>
        {heading}
      </th>
    );
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(initialNumOfRows);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Root style={{ width: '100%' }}>
      <table aria-label="table">
        <thead>
          <tr>{headings}</tr>
        </thead>
        <tbody>
          {rows.map((row: any) => (
            <tr key={row.id}>
              <td role="gridcell">
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  <Avatar
                    alt={row.name}
                    imgSrc={row.img}
                    sx={{
                      marginRight: '16px',
                    }}
                  />
                  <Box>
                    <Typography className={classes.userName}>
                      {row.name}
                    </Typography>
                    <Typography className={classes.email}>
                      {row.email}
                    </Typography>
                  </Box>
                </Box>
              </td>
              <td role="gridcell">{row.dateJoined}</td>
              <td role="gridcell">
                {row.status ? (
                  <Pill label="Active" color="success" variant="filled" />
                ) : (
                  <Pill label="In-Active" color="error" variant="filled" />
                )}
              </td>
              <td
                style={{ textTransform: 'capitalize', color: '#6B7280' }}
                role="gridcell"
              >
                {row.role}
              </td>
              <td
                onClick={() => onEdit(row.id)}
                role="gridcell"
                className={classes.editCell}
              >
                Edit
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length > 5 && showPagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          labelRowsPerPage={labelRowsPerPage}
          colSpan={4}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Root>
  );
}
