import * as React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Breadcrumbs as MuiBreadcrumbs, Link, LinkProps } from '@mui/material';

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <LinkRouter
            color="inherit"
            to={to}
            key={to}
            underline="none"
            style={{ cursor: 'default' }}
          >
            {value}
          </LinkRouter>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {value}
          </LinkRouter>
        );
      })}
    </MuiBreadcrumbs>
  );
}
