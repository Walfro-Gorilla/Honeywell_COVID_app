import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {db} from '../../firebase'
import { Button,ButtonGroup,Divider,TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomTable from '../CustomTable.jsx'

const Config = () => {

  const [faults,setFaults] = React.useState([])
  const [fault,setFault] = React.useState('')

  React.useEffect(() => {
    
    const obtenerData = async () => {

      try {
        const data = await db.collection('faults').get()

        const arrayData = data.docs.map(doc => ({ id:doc.id, ...doc.data() }))//Conertimos en ARRAY la data de 
        console.log(arrayData)
        setFaults(arrayData)
        }
      catch (error) {
        console.log(error)        
      }

    }
    obtenerData()  //Ejecutamos la funcion
  },[])

  //SNAPSHOTS 

 

  const addFault = async (e) => {
    e.preventDefault()

    if(!fault.trim()){
      console.log('esta vacio')
      return
    }

    try {
      const newFault = {
        nameFault:fault
      }
      const data = await db.collection('faults').add(newFault)

      setFaults([
        ...faults,
        {...newFault, id: data.id}
      ])

      setFault('')

    } catch (error) {
      console.log(error)      
    }
    console.log(fault)
  }

  const top100Films = [
    { title: 'Admin'},
    { title: 'Data Analyst'},
    { title: 'Scanner'},
  ]
  
    return (

        <Grid container spacing={3} justify="flex-end" >        

          <Grid item xs={12}>
            <Typography variant="h3" color="secondary" align="left">
              Admin Panel
            </Typography>   
            <hr/>
          </Grid>
          <Grid item xs={12}>
          <Typography variant="h4" color="primary" align="left">
          FAULTS
          </Typography>
        </Grid>

        <Grid item xs={6} align="right">
          <form onSubmit={addFault}>
            <TextField
              style={{ margin: 4 }}
              placeholder="Write a Fault"
              fullWidth
              margin="normal"         
              variant="outlined"
              onChange={e => setFault(e.target.value)}
              value={fault}
            />  
            <Button 
              variant="outlined" 
              color="primary" 
              type="submit"
            >
              Add
            </Button>
          </form>                   
        </Grid>

        <Grid item xs={6}>                    
         <CustomTable data={faults}/>
         
        </Grid>

        {/* <Grid item xs={12}>
          <hr/>
          <Typography variant="h4" color="primary" align="left">
            USERS
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <form onSubmit={addFault}>
            <TextField
              style={{ margin: 4 }}
              placeholder="E mail"
              fullWidth
              margin="dense"         
              variant="outlined"
              onChange={e => setFault(e.target.value)}
              value={fault}
            />  
            
            <Autocomplete
              style={{ margin: 4 }}
              fullWidth
              margin="dense"         
              variant="outlined"
              id="combo-box-demo"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} label="Level" variant="outlined" />}
            />
            <TextField
              style={{ margin: 4 }}
              placeholder="Type a password"
              fullWidth
              type="password"
              margin="dense"         
              variant="outlined"
              onChange={e => setFault(e.target.value)}
              value={fault}
            />  
            <Button 
              variant="outlined" 
              color="primary" 
              type="submit"
            >
              Add
            </Button>
          </form> 
        </Grid>

        <Grid item xs={6}>
          <CustomTable data={faults}/>
        </Grid> */}
       
        
                                       
      </Grid>   
    )
}

export default Config
