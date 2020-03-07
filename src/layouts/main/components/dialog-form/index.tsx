import React, { forwardRef } from 'react';

import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';

import { MdClose as CloseIcon } from 'react-icons/md';

import { useStyles } from './styles';

type Props = {
  children: any;
  handleClose: () => void;
  showDialog: boolean;
  title: string;
};

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

function DialogForm({ children, handleClose, showDialog, title }: Props) {
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={isMobile}
      classes={{ paperFullScreen: classes.dialog }}
      open={showDialog}
      onClose={handleClose}
      title={title}
      TransitionComponent={Transition as any}
    >
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5">{title}</Typography>

        <IconButton aria-label="Close" color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <div className={classes.content}>{children}</div>
    </Dialog>
  );
}

export default DialogForm;
