import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DropDownMenu } from './index';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

const MuiTabs = styled(Tabs)({
  borderBottom: '1px solid #E5E7EB',
  '& .MuiTabs-indicator': {
    backgroundColor: '#6366F1',
  },
  '& .MuiTabs-flexContainer': {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #E5E7EB',
  },
});

const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'capitalize',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: '#6B7280',
  '&:hover': {
    color: '#111827',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#111827',
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));

interface StyledTabProps {
  label: string;
  to: string;
  component: any;
  onClick?: () => void;
}

export interface RouteItem {
  slug: string;
  label: string;
}

type NavTabsProps = {
  openRoutes: RouteItem[];
  protectedRoutes: RouteItem[];
  create?: boolean;
};

export default function NavTabs({
  openRoutes,
  protectedRoutes,
  create,
}: NavTabsProps) {
  const { isAuthenticated } = useAuth();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1] || null;

  useEffect(() => {
    setValue(
      (isAuthenticated ? protectedRoutes : openRoutes).findIndex(
        (route) => route.slug === currentPath,
      ),
    );
  }, [location.pathname]);

  const tabs = (isAuthenticated ? protectedRoutes : openRoutes).map(
    (item: RouteItem, index: number) => {
      return (
        <AntTab
          label={item.label}
          key={index}
          component={Link}
          to={`/${item.slug}`}
          onClick={() => setValue(index)}
        />
      );
    },
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ backgroundColor: '#fff' }}>
        <MuiTabs value={value} onChange={handleChange} aria-label="ant example">
          {tabs}
          <Box
            sx={{
              backgroundColor: '#fff',
              ml: 'auto',
              mr: 2,
            }}
          >
            {create && (
              <DropDownMenu
                label="Create New"
                id="create-new"
                options={[
                  {
                    label: 'Artist',
                    id: 'create-artists',
                    onClick: () => navigate('/artists/create'),
                  },
                  {
                    label: 'Plays',
                    id: 'create-plays',
                    onClick: () => navigate('/plays/create'),
                  },
                  {
                    label: 'Studio',
                    id: 'create-studios',
                    onClick: () => navigate('/studios/create'),
                  },
                  {
                    label: 'Institution',
                    id: 'create-institution',
                    onClick: () => navigate('/institutions/create'),
                  },
                  {
                    label: 'Production',
                    id: 'create-productions',
                    onClick: () => navigate('/productions/create'),
                  },
                  {
                    label: 'Venue',
                    id: 'create-venues',
                    onClick: () => navigate('/venues/create'),
                  },
                ]}
              />
            )}
          </Box>
        </MuiTabs>
      </Box>
    </Box>
  );
}
