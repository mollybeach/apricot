import NavTabs from '../NavTabs';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../types/User';

const openRoutes = [
  {
    slug: 'login',
    label: 'Login',
  },
];

const protectedRoutes = [
  {
    slug: 'plays',
    label: 'Plays',
  },
  {
    slug: 'studios',
    label: 'Studios',
  },
  {
    slug: 'institutions',
    label: 'Institutions',
  },
  {
    slug: 'productions',
    label: 'Productions',
  },
  {
    slug: 'artists',
    label: 'Artists',
  },
  {
    slug: 'venues',
    label: 'Venues',
  },
  {
    slug: 'logout',
    label: 'Logout',
  },
];

export default function Header() {
  const { isAuthenticated, user } = useAuth();
  return (
    <>
      <NavTabs
        openRoutes={openRoutes}
        protectedRoutes={protectedRoutes}
        create={
          isAuthenticated &&
          [Role.spectraOperator, Role.studioAdmin, Role.studioMember].includes(
            user?.primaryRole,
          )
        }
      />
    </>
  );
}
