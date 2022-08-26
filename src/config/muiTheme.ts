import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 800,
    h1: {
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '20px',
      lineHeight: '32px',
      fontWeight: 500,
    },
    h3: {
      fontSize: '18px',
      lineHeight: '27px',
      fontWeight: 500,
    },
    h4: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 500,
    },
    h5: {
      fontSize: '14px',
      lineHeight: '21px',
      fontWeight: 500,
    },
    h6: {
      fontSize: '12px',
      lineHeight: '18px',
      fontWeight: 500,
    },
    body1: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 500,
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        standard: {
          color: '#374151',
          fontSize: '14px',
          lineHeight: '21px',
          fontWeight: 500,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          padding: '0px !important',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          borderRadius: 6,
          padding: '9px 13px 9px 13px',
          border: '1px solid #D1D5DB',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
          backgroundColor: '#FFFFFF',
          '&::placeholder': {
            fontSize: '14px',
            lineHeight: '21px',
            color: '#6B7280',
          },
        },
        notchedOutline: {
          borderColor: '#D1D5DB !important',
        },
        multiline: {
          padding: '0px',
          '&::placeholder': {
            fontSize: '14px',
            lineHeight: '21px',
            color: '#6B7280',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {},
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        li: {
          textTransform: 'uppercase',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.05em',
          color: '#000000',
        },
        separator: {
          fontSize: '12px',
          fontWeight: 500,
          color: '#000000',
        },
      },
    },
    MuiChip: {
      variants: [
        {
          props: { color: 'success', variant: 'filled' },
          style: {
            backgroundColor: '#D1FAE5',
            borderRadius: 10,
            padding: '2px 10px',
            color: '#065F46',
            fontSize: '12px',
            textAlign: 'center',
            fontWeight: 500,
          },
        },
        {
          props: { color: 'default', variant: 'outlined' },
          style: {
            backgroundColor: '#FFFFFF',
            border: '1px solid #D1D5DB',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
            borderRadius: 100,
            padding: '9px 17px;',
            color: '#374151',
            fontSize: '14px',
            textAlign: 'center',
            fontWeight: 500,
          },
        },
        {
          props: { color: 'error', variant: 'filled' },
          style: {
            backgroundColor: '#E54646',
            border: '1px solid #D1D5DB',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
            borderRadius: 6,
            padding: '9px 17px;',
            color: '#FFFFFF',
            fontSize: '14px',
            textAlign: 'center',
            fontWeight: 500,
          },
        },
      ],
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '14px',
          fontWeight: 500,
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { color: 'primary', variant: 'contained' },
          style: {
            backgroundColor: '#4F46E5',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
            borderRadius: '6px',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: '500',
            textTransform: 'capitalize',
            padding: '9px 17px',
            '&:hover': {
              backgroundColor: '#4F46E5',
              borderColor: '#0062cc',
              boxShadow: 'none',
            },
            '&:active': {
              boxShadow: 'none',
              backgroundColor: '#4F46E5',
              borderColor: '#4F46E5',
            },
            '&:focus': {
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
            },
          },
        },
        {
          props: {
            color: 'primary',
            variant: 'outlined',
          },
          style: {
            color: '#374151',
            border: '1px solid #D1D5DB',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
            borderRadius: '6px',
            textTransform: 'capitalize',
            '&:hover': {
              backgroundColor: '#D1D5DB',
              borderColor: '#D1D5DB',
            },
          },
        },
        {
          props: { color: 'secondary', variant: 'outlined' },
          style: {
            backgroundColor: '#E0E7FF',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
            borderRadius: '6px',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 500,
            textTransform: 'capitalize',
            color: '#4338CA',
            borderColor: '#E0E7FF',
            padding: '9px 17px',
            '&:hover': {
              backgroundColor: '#E0E7FF',
              borderColor: '#E0E7FF',
              boxShadow: 'none',
            },
            '&:active': {
              boxShadow: 'none',
              backgroundColor: '#E0E7FF',
              borderColor: '#E0E7FF',
            },
            '&:focus': {
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
            },
          },
        },
        {
          props: { color: 'info', variant: 'outlined' },
          style: {
            backgroundColor: '#FFFFFF',
            border: '1px solid #D1D5DB',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
            borderRadius: '6px',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 500,
            textTransform: 'capitalize',
            color: '#374151',
            borderColor: '#D1D5DB',
            padding: '9px 17px',
            '&:hover': {
              backgroundColor: '#D1D5DB',
              borderColor: '#FFFFFF',
              boxShadow: 'none',
            },
            '&:active': {
              boxShadow: 'none',
              backgroundColor: '#FFFFFF',
              borderColor: '#FFFFFF',
            },
            '&:focus': {
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
            },
          },
        },
        {
          props: { color: 'info', variant: 'text' },
          style: {
            color: '#4F46E5',
          },
        },
      ],
    },
  },
});
