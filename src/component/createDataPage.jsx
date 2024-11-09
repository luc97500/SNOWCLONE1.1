import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateDataPage({open,onClose}) {

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do You Want To Create New Data in Data Table ? "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          You Are on Right Place !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>Create Multiple Auto Data on single click (limit ~ 20/Click)</Button>
          <Button variant="outlined" onClick={onClose} autoFocus>
            Create Single Data
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
