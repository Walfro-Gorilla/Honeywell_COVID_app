import React from 'react'
//Importamos ROUTER para manejar las paginas y datos entre ellas.
import {
  BrowserRouter as Router,
  Switch,
  Route,Link,NavLink
} from "react-router-dom";
//Importo las paginas
import Formulario from './components/Formulario.jsx'
import Dashboard from './components/Dashboard.jsx'
import Config from './components/Pages/Config.jsx'
import Registro from './components/TEST/Registro.jsx'
import Tasker from './components/Tasks.jsx'
import Navbar from './components/Navbar.jsx'
import {ThemeProvider} from '@material-ui/core/styles'
import theme from './components/temaConfig'
import Scan from './components/Scan'
//Importamos firebase
import {firebase} from './firebase'


const App = () => {

  const [dataOptions,setDataOptions] = React.useState([]) // Creamos un state para la informacion de los faults

      
  React.useEffect(() => { //Al abrir este componente se ejecuta lo siguiente...
        
        document.title="Honeywell COVID actions" //Cambiamos el titulo de la pagina

        const obtenerData = async () => { //Creamos una funcion ASYNC AWAIT           
            try {                  
                const db= firebase.firestore() //Creamos la constate de la BD
                const data = await db.collection('faults').get() // Especificamos que coleccion queremos
                const arrayData = await data.docs.map(doc => ({ id: doc.id, ...doc.data()})) //Obtenemos la data de la BD
                setDataOptions(arrayData) //Asignamos el array al states
                console.log('Array de App.jsx: ',dataOptions.data)
            } catch (error) { 
                console.log(error)  // Si falla, nos envia un mensaje a la consola
            }            }      
          obtenerData()  //Ejecutamos la funcion
    },[]) //Importante agregar [] para no generar un loop

  return (
    <ThemeProvider theme={theme}>
        <Router>
        <div className="container mt-5">
          
          <Navbar/>

          <div className="btn-group">

            <NavLink to="/dashboard" className=" btn btn-dark" activeClassName="active">
              Dashboard
            </NavLink>

            <Link to="/tasker" className="btn btn-danger">
              Actions
            </Link>
            
            

            <Link  to="/config" className="btn btn-warning">
              Config
            </Link>
          
          </div>

          <hr/>

          <Switch>

            {/* Asignar rutas  de las mas especifica(/) hasta la mas general, o agregando 'exact' en PATH    */}
            <Route path="/dashboard/:id">
              <Registro/>
            </Route>

            <Route path="/formulario">
              <Formulario/>      
            </Route>

            <Route path="/dashboard">
              <Dashboard/>
            </Route>

            <Route path="/config">
              <Config/>
            </Route>

            <Route path="/scan">
              <Scan/>
            </Route>

            <Route path="/tasker">
              <Tasker opt={dataOptions}/>
            </Route>

          </Switch> 
      </div>
      

      </Router>
    </ThemeProvider>   
    
  );
}

export default App
