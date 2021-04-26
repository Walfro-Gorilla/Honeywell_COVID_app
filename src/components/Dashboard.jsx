import React from 'react'
import LineChart from './Charts/LineChart.js'
import PieChart from './Charts/PieChart.js'
import Grid from '@material-ui/core/Grid'
import ExcelExport from './ExcelExport.jsx'
import TopTable from './TablaTop.jsx'
import Typography from '@material-ui/core/Typography'
import {firebase} from '../firebase'
import { Button,ButtonGroup } from '@material-ui/core'

const Dashboard = () => {

    const [dataFault,setdataFault] = React.useState([]) // Creamos un state para la informacion de los faults

      React.useEffect(() => { //Al abrir este componente se ejecuta lo siguiente...
        
        document.title="Honeywell COVID actions" //Cambiamos el titulo de la pagina

        const obtenerData = async () => { //Creamos una funcion ASYNC AWAIT           
            try {                  
                const db= firebase.firestore() //Creamos la constate de la BD
                const data = await db.collection('tareas').get() // Especificamos que coleccion queremos
                const arrayData = await data.docs.map(doc => ({ id: doc.id, ...doc.data()})) //Obtenemos la data de la BD
                setdataFault(arrayData) //Asignamos el array al states
            } catch (error) { 
                console.log(error)  // Si falla, nos envia un mensaje a la consola
            }            }      
          obtenerData()  //Ejecutamos la funcion
        },[]) //Importante agregar [] para no generar un loop

        const sortArray = dataFault.sort((a, b) => (a.fecha > b.fecha) ? 1 : -1) // Sortea los DATOS de menor a mayot
        const newArrayDate = Array.from(new Set(sortArray.map(item => item.fecha))) // Elimina FECHAS duplicadas y deja solo fechas
        const newArrayFaults = Array.from(new Set(sortArray.map(item => item.fault))) // Elimina FAULTS duplicadas y deja solo faltas

    
        console.log('FAULTS: ',sortArray) 
        console.log('Array de FECHAS: newArrayDate ',newArrayDate)
        console.log('Array de FAULTS: newArrayFaults ',newArrayFaults)
    
        const newArrayDateCount = newArrayDate.length //Contamos el total de fechas
        const newArrayFaultsCount = newArrayFaults.length //Contamos el total de faults desc
        const newArrayCount = sortArray.length // Contamos el total de registros de fechas
    
        console.log('Array total de SOLO fechas:',newArrayDateCount) 
        console.log('Array total de SOLO faults:',newArrayFaultsCount) 
        console.log('Array total de fechas en arreglo:',newArrayCount)
    
        //FUNCION para obtener los valores por fecha
        const valueDate = [] // creamos el aareglo de los valores x fecha
        for (let t = 0; t < newArrayDate.length; t++) { // inicioamos un FOR con limite la cantidad de fechas unicas
        
            let counter = 0; //creamos el contador por fecha
            for (let i = 0; i < sortArray.length; i++) {  //iniciamos un FOR con limite la qty de total de registros a evaluar
    
                if (sortArray[i].fecha === newArrayDate[t]) counter++; // SI la fecha del arreglo completo coincide con la primer fecha
                                                                        //sumariza en la variable counter
            }
    
        //console.log('del: ',newArrayDate[t],' son: ',counter); 
    
        valueDate.push(counter) // agregamos el total x fecha al array de valores totales
    
        console.log('arreglo x DATES:',valueDate)
    
      }


      //FUNCION para obtener los valores por fault
      const valueFault = [] // creamos el aareglo de los valores x FAULT
      for (let u = 0; u < newArrayFaults.length; u++) { // inicioamos un FOR con limite la cantidad de FAULTS unicas
      
          let counterFault = 0; //creamos el contador por FAULT
          for (let j = 0; j < sortArray.length; j++) {  //iniciamos un FOR con limite la qty de total de registros a evaluar
  
              if (sortArray[j].fault === newArrayFaults[u]) counterFault++; // SI la FAULT del arreglo completo coincide con la primer FAULT
                                                                      //sumariza en la variable counterFault
          }
  
      console.log('del: ',newArrayFaults[u],' son: ',counterFault); // 
  
      valueFault.push(counterFault) // agregamos el total x FAULT al array de valores totales
  
      console.log('arreglo x FAULTS:',valueFault)
  
      }
    

    return (
          <Grid container spacing={3} justify="flex-end">  

            <Grid item xs={12}>   
              <ButtonGroup disableElevation variant="contained" color="primary">
                <ExcelExport data={sortArray} />
              </ButtonGroup>                          
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5" color="secondary" align="center">
                TOP actions table
              </Typography>              
            </Grid>
                      
            <Grid item xs={12}>
              <TopTable/>
            </Grid>            
            <Grid item xs={12}>
              <Typography variant="h4" color="secondary">
                Graphs
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <PieChart x={newArrayFaults} y={valueFault}/>              
            </Grid>    
            <Grid item xs={6}>              
              <LineChart x={newArrayDate} y={valueDate} />
              <hr/>
            </Grid>                        
          </Grid>           
    )
}

export default Dashboard
