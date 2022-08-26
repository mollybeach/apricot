import * as React from 'react';
import Button from '@mui/material/Button';
import {
  styled,
  Dialog as MuiDialogBox,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';

const MuiDialog = styled(MuiDialogBox)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: 8,
    padding: '20px 16px 16px 16px',
    width: '100%',
  },
  '& .MuiDialogActions-root': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  '& .MuiDialogContent-root': {
    color: '#6B7280',
    textAlign: 'center',
    padding: '20px 8px',
  },
}));

const MuiDialogTitle = styled(DialogTitle)(() => ({
  display: 'flex',
  justifyContent: 'center',
  fontSize: 18,
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const CustomDialogTitle = (props: DialogTitleProps) => {
  const { children, ...other } = props;

  return (
    <MuiDialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </MuiDialogTitle>
  );
};

type DilogProps = {
  isOpen: boolean;
  handleClose: () => void;
  primaryBtnLabel: string;
  secondaryBtnLabel?: string;
  handlePrimaryBtn: () => void;
  handleSecondaryBtn?: () => void;
  primaryVariantColor:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  secondaryVariantColor:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  content?: string;
  title: string;
  isFullScreen?: boolean;
  primaryVariant: 'contained' | 'outlined' | 'text';
  secondaryVariant: 'contained' | 'outlined' | 'text';
  children?: React.ReactNode;
};

export default function Dialog(props: DilogProps) {
  const {
    isOpen = false,
    handleClose,
    primaryBtnLabel,
    secondaryBtnLabel,
    handlePrimaryBtn,
    handleSecondaryBtn,
    primaryVariantColor,
    secondaryVariantColor,
    primaryVariant,
    secondaryVariant,
    isFullScreen,
    content,
    title,
    children,
  } = props;

  return (
    <div>
      <MuiDialog
        onClose={() => handleClose()}
        aria-labelledby="dialog-title"
        open={isOpen}
        fullScreen={isFullScreen}
        maxWidth={isFullScreen ? 'xl' : 'xs'}
      >
        <CustomDialogTitle id="dialog-title" onClose={() => handleClose()}>
          {title}
        </CustomDialogTitle>
        <DialogContent>
          {content && (
            <Typography gutterBottom variant="h5">
              {content}
            </Typography>
          )}
          {children}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handlePrimaryBtn()}
            variant={primaryVariant}
            color={primaryVariantColor}
            fullWidth
          >
            {primaryBtnLabel}
          </Button>
        </DialogActions>
        {secondaryBtnLabel && handleSecondaryBtn && secondaryVariantColor && (
          <DialogActions>
            <Button
              onClick={() => handleSecondaryBtn()}
              variant={secondaryVariant}
              fullWidth
              color={secondaryVariantColor}
            >
              {secondaryBtnLabel}
            </Button>
          </DialogActions>
        )}
      </MuiDialog>
    </div>
  );
}
