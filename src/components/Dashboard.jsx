import React from 'react'
import LineChart from './Charts/LineChart.js'
import PieChart from './Charts/PieChart.js'
import Grid from '@material-ui/core/Grid'
import ExcelExport from './ExcelExport.jsx'
import TopTable from './TablaTop.jsx'
import Typography from '@material-ui/core/Typography'
import {firebase} from '../firebase'


const Dashboard = () => {


    const [daily,setDaily] = React.useState([])

      React.useEffect(() => {
        document.title="Honeywell COVID actions"

        const obtenerData = async () => {            
            try {    
                const db= firebase.firestore()
                const data = await db.collection('tareas').get()
                const arrayData = await data.docs.map(doc => ({ id: doc.id, ...doc.data()}))

                console.log(arrayData)

                setDaily(arrayData)                
            } catch (error) { 
                console.log(error)            
            }    
      }      
      obtenerData()  
      },[])
      

    return (
          <Grid container spacing={3} justify="flex-end">  

            <Grid item xs={4}>
              <Typography variant="h5" color="secondary" align="center">
                TOP daily
              </Typography>              
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" color="secondary" align="center">
                TOP weekly
              </Typography>              
            </Grid>            
            <Grid item xs={4}>
              <Typography variant="h5" color="secondary" align="center">
                TOP monthly
              </Typography>     
            </Grid>
            
            
            <Grid item xs={4}>
              <TopTable/>
            </Grid>
            <Grid item xs={4}>
              <TopTable/>
            </Grid>            
            <Grid item xs={4}>
              <TopTable/>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h4" color="secondary">
                Graphs
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <PieChart />              
            </Grid>    
            <Grid item xs={6}>              
              <LineChart/>
              <hr/>
            </Grid>   
                     
          </Grid>  
          
    )
}

export default Dashboard
