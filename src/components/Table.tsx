import * as React from 'react';
import { Button, TablePagination, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Avatar from './Avatar';
import Pill from './Pill';
import PhotoSquare from './PhotoSquare';

const useStyles = makeStyles(() => ({
  tableStyles: {
    'overflow-x': 'auto',
    '& table': {
      fontSize: '14px',
      borderCollapse: 'collapse',
      width: '100%',
      boxSizing: 'border-box',
      boxShadow:
        '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
      marginBottom: '54px',
      borderRadius: '8px',
    },
    '& td, th': {
      textAlign: 'left',
      padding: '6px',
    },
    '& td': {
      padding: '16px 24px',
      fontSize: '14px',
      color: '#111827',
      fontWeight: '500',
      justifyContent: 'center',
      borderBottom: '1px solid #E5E7EB',
    },
    '& th': {
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
    '& tr:last-child': {
      borderBottom: 'none',
    },
    avatarTd: {
      border: 'white',
    },
  },
  horizontalTable: {
    '& tr': {
      border: 'none',
    },

    '& th': {
      border: 'none',
      backgroundColor: 'transparent',
      color: '#6B7280',
      width: '210px',
      textTransform: 'none',
      padding: '16px 24px',
    },
    '& td': {
      border: 'none',
    },
  },
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
  role: {
    color: '#6B7280 !important',
    fontSize: 14,
  },
  tableTitle: {
    fontWeight: '700',
    marginBottom: '20px',
  },
  tableBorderDiv: {
    borderBottom: '5px solid rgba(209,213, 219,0.5)',
    marginBottom: '20px',
  },
  tableButton: {
    border: 'none',
  },
  avatarTd: {
    width: '400px',
  },
  avatarDiv: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '16px',
  },
  hasEdit: {
    '& th:nth-last-child(2)': {
      borderRight: '1px #F9FAFB solid',
      width: '15%',
    },
  },
  firstDivLarger: {
    '& td:nth-child(1)': {
      width: '75%',
    },
  },
  firstDivSize: {
    '& td:nth-child(1)': {
      width: '43%',
    },
  },
}));
interface TableProps {
  rows: Array<any>;
  initialNumOfRows?: number;
  rowsPerPageOptions?: number[];
  labelRowsPerPage?: string;
  title?: string;
  borderDiv?: boolean;
  columnHeadings?: string[];
  rowHeadings?: string[];
  showPagination?: boolean;
  hasAvatar?: boolean;
  onEdit?: (tableId: any) => void;
}

export default function Table(props: TableProps) {
  const classes = useStyles();
  const {
    rows,
    title,
    borderDiv,
    columnHeadings,
    rowHeadings,
    initialNumOfRows = 5,
    rowsPerPageOptions = [5, 10, 25],
    labelRowsPerPage = 'Rows Per Page',
    showPagination = false,
    onEdit,
    hasAvatar,
  } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(initialNumOfRows);
  const tableHeadings = columnHeadings || rowHeadings || [];
  const numOfRows =
    tableHeadings.length -
    (tableHeadings.includes('id') ? 1 : 0) -
    (hasAvatar ? 1 : 0) -
    (tableHeadings.includes('email') ? 1 : 0);
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

  const rowsReordered: any[] = [];
  if (tableHeadings.includes('NAME')) {
    rows.forEach((row: any) => {
      const saveId = row.id;
      const saveName = row.name;
      const { id, name, ...restObject } = row;
      console.log(id, name, restObject);
      row = { id: saveId, name: saveName, ...row };
      rowsReordered.push(row);
    });
    for (let i = 0; i < rows.length; i++) {
      rows[i] = rowsReordered[i];
    }
  }

  let keyIndex = 0;
  const headings = tableHeadings.map((heading: string) => {
    keyIndex += 1;
    return (
      <th key={`${heading.toLowerCase().replace(' ', '')}${keyIndex}`}>
        {heading}
      </th>
    );
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editButton = (tableId: any) => {
    if (onEdit) {
      return (
        <td className={classes.tableButton}>
          <Button
            onClick={() => onEdit(tableId)}
            role="gridcell"
            className={classes.editCell}
            color="secondary"
            variant="outlined"
          >
            Edit
          </Button>
        </td>
      );
    }
  };
  const cells = (
    rowsPerPage > 0
      ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : rows
  ).map((row: any) => {
    keyIndex += 1;
    const customizeRow = Object.keys(row).map((element: any, index: number) => {
      keyIndex += 1;
      const customizeTd = (element: any) => {
        switch (element) {
          case 'id':
            break;
          case 'name':
            return (
              <>
                {hasAvatar ? (
                  ''
                ) : (
                  <td key={`${element}{${keyIndex}`}>
                    <Typography className={classes.userName}>
                      {row.name}
                    </Typography>
                  </td>
                )}
              </>
            );
          case 'img':
            return (
              <>
                <td
                  className={
                    rowHeadings
                      ? classes.horizontalTable + classes.avatarTd
                      : classes.avatarTd
                  }
                  key={`${element}{${keyIndex}`}
                >
                  <div className={classes.avatarDiv}>
                    <Box width="60px">
                      <Avatar
                        imgSrc={row[element]}
                        alt={`${element}${keyIndex}`}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography className={classes.userName}>
                        {row.name}
                      </Typography>
                      <Typography className={classes.email}>
                        {row.email}
                      </Typography>
                    </Box>
                  </div>
                </td>
              </>
            );
          case 'email':
            break;
          case 'role':
            return (
              <td
                className={rowHeadings ? classes.horizontalTable : ''}
                key={`${element}${keyIndex}`}
              >
                <Typography className={classes.role}>{row.role}</Typography>
              </td>
            );
          case 'photo':
            return (
              <td
                className={rowHeadings ? classes.horizontalTable : ''}
                key={`${element}${keyIndex}`}
              >
                <PhotoSquare
                  imgSrc={row[element]}
                  alt={`${element}${keyIndex}`}
                  style={{
                    width: '200px',
                    height: '109px',
                    borderRadius: '8px',
                  }}
                />
              </td>
            );
          case 'status':
            if (row.status == 'active') {
              return (
                <td
                  className={rowHeadings ? classes.horizontalTable : ''}
                  key={`${element}${keyIndex}`}
                >
                  <Pill label="Active" color="success" variant="filled" />
                </td>
              );
            } else {
              return (
                <td
                  className={rowHeadings ? classes.horizontalTable : ''}
                  key={`${element}${keyIndex}`}
                >
                  <Pill label="In-Active" color="error" variant="filled" />
                </td>
              );
            }
          case 'website':
            return (
              <td>
                <a target={'_blank'} href={row.website} rel="noreferrer">
                  {row.website}
                </a>
              </td>
            );
          default:
            return (
              <>
                <td
                  key={`${element}${keyIndex}`}
                  className={rowHeadings ? classes.horizontalTable : ''}
                >
                  {row[element]}
                </td>
              </>
            );
        }
      };
      return (
        <>
          {rowHeadings ? (
            <tr
              key={`${element}${keyIndex}`}
              className={rowHeadings ? classes.horizontalTable : ''}
            >
              <th className={rowHeadings ? classes.horizontalTable : ''}>
                {tableHeadings[index]}
              </th>
              {customizeTd(element)}
            </tr>
          ) : (
            <> {customizeTd(element)}</>
          )}
        </>
      );
    });
    return (
      <>
        {rowHeadings ? (
          <> {customizeRow} </>
        ) : (
          <tr key={`${row.id}${keyIndex}`}>
            {customizeRow}
            {editButton(row.id)}
          </tr>
        )}
      </>
    );
  });

  return (
    <div className={classes.tableStyles}>
      {title ? (
        <div className={classes.tableTitle}>
          <Typography variant="h4"> {title}</Typography>
        </div>
      ) : (
        ''
      )}
      {borderDiv && title ? (
        <Box className={classes.tableBorderDiv}>
          <Typography variant="h4"> {title}</Typography>
        </Box>
      ) : (
        ''
      )}
      <table aria-label="table">
        {columnHeadings ? (
          <thead
            className={
              numOfRows < 4 && hasAvatar
                ? classes.firstDivLarger
                : numOfRows > 4 && hasAvatar
                ? classes.firstDivSize
                : ''
            }
          >
            {headings}
          </thead>
        ) : (
          ''
        )}
        <tbody
          className={
            numOfRows < 4 && hasAvatar
              ? classes.firstDivLarger
              : classes.firstDivSize
          }
        >
          {cells}
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
    </div>
  );
}
