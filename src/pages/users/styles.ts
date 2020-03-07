import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  searchBar: {
    margin: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
  },
  table: {
    minWidth: 650,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
}));
