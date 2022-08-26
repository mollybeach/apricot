import React from 'react';
import { Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from './Button';
import Pill from './Pill';

const updateStyles = makeStyles(() => ({
  align: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

type AvatarStatsCardProps = {
  title: string;
  stats: string[];
  isLicenseHolder?: boolean;
  isClaimed?: boolean;
  centered?: boolean;
};

export default function AvatarStatsCard({
  title,
  stats,
  isLicenseHolder,
  isClaimed,
  centered,
}: AvatarStatsCardProps) {
  const classes = updateStyles();
  return (
    <Box
      sx={{
        marginBottom: '41px',
        boxShadow:
          '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
        borderRadius: '8px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '24px',
        }}
        className={centered ? classes.align : ''}
      >
        <Box className={centered ? classes.align : ''}>
          <Typography
            variant="h1"
            sx={{
              mb: '15px',
            }}
          >
            {title}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            label="manage"
            sx={{ width: '166px' }}
          />
        </Box>
        {isLicenseHolder && (
          <Box
            display="flex"
            alignContent="flex-end"
            alignItems="baseline"
            gap={'20px'}
          >
            <Typography variant="h5" alignItems="flex-end">
              {isLicenseHolder ? 'License Holder' : 'Not License Holder'}
            </Typography>
            <Pill
              label={isClaimed ? 'Claimed' : 'Unclaimed'}
              color="default"
              variant="outlined"
            />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          backgroundColor: '#F9FAFB',
          padding: '20px 0',
        }}
      >
        {stats.map((value, index) => {
          return (
            <Box key={index}>
              <Typography variant={'h5'}>{value}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
