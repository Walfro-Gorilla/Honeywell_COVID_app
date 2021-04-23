import React from 'react'
import {firebase} from '../firebase'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem';
import ErrorMsg from './ErrorMsg.jsx'
import OkMsg from './OkMsg.jsx'


const currencies = [
    {
        value: 'EUR',
        label: '-',
    },
    {
        value: 'USD',
        label: 'Sin cubrebocas',
    },   
    {
        value: 'FC',
        label: 'Sin Protector facial',
    },
    {
      value: 'BTC',
      label: 'Sin Sana distancia',
    },
    {
      value: 'JPY',
      label: 'No se lavo las manos',
    },
  ];

const App = () => {

    //STATE tarea -> no gafete
    const [tarea,setTarea] = React.useState('')
    const [fault,setFault] = React.useState('')
    const [desc,setDesc] = React.useState('')


    const [currency, setCurrency] = React.useState('EUR');
    
    //STATE para capturar error en el formulario
    const [error,setError] = React.useState(false)
    const [save,setSave] = React.useState(false)




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
        } else if(!desc.trim()){
            console.log('Esta vacio la desc')
            setError(true)
            setTimeout(function(){setError(false)},3000)
            return
        }
        
        
        

        try {

            const db = firebase.firestore()
            const nuevaTarea = {
                name: tarea,
                fault:fault,
                desc:desc,
                fecha:new Date(Date.now()).toLocaleDateString()
            }
            setSave(true)
            setTimeout(function(){setSave(false)},3000)

            const data = await db.collection('tareas').add(nuevaTarea)
           

           
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

   

    const handleChange = (event) => {
        setCurrency(event.target.value);
        setFault(event.target.value)
      };

      const handleNumbers = (event) => {
         setTarea(event.target.value) 
      }

      const handleClose = (event) => {
          setSave(false)
      }


    return (
        <div className="container mt-3">
            <div className="row">



                <div className="col-md-12">
                    
                    <Typography variant="h3" color="primary" paragraph>
                        COVID actions
                    </Typography>
                    <form onSubmit={agregar}>

                                       

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


                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Fault"
                            value={currency}
                            onChange={handleChange}
                            helperText="Please select fault"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
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
}

export default App
