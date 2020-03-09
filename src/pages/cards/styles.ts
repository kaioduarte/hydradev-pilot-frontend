import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  searchBar: {
    margin: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
  },
  media: {
    height: 140,
    position: 'relative',
  },
  cardsContainer: {
    margin: theme.spacing(2, 0),
  },
  cardAttributes: {
    position: 'absolute',
    right: 10,
    bottom: 40,
  },
  cardContent: {
    maxHeight: 200,
  },
  cardActionsRoot: {
    justifyContent: 'flex-end',
  },
}));
