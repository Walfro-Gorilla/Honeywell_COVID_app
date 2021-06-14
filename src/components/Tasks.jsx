import React from 'react'
import {db} from '../firebase'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
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

// Ant Designe
import { Divider } from 'antd';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';

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


    //--- START Funcion 'agregar' acciones de scan a la BD. ---//
    const agregar = async (e) => { 

        e.preventDefault() // Evitamos el refresh de la pagina
        setError(false) //Inicializamos el state Error en FALSE

        if(!tarea.trim()){ //Evaluamos si el campo TAREA cuenta con data  
            setError(true)    //Si esta vacio, cargamos el STATE Error con el mensaje
            setTimeout(function(){setError(false)},3000) // Lo mostramos en pantalla
            return  //Salimos de la funcion
        } else if(!fault.trim()){   //Evaluamos si el campo FAULT cuenta con data
            //console.log('Esta vacio la Falta')  //Mostramos el mensaje de error en console log.
            setError(true) //Si esta vacio, cargamos el STATE Error con el mensaje
            setTimeout(function(){setError(false)},3000) // Lo mostramos en pantalla
            return //Salimos de la funcion
        }

        try {

            let today = new Date(); 
            let dateScan= parseInt(today.getMonth()+1) +"/"+ today.getDate() + "/"+ today.getFullYear();

            const nuevaTarea = {
                name: tarea,
                fault:fault,
                desc:desc,
                fecha: dateScan                  
            }
           
            await db.collection('tareas').add(nuevaTarea)
            setSave(true)
            setTimeout(function(){setSave(false)},3000)

            
            console.log('fecha mod: ',dateScan)
                      
            setTarea('')
            setFault('')
            setDesc('')
            setCurrency('')
            setError(false)           
            
        } catch (error) {
            console.log(error)
        }
        console.log(tarea)        
    }
    //--- END Funcion 'agregar' acciones de scan a la BD. ---//



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
                        
                        <Typography variant="h4" color="primary" paragraph>
                            Alert Scanner
                        </Typography>

                        <Divider/>
                        
                        <form onSubmit={agregar}>
                            <Grid container spacing={0} justify="flex-end">
                                <Grid item xs={10} >
                                    <Row gutter={[24, 8]}>
                                        <Col align="right" span={24}>                                          
                                            <TextField
                                            // error id="standard-error" 
                                            id="outlined-basic"
                                            label="Scan ID"
                                            variant="outlined"
                                            value={tarea}
                                            onChange={handleNumbers}
                                            margin='normal'
                                            fullWidth                                                    
                                            />
                                        </Col>
                                    </Row>                                    
                                </Grid>  

                               

                                <Grid item xs={2}>  
                                    <Row gutter={[24, 8]}>
                                        <Col wrap align="center" span={24}>
                                            <IconButton onClick={handleClickOpen} size="large"   >
                                              <ScanIcon fontSize="large" />
                                            </IconButton>
                                        </Col>
                                    </Row>              
                                </Grid>                     
                                
                            </Grid>                        
                            


                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Alert"
                                onChange={handleChange}
                                helperText="Please select an alert"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                value={fault}
                                >
                                {props.opt.map((option) => (
                                    <MenuItem key={option.nameFault} value={option.nameFault}>
                                    {option.nameFault}
                                    </MenuItem>
                                ))}
                            </TextField>   
                             

                            <TextField
                                id="outlined-multiline-static"
                                label="Description (optional)"
                                multiline
                                rows={10}
                                placeholder="How did this happen??..."
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
                            <Divider />                            
                            <Button 
                                variant="outlined" 

                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                Submit                          
                            </Button>
                            <Divider />
                        </form>
                    </div>
                </div> 
            </div>
        )
    )
}

export default App
