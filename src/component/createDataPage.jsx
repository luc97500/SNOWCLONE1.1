import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function CreateDataPage({open,onClose}) {

  const token = localStorage.getItem('token'); // Your Bearer token

  const createData = async () =>{
    try {
      const url = 'http://localhost:5000/api/datatable/create'; 
      const response = await axios.post(url,
        {count : 20},
        {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        }
      });
      if (response.status === 201) {
        Swal.fire({
          title: `Hurry!`,
          text: "Data Inserted Sucessfully!",
          icon: "success",
        });
      }
    } catch (error) {
      if(error.status === 401){
        Swal.fire({
          title: "Error Occured !",
          text: "Data Not Inserted ! Try Again!",
          icon: "error",
        });
      }else if(error.status === 404){
        Swal.fire({
          title: "Error Occured !",
          text: "Data Not Inserted ! Try Again ! Technical Issue !",
          icon: "error",
        });
      }
    }
    onClose()
  }

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
          <Button variant="contained" onClick={createData}>Multiple Auto-Data on single Click ! (limit ~ 20 data/Click)</Button>
          {/* <Button variant="contained" onClick={onClose} autoFocus>
            Create Single Data
          </Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
