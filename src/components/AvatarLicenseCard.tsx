import React from 'react';
import { Box, Typography } from '@mui/material';
import Avatar from './Avatar';
import { Pill } from './index';
import { Link } from 'react-router-dom';

type AvatarLicenseCardProps = {
  title: string;
  isLicenseHolder: boolean;
  isClaimed: boolean;
};

export default function AvatarLicenseCard({
  title,
  isLicenseHolder,
  isClaimed,
}: AvatarLicenseCardProps) {
  return (
    <Box
      sx={{
        padding: '24px',
        boxShadow:
          '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
        borderRadius: '8px',
        marginBottom: '20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Avatar alt="avi" imgSrc="" sx={{ height: '80px', width: '80px' }} />
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Link to={'/musicals/1/productions'}>
            <Typography variant="h1">{title}</Typography>
          </Link>
          <Typography variant="h5" alignItems="flex-end">
            {isLicenseHolder ? 'License Holder' : 'Not License Holder'}
          </Typography>
        </Box>
        <Pill
          label={isClaimed ? 'Claimed' : 'Unclaimed'}
          color="default"
          variant="outlined"
        />
      </Box>
    </Box>
  );
}
