import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button,IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {db} from '../firebase'



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 50,
  },
});

const deleteFault = async (id) => {

  try {
    await db.collection('faults').doc(id).delete()
    
    const faultsFiltered = db.collection('faults').doc().filter(row => row.id !==id)
    console.log(faultsFiltered)
    //setFaults(faultsFiltered)

  } catch (error) {
    console.log(error)    
  }
}


export default function CustomizedTables(props) {
  const classes = useStyles();


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Faults</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>          
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.nameFault}
              </StyledTableCell>
              {/* <StyledTableCell align="right">{
                <IconButton 
                  aria-label="Edit" 
                  size="small"
                ><EditIcon/> 
                </IconButton>}
              </StyledTableCell> */}
              <StyledTableCell align="right">{
                <IconButton 
                  aria-label="delete" 
                  size="small"
                  onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteFault(row.id) } }
                ><DeleteIcon/> 
                </IconButton>}
              </StyledTableCell>             
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
