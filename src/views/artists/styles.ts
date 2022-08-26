import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  content: {
    padding: '56px',
  },
  subContent: {
    padding: '32px',
  },
  mt: {
    marginTop: '16px',
  },
  bodyBackground: {
    backgroundColor: '#E5E5E5',
  },
  container: {
    padding: '32px',
    display: 'flex',
    justifyContent: 'center',
  },
  accountInfo: {
    padding: '24px 24px 24px 24px',
  },
  description: {
    width: '100%',
    height: 133,
  },
  item: {
    paddingTop: 0,
  },
}));

export { useStyles };
