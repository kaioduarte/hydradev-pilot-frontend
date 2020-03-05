import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      borderRadius: '4px',
      '& $listItemIcon': {
        color: theme.palette.primary.main,
        marginLeft: '-4px',
      },
    },
    '& + &': {
      marginTop: theme.spacing(1),
    },
  },
  itemActiveItem: {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    borderRadius: '4px',
    backgroundColor: theme.palette.primary.light,
    '& $listItemText': {
      color: theme.palette.text.primary,
    },
    '& $listItemIcon': {
      color: theme.palette.primary.main,
      marginLeft: '-4px',
    },
  },
  listItemIcon: {
    marginRight: 0,
  },
  listItemText: {
    fontWeight: 500,
    color: theme.palette.text.secondary,
  },
}));
