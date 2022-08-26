import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../../config/http-common';

interface ResetPasswordConfirm {
  confirmationCode: string;
  email: string;
  newPassword: string;
  newPasswordConfirm: string;
}

const PasswordResetConfirmSchema = yup.object().shape({
  confirmationCode: yup.string().required(),
  email: yup.string().email('Invalid Email').required('Email is required'),
  newPassword: yup.string().min(6).max(50),
  newPasswordConfirm: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], "Passwords don't match")
    .required(),
});

export default function ResetPasswordConfirmView() {
  const { errorMessage } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const methods = useForm<ResetPasswordConfirm>({
    defaultValues: {
      confirmationCode: '',
      email: searchParams.get('email'),
      newPassword: '',
      newPasswordConfirm: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(PasswordResetConfirmSchema),
  });

  const { handleSubmit, control } = methods;
  const onSubmit = async (data: ResetPasswordConfirm) => {
    try {
      console.log(data);
      await axios.post('/auth/forgot-password', {
        email: data.email,
        newPassword: data.newPassword,
        confirmationCode: data.confirmationCode,
      });
      navigate('/login');
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
                  label="Code"
                  fullWidth={true}
                  name="confirmationCode"
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
                  placeholder="sample@email.com"
                  name="email"
                  control={control}
                />
              </Box>
              <Box
                sx={{
                  marginBottom: '24px',
                }}
              >
                <TextField
                  label="New Password"
                  fullWidth={true}
                  name="newPassword"
                  control={control}
                />
              </Box>
              <Box
                sx={{
                  marginBottom: '24px',
                }}
              >
                <TextField
                  label="New Password Confirm"
                  fullWidth={true}
                  name="newPasswordConfirm"
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
                  label="Confirm Password Reset"
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
