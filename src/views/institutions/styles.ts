import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  bodyBackground: {
    backgroundColor: '#E5E5E5',
  },
  content: {
    padding: '56px',
  },
  subContent: {
    padding: '32px',
  },
  mt: {
    marginTop: '16px',
  },
  container: {
    padding: '36px',
    justifyContent: 'center',
  },
  accountInfo: {
    padding: '48px 24px 24px 24px',
  },
  description: {
    width: '100%',
    height: '133px',
  },
  item: {
    paddingTop: 0,
  },
}));

export { useStyles };
