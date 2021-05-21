import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import Scan from './Scan.jsx'



function SimpleDialog(props) {

  const { onClose, selectedValue, open } = props; // declaramos los props

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleScan = (e) => {
    props.handleButton(e)
  }

  return ( // Al realizar el click al boton
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">SCANea</DialogTitle>
      <Scan handleScan={e=> handleScan(e)}/>            
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = [];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>      
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        echalee
      </Button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}
