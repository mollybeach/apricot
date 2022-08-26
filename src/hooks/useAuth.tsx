import React from 'react';
import { AuthContext } from '../utils/AuthProvider/AuthProvider';

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('AuthContext must be within AuthProvider');
  }

  return context;
};
