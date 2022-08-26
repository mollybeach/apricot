import * as React from 'react';
import { Box, Typography } from '@mui/material';
import Avatar from './Avatar';
import DropDownMenu from './DropDown';
import Button from './Button';

interface IndividualNavProps {
  name: string;
  avatarImgSrc: string;
  userRole?: string;
  location?: string;
  startEndDate?: string;
  buttonNames: string[];
  dropDownNames: string[];
}
export default function IndividualNav(props: IndividualNavProps) {
  const {
    name,
    avatarImgSrc,
    userRole,
    location,
    startEndDate,
    buttonNames,
    dropDownNames,
  } = props;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          mb: 3,
        }}
      >
        <Avatar imgSrc={avatarImgSrc} alt="avatar" />
        <Box
          sx={{
            mb: 2,
          }}
        >
          <Typography variant="h1">{name}</Typography>
          {userRole && (
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
              }}
            >
              {userRole}
            </Typography>
          )}
          {location && (
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
              }}
            >
              {location}
            </Typography>
          )}
          {startEndDate && (
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
              }}
            >
              {startEndDate}
            </Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mx: { xs: 2, md: 'auto' },
        }}
      >
        {buttonNames.map((name, index) => (
          <Button
            key={index}
            color="primary"
            variant="contained"
            label={name}
            sx={{
              display: 'block',
              mb: 2,
              width: { xs: 'auto', md: '200px', lg: 'auto' },
            }}
          />
        ))}
        {dropDownNames.map((name, index) => (
          <DropDownMenu
            key={index}
            label={name}
            id="create-new"
            options={[
              {
                label: 'Artist',
                id: '1',
                onClick: () => console.log('Artist'),
              },
              {
                label: 'Musical',
                id: '2',
                onClick: () => console.log('Musical'),
              },
              {
                label: 'Studios',
                id: '3',
                onClick: () => console.log('Studios'),
              },
              {
                label: 'Productions',
                id: '4',
                onClick: () => console.log('Productions'),
              },
            ]}
            styles={{
              background: '#FFFFFF',
              border: '1px solid #D1D5DB',
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
              color: '#374151',
            }}
          />
        ))}
      </Box>
    </>
  );
}
