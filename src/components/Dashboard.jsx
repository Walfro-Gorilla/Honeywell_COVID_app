import { React, useState, useEffect } from 'react' //React
import { db } from '../firebase' //Firebase import

// Importamos los componentes
import ExcelExport from './ExcelExport.jsx'
import TopTable from './TablaTop.jsx'
import DataPicker from './DataPicker.jsx'

// Importamos las graficas
import LineChart from './Charts/LineChart.js'
import PieChart from './Charts/PieChart.js'

// Material UI
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

// Ant Designe
import { Divider } from 'antd';
import { Row, Col, DatePicker} from 'antd';
import 'antd/dist/antd.css';

//Moment.js
import moment from 'moment';

const Dashboard = () => {
  const [dataFault, setDataFault] = useState([]) // Creamos un state para TODA la data de los 'faults'.
  const [firstDate, setFirstDate] = useState(null); //Inicializamos el estado 'firstDate' y le asignamos la fecha mas antigua.
  const [lastDate, setLastDate] = useState(null); //Inicializamos el estado 'lastDate' y le asignamos la fecha mas reciente.

  const sortArray = dataFault.sort((a, b) => (a.fecha > b.fecha) ? 1 : -1)


  //------ | START FILTRO x fechas  | -----------//


  let newDate = new Date() //Asignamos la fecha actual a 'newDate'
  const dateFormat = 'MM/DD/YYYY'; // Asignamos el formato de la fecha a 'dateFormat'
  const customFormat = value => `custom format: ${value.format(dateFormat)}`; //Asignamos el formato por default a 'customFormat'




  // --------- START FILTER by datapickers ---------------------//

  const filterArray = sortArray.filter((a, b) => (a.fecha > b.fecha) ? 1 : -1) // Sortea los 'dataFault' de menor a mayor y lo asigna a 'sortArray'


  // --------- END FILTER by datapickers ---------------------//




  //------ | END FILTRO x fechas  | -----------//

  const newArrayDate = Array.from(new Set(sortArray.map(item => item.fecha))) // Elimina FECHAS duplicadas y deja solo fechas
  const newArrayFaults = Array.from(new Set(sortArray.map(item => item.fault))) // Elimina FAULTS duplicadas y deja solo faltas

  const newArrayDateCount = newArrayDate.length //Contamos el total de fechas
  const newArrayFaultsCount = newArrayFaults.length //Contamos el total de faults desc
  const newArrayCount = sortArray.length // Contamos el total de registros de fechas

  const startDate = newArrayDate[0] //Obtenemos la primer fecha del array sorteado
  const endDate = newArrayDate[newArrayDateCount - 1] //Obtenemos el ultimo valor del array


  console.log('STAAAART:', firstDate)
  console.log('EEEEEND', lastDate)


  //------ | START FUNCION obtener los valores por 'fecha' | -----------//

  

  //------ | END FUNCION obtener los valores por 'fecha' | -----------//


  //------ |    START FUNCION obtener los valores por 'fault''    | -----------//


  


  //------ |      END FUNCION obtener los valores por 'fault''    | -----------//


  //------ | START USeEEECT   | -----------//


  useEffect(() => { //Al abrir este componente se ejecuta lo siguiente...

    document.title = "Honeywell COVID App actions" //Cambiamos el titulo de la pagina.

    const obtenerData = async () => { //Creamos una funcion ASYNC AWAIT.     
      try {
        const data = await db.collection('tareas').get() // Especificamos que coleccion queremos y la almacenamos en 'data'
        const arrayData = await data.docs.map(doc => ({ id: doc.id, ...doc.data() })) //Mapeamos 'data' para obtener 'arrayData' con los datos.
        setDataFault(arrayData) //Asignamos 'arrayData' al state 'setDataFault'.
      } catch (error) {
        console.log(error)  // Si falla, nos envia un mensaje a la consola
      }
      //alert(newArrayDate[0])
      //setFirstDate(newArrayDate[0])
    }
    obtenerData()  //Ejecutamos la funcion
  }, []) //Importante agregar [] para no generar un loop


  //------ | END USEEEECT   | -----------//

  let inicio = firstDate===null ? startDate: firstDate
  let fin = lastDate===null ? endDate: lastDate

  return (
    <Grid container spacing={3} justify="flex-end">

      {/* Division con titulo */}

      <Grid item xs={12}>
        <Typography variant="h7" color="primary" align="left">
          <Divider orientation="left">Filter</Divider>
        </Typography>
      </Grid>

      {/* GRID con datapickers de fecha */}

      <Grid item xs={10}>
        <Row gutter={[8, 8]}>
          <Col align="right" span={5}>
            from:
          </Col>
          <Col span={7} >
            <DatePicker value={moment(inicio)} onChange={(moment, string)=>setFirstDate(string)} />
          </Col>
          <Col align="right" span={5} >
            to:
          </Col>
          <Col span={7} >
            <DatePicker value={moment(fin)} onChange={(moment, string)=>setLastDate(string)}/>
          </Col>
        </Row>
      </Grid>

      {/* GRID con boton de descarga de excel */}

      <Grid item xs={2}>
        <Row gutter={[24, 8]}>
          <Col align="right" span={24}>
            <ExcelExport data={sortArray} />
          </Col>
        </Row>
      </Grid>

      {/* Division de componentes */}

      <Divider />

      {/* Titulo de tabla */}

      <Grid item xs={12}>
        <Typography variant="h5" color="secondary" align="left">
          TOP actions table
        </Typography>
      </Grid>

      {/* TABLE "TOP actions" */}

      <Grid item xs={12}>
        <TopTable />
      </Grid>

      {/* Division de componentes */}

      <Divider />

      {/* Titulo de graficas */}

      <Grid item xs={12}>
        <Typography variant="h4" color="secondary">
          Graphs
        </Typography>
      </Grid>

      {/* Graficas */}

      <Grid item xs={6}>
        <PieChart data={sortArray.filter(item=> moment(item.fecha)>=moment(inicio) && moment(item.fecha)<=moment(fin))}/>
      </Grid>
      <Grid item xs={6}>
        <LineChart data={sortArray.filter(item=> moment(item.fecha)>=moment(inicio) && moment(item.fecha)<=moment(fin))}/>
      </Grid>

      {/* Division de componentes */}

      <Divider />

    </Grid>
  )
}

export default Dashboard
