import * as React from 'react';
import { Box, Typography } from '@mui/material';
import Avatar from './Avatar';
import DropDownMenu from './DropDown';
import Button from './Button';

interface ProfileNavProps {
  name: string;
  userRole: string[];
  buttonNames: string[];
  dropDownNames: string[];
}
export default function ProfileNav(props: ProfileNavProps) {
  const { name, userRole, buttonNames, dropDownNames } = props;
  const sampleImg =
    'https://s3-alpha-sig.figma.com/img/0f9b/81fa/21460d39cd98ccca0d3fa906d5718aa3?Expires=1645401600&Signature=bXJW4mJw-J7Q7xSlPkEeYtkosEpbJT08Swr3-v3O0gSIkPmADy42IsdJ9d2ksDjDzAYfeMEtQTQNpr-Gd1mxWuh7jUVRKTpMeKL48zmKOjjSZnSJiMv6tLhYabYSjylrKjWkQ4snTBI-SrF5brJ-akx8fD4TofAh8b~pP9o0hDD3KXfVPnCI1-0ur5LjnRmbW4uu1v3TWtNgaAMYMN47WawJrLsaQf2mW7twvpoKQfMnRFxdkcFjXQQoEOAIAKfZtdl668HfftC3S~pxwRaxBudxbxor859U4nJLtmaxKV9UszcgE7f8yfyvI5-Dj8VvfepPRGxn53jaYUFgxguoIw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          marginBottom: '24px',
        }}
      >
        <Avatar imgSrc={sampleImg} alt="avatar" />
        <Box
          sx={{
            marginBottom: '24px',
          }}
        >
          <Typography variant="h1">{name}</Typography>
          {userRole.map((role, index) => (
            <Typography
              key={index}
              variant="h5"
              sx={{
                color: 'text.secondary',
              }}
            >
              {role}
            </Typography>
          ))}
        </Box>
      </Box>
      <Box>
        {buttonNames.map((name, index) => (
          <Button
            key={index}
            color="primary"
            variant="contained"
            label={name}
            sx={{
              display: 'block',
              width: '100%',
              marginBottom: '16px',
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
                label: 'User',
                id: '1',
                onClick: () => console.log('User'),
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
              width: '100%',
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
