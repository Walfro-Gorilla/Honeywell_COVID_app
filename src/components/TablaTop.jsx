import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
});

function createData(fault, qty) {
  return { fault, qty};
}

const rows = [
  createData('Cubrebocas', 159),
  createData('Sana distancia', 237),
  createData('Manos', 262),
  createData('Temperatura', 305),
  createData('Facial', 356),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Faults</TableCell>
            <TableCell align="right">Qty</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.fault}>
              <TableCell component="th" scope="row">
                {row.fault}
              </TableCell>
              <TableCell align="right">{row.qty}</TableCell>            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
