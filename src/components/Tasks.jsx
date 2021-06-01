import React from 'react'
import {db} from '../firebase'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem';
import ErrorMsg from './ErrorMsg.jsx'
import OkMsg from './OkMsg.jsx'
import Grid from '@material-ui/core/Grid'
import Scan from './Scan.jsx'

import Dialog from '@material-ui/core/Dialog';


import IconButton from '@material-ui/core/IconButton';
import ScanIcon from '@material-ui/icons/SettingsOverscan';

import { makeStyles } from '@material-ui/core/styles';


const App = (props) => {
    
    //HOOK de estado para el lector de scanner
    const [scanOpen, setScanOpen] = React.useState(false);


    
    console.log('estos son la opc: ',props.opt)

    //STATE tarea -> no gafete
    const [tarea,setTarea] = React.useState('')
    const [fault,setFault] = React.useState('')
    const [desc,setDesc] = React.useState('')


    const [currency, setCurrency] = React.useState('EUR');
    
    //STATE para capturar error en el formulario
    const [error,setError] = React.useState(false)
    const [save,setSave] = React.useState(false)

    const [opciones,setOpciones] = React.useState([])


    const agregar = async (e) => {
        e.preventDefault()
        setError(false)

        if(!tarea.trim()){    
            setError(true)  
            setTimeout(function(){setError(false)},3000)
            return  
        } else if(!fault.trim()){
            console.log('Esta vacio la Falta')
            setError(true)
            setTimeout(function(){setError(false)},3000)
            return
        }
        

        try {
            const nuevaTarea = {
                name: tarea,
                fault:fault,
                desc:desc,
                fecha:new Date(Date.now()).toLocaleDateString()
            }
            setSave(true)
            setTimeout(function(){setSave(false)},3000)

                      
            setTarea('')
            setFault('')
            setDesc('')
            setCurrency('')
            setError(false)
            window.location.reload(false);
            
            
        } catch (error) {
            console.log(error)
        }

        console.log(tarea)
        
    }

   

    const handleChange = (event) => {
        setCurrency(event.target.value);
        setFault(event.target.value)
      };

      const handleNumbers = (event) => {
         setTarea(event.target.value) 
      }

      

     
      const handleClickOpen = () => {
        setScanOpen(true);
        console.log(scanOpen)
      };

      const handleScan = (e) => {
        setTarea(e)
        setScanOpen(false)
    }

    //bUTTON PRUEBA
    
    const useStyles = makeStyles((theme) => ({
        margin: {
          margin: theme.spacing(1),
        },
        extendedIcon: {
          marginRight: theme.spacing(1),
        },
      }));


        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            console.log("enumerateDevices() not supported.");
            return;
          }
          
        //   // List cameras and microphones.
          
        //   navigator.mediaDevices.enumerateDevices()
        //   .then(function(devices) {
        //     devices.forEach(function(device) {
        //       console.log(device.kind + ": " + device.label +
        //                   " id = " + device.deviceId);
        //     });
        //   })
        //   .catch(function(err) {
        //     console.log(err.name + ": " + err.message);
        //   });


       


    return (   
        scanOpen === true ? 
        (
            <Dialog aria-labelledby="simple-dialog-title" open={scanOpen}>
                
                    <Scan handleScan={e=> handleScan(e)}/>
            </Dialog>  
        ) : 
        (        
            <div className="container mt-3">            
            
                <div className="row"> 

                    <div className="col-md-12">
                        
                        <Typography variant="h3" color="primary" paragraph>
                            COVID actions
                        </Typography>
                        
                        <form onSubmit={agregar}>
                            <Grid container spacing={0} justify="flex-end">
                                <Grid item xs={10} >
                                    <TextField
                                        // error id="standard-error" 
                                        id="outlined-basic"
                                        label="Ingrese numero de gafete"
                                        variant="outlined"
                                        value={tarea}
                                        onChange={handleNumbers}
                                        margin='normal'
                                        fullWidth                                                    
                                    />
                                </Grid>  

                                <Grid  item xs={2} >
                                    <IconButton onClick={handleClickOpen} size="medium" edge   >
                                        <ScanIcon fontSize="large" />
                                    </IconButton>
                                </Grid>         
                                                                  
                                
                            </Grid>                        
                            


                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Fault"
                                onChange={handleChange}
                                helperText="Please select fault"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                >
                                {props.opt.map((option) => (
                                    <MenuItem key={option.nameFault} value={option.nameFault}>
                                    {option.nameFault}
                                    </MenuItem>
                                ))}
                            </TextField>   
                             

                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={10}
                                placeholder="HOW?..."
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                            /> 

                            {
                                error ? <ErrorMsg /> : null
                            }  
                            {
                                save ? <OkMsg /> : null
                            }                      
                            
                            
                            <Button 
                                variant="outlined" 
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                REGISTRAR                          
                            </Button>
                            <hr/>  
                            
                        </form>
                    </div>
                </div> 
            </div>
        )
    )
}

export default App
