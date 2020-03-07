import React from 'react';

import Button from '@material-ui/core/Button';
import MuiDialogActions from '@material-ui/core/DialogActions';

type Props = {
  handleClose: () => void;
};

function DialogActions({ handleClose }: Props) {
  return (
    <MuiDialogActions>
      <Button onClick={handleClose} color="inherit">
        Cancel
      </Button>
      <Button type="submit" color="primary">
        Confirm
      </Button>
    </MuiDialogActions>
  );
}

export default DialogActions;
