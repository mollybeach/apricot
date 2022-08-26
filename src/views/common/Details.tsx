import React from 'react';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface DetailsProps {
  title: string;
  children: React.ReactNode;
  onAddButton: () => void;
}

export default function Details(props: DetailsProps) {
  const { title, children, onAddButton } = props;
  return (
    <Box>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2">{title}</Typography>
        <IconButton color="primary" component="div" onClick={onAddButton}>
          <AddIcon />
        </IconButton>
      </Box>
      <Divider style={{ marginBottom: '24px' }} />
      <Box>{children}</Box>
    </Box>
  );
}
