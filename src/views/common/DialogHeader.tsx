import React from 'react';
import { Box, createStyles, Grid, Typography } from '@mui/material';
import { Button, Paper } from '../../components';
import { makeStyles } from '@mui/styles';

interface DialogHeaderProps {
  title: string;
  secondaryBtnLabel?: string;
  primaryBtnLabel?: string;
  handleSave?: any;
  cancel?: any;
  handleDelete?: any;
}

const useStyles = makeStyles(() => ({
  container: {
    padding: 32,
    display: 'flex',
    justifyContent: 'space-between',
  },
  actionBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  paper: {
    borderRadius: 0,
  },
}));

export default function DialogHeader(props: DialogHeaderProps) {
  const {
    title,
    secondaryBtnLabel = 'Cancel',
    primaryBtnLabel = 'Save',
    handleSave,
    cancel,
    handleDelete,
  } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container className={classes.container}>
        <Typography variant="h1">{title}</Typography>
        <Box className={classes.actionBtn}>
          {handleDelete ? (
            <Button
              variant="contained"
              color="error"
              label={'Delete'}
              onClick={() => handleDelete()}
            />
          ) : null}
          <Button
            variant="outlined"
            color="secondary"
            label={secondaryBtnLabel}
            onClick={() => cancel()}
          />
          <Button
            variant="contained"
            color="primary"
            label={primaryBtnLabel}
            onClick={() => handleSave()}
          />
        </Box>
      </Grid>
    </Paper>
  );
}
