import React from 'react'
//Importamos ROUTER para manejar las paginas y datos entre ellas.
import {
  BrowserRouter as Router,
  Switch,
  Route,Link,NavLink, Redirect
} from "react-router-dom";
//Importo las paginas
import Login from './components/Login'
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
import {firebase, db, auth} from './firebase'

const user = auth.currentUser;

const App = () => {
  const [dataOptions,setDataOptions] = React.useState([]) // Creamos un state para la informacion de los faults
  const [logged, setLogged] = React.useState(false) //hook que indica si ya inicio sesion o no

  auth.onAuthStateChanged(() => {
    if(auth.currentUser){
      setLogged(true);
    }
  })

  React.useEffect(() => { //Al abrir este componente se ejecuta lo siguiente...
    //const checklogin = async()=>{
    //  const user = await auth.currentUser;
    //  setTimeout(() => {
    //    alert(user.email + 'Hola');
    //  }, 5000);
    //}
    //checklogin();
    document.title="Honeywell COVID actions" //Cambiamos el titulo de la pagina
    const obtenerData = async () => { //Creamos una funcion ASYNC AWAIT           
      try {                  
        const data = await db.collection('faults').get() // Especificamos que coleccion queremos
        const arrayData = await data.docs.map(doc => ({ id: doc.id, ...doc.data()})) //Obtenemos la data de la BD
        setDataOptions(arrayData) //Asignamos el array al states
        console.log('Array de App.jsx: ',dataOptions.data)
      } catch (error) { 
          console.log(error)  // Si falla, nos envia un mensaje a la consola
      }            
    }      
    obtenerData()  //Ejecutamos la funcion
    },[]) //Importante agregar [] para no generar un loop

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="container mt-5">
          {
            (logged===true) ? (
              <React.Fragment>
                <Navbar/>
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
                  <Route path="/">
                    <Redirect to='/dashboard'/>
                  </Route>
                </Switch>   
              </React.Fragment>
            ):(
              <Login/>
            )
          } 
        </div>
      </Router>
    </ThemeProvider>   
    
  );
}

export default App
