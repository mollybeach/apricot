import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { createRetryer } from 'react-query/lib/core/retryer';
import axios from '../../config/http-common';

const PasswordResetSchema = yup.object().shape({
  email: yup.string().email('Invalid Email').required('Email is required'),
});

interface ResetPassword {
  email: string;
}

export default function ResetPasswordView() {
  const { login, errorMessage } = useAuth();
  const navigate = useNavigate();
  const methods = useForm<ResetPassword>({
    defaultValues: { email: '' },
    mode: 'onSubmit',
    resolver: yupResolver(PasswordResetSchema),
  });

  const { handleSubmit, control } = methods;
  const onSubmit = async (data: ResetPassword) => {
    try {
      console.log(data);
      await axios.post('/auth/forgot-password', { email: data.email });
      navigate(`/reset-password-confirm?email=${data.email}`);
    } catch (e) {
      console.log(e);
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
            <Typography variant="h1">Reset Password</Typography>
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
                  label="Email"
                  fullWidth={true}
                  placeholder="sample@email.com"
                  name="email"
                  control={control}
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
                  label="Send Reset Email"
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
