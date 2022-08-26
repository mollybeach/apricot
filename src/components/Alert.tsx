import * as React from 'react';
import {
  Stack,
  Button,
  ButtonProps,
  Snackbar,
  SnackbarProps,
  AlertColor,
  AlertProps as MuiAlertProps,
  styled,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { fontSize } from '../utils/global';
import { SvgCheckIcon, SvgCrossIcon, SvgWhiteCrossIcon } from '../utils/svg';

const CustomSnackbar = styled((props: SnackbarProps) => (
  <Snackbar {...props} />
))(({ theme }) => ({
  '& .MuiAlert-root': {
    backgroundColor: '#ECFDF5',
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: fontSize[14],
    color: '#065F46',
    borderRadius: 6,
  },
  '& .MuiAlert-filledError': {
    backgroundColor: '#d32f2f !important',
    color: 'white',
  },
}));

const CloseButton = styled((props: ButtonProps) => (
  <Button {...props} disableRipple />
))(() => ({
  paddingRight: 0,
  marginRight: 0,
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const CustomAlert = React.forwardRef<HTMLDivElement, MuiAlertProps>(
  function Alert(props, ref) {
    return <MuiAlert ref={ref} variant="filled" {...props} />;
  },
);

type AlertProps = {
  message: string;
  severity?: 'success' | 'error' | 'info' | 'warning';
  iconMapping?: Partial<Record<AlertColor, React.ReactNode>>;
} & SnackbarProps;

export default function Alert(props: AlertProps) {
  const {
    open,
    message,
    onClose,
    severity = 'success',
    anchorOrigin = {
      vertical: 'top',
      horizontal: 'center',
    },
    iconMapping = {
      success: <SvgCheckIcon fontSize="inherit" style={{ marginTop: 3 }} />,
    },
  } = props;

  return (
    <Stack>
      <CustomSnackbar
        open={open}
        onClose={onClose}
        anchorOrigin={anchorOrigin}
        {...props}
      >
        <CustomAlert
          action={
            // @ts-ignore
            <CloseButton onClick={onClose} disableRipple>
              {severity === 'success' ? (
                <SvgCrossIcon style={{ marginTop: 2 }} />
              ) : (
                <SvgWhiteCrossIcon style={{ marginTop: 2 }} />
              )}
            </CloseButton>
          }
          severity={severity}
          iconMapping={iconMapping}
        >
          {message}
        </CustomAlert>
      </CustomSnackbar>
    </Stack>
  );
}
