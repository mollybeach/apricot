import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Button, MenuItem, Menu, MenuProps } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: theme.spacing(1),
    borderRadius: 6,
    border: '1px solid #D1D5DB',
    boxSizing: 'border-box',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    backgroundColor: '#FFFFFF',
    '& .MuiMenuItem-root': {
      fontSize: 14,
      fontWeight: 500,
      color: '#6B7280',
    },
  },
}));

interface DropDownMenuOption {
  label: string;
  id: string;
  onClick: () => void;
}
type DropDownMenuProps = {
  label: string;
  id: string;
  options: DropDownMenuOption[];
  styles?: React.CSSProperties;
};

export default function DropDownMenu(props: DropDownMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id={props.id}
        aria-controls={open ? props.id : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        style={props.styles}
      >
        {props.label}
      </Button>
      <StyledMenu
        id={props.id}
        MenuListProps={{
          'aria-labelledby': 'dropdown-menu',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {props.options.map((item: DropDownMenuOption) => (
          <MenuItem
            onClick={() => {
              item.onClick();
              handleClose();
            }}
            key={item.id}
          >
            {item.label}
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
}
