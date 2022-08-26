// Logout view component
import React, { FC, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

export const LogoutView: FC = () => {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  });
  return <div>Logging you out</div>;
};
