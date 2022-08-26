import React, { useEffect } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  SetupAccountBody,
  LoginBody,
} from '../../utils/AuthProvider/auth.types';
import { useSetupAccount } from '../../api/auth';

const SetupAccountSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email('Invalid Email').required('Email is required'),
  newPassword: yup.string().min(8).max(100).required('Password is required'),
});

export default function SetupAccountView() {
  const { isAuthenticated, errorMessage, setupAccount } = useAuth();
  const navigate = useNavigate();
  const methods = useForm<SetupAccountBody>({
    defaultValues: { name: '', email: '', newPassword: '' },
    mode: 'onSubmit',
    resolver: yupResolver(SetupAccountSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/plays');
    }
  });

  const { handleSubmit, control } = methods;
  const onSubmit = async (data: SetupAccountBody) => {
    try {
      await setupAccount(data);
      navigate('/plays');
    } catch (e) {
      console.log('erroring');
      console.error(e);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#e5e5e5',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          maxWidth: '1440px',
          margin: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 0',
          }}
        >
          <Avatar imgSrc={'./logoTemp.png'} alt={'avatar'} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              padding: '24px',
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              minWidth: { xs: '90%', md: '70%', lg: '50%' },
            }}
          >
            <Typography variant="h1">Account Setup</Typography>
            <Divider
              sx={{
                margin: '12px auto 24px',
              }}
            />
            <Box
              sx={{
                textAlign: 'center',
                color: 'red',
              }}
            >
              <Typography variant={'body2'}>{errorMessage}</Typography>
            </Box>
            <form>
              <Box
                sx={{
                  marginBottom: '24px',
                }}
              >
                <TextField
                  label="Name"
                  fullWidth={true}
                  placeholder="John Smith"
                  name="name"
                  control={control}
                />
              </Box>
              <Box
                sx={{
                  marginBottom: '24px',
                }}
              >
                <TextField
                  label="Email"
                  fullWidth={true}
                  placeholder="sample@sample.com"
                  name="email"
                  control={control}
                />
              </Box>
              <Box
                sx={{
                  marginBottom: '48px',
                }}
              >
                <TextField
                  label="New Password"
                  type={'password'}
                  fullWidth={true}
                  placeholder="Enter a New Password"
                  control={control}
                  name="newPassword"
                />
              </Box>
            </form>
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                }}
              >
                <Button
                  label="Save"
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
