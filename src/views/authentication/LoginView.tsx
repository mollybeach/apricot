import React, { useEffect } from 'react';
import { Box, Divider, Typography, Stack, Grid } from '@mui/material';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { LoginBody } from '../../utils/AuthProvider/auth.types';

const LoginSchema = yup.object().shape({
  email: yup.string().email('Invalid Email').required('Email is required'),
  password: yup.string().min(5).max(100).required('Password is required'),
});

export default function LoginView() {
  const { isAuthenticated, login, errorMessage } = useAuth();
  const navigate = useNavigate();
  const methods = useForm<LoginBody>({
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
    resolver: yupResolver(LoginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/plays');
    }
  });

  const { handleSubmit, control } = methods;
  const onSubmit = async (data: LoginBody) => {
    try {
      await login(data.email, data.password);
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
          maxWidth: '1040px',
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
            <Typography variant="h1">Institution Login</Typography>
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
                  label="Password"
                  type={'password'}
                  fullWidth={true}
                  placeholder="Enter Your Password"
                  control={control}
                  name="password"
                />
              </Box>
            </form>
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Stack>
                  <Button
                    label="Login"
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                  />
                </Stack>
                <Stack>
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        marginTop: '20px',
                      }}
                    >
                      <Stack spacing={3}>
                        <Link to={'/reset-password'}>
                          <Button
                            label="Forgot Password"
                            variant="outlined"
                            color="info"
                            sx={{ marginBottom: '30px' }}
                          />
                        </Link>
                        <Typography variant={'body1'}>
                          Don&apos;t have an account?
                        </Typography>
                        <Button
                          label="Request Access"
                          variant="outlined"
                          color="secondary"
                        />
                      </Stack>
                    </Box>
                  </Box>
                </Stack>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
