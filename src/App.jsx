import React from 'react'
//Importamos ROUTER para manejar las paginas y datos entre ellas.
import {
  BrowserRouter as Router,
  Switch,
  Route,Link,NavLink, Redirect
} from "react-router-dom";
//Importo las paginas
import Register from './components/Register'
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
  const [dataOptions,setDataOptions] = React.useState([]); // Creamos un state para la informacion de los faults
  const [logged, setLogged] = React.useState(false); //hook que indica si ya inicio sesion o no
  const [cargando, setCargando] = React.useState(true);
  const [nivel, setNivel] = React.useState(null);


  auth.onAuthStateChanged(async() => {
    if(auth.currentUser){
      setLogged(true);
      setCargando(false);
      const usuario =await db.collection('usuarios').where('correo', '==', auth.currentUser.email).get();
      const docs =  usuario.docs;
      docs.map(doc=>{
        setNivel(doc.data().nivel)
      })
    }else{
      setLogged(false);
      setCargando(false); 
    }
  })

  React.useEffect(() => { //Al abrir este componente se ejecuta lo siguiente...
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
    <ThemeProvider theme={theme} >
      <Router>
        <div className="container mt-2">
          {
            (cargando===true) ? (
              <center><h1>Loading...</h1></center>
            ):(
              (logged===true) ? (
                <React.Fragment>
                  <Navbar nivel={nivel}/>
                  <Switch>
                    {/* Asignar rutas  de las mas especifica(/) hasta la mas general, o agregando 'exact' en PATH    */}
                    <Route path="/tasker">
                      <Tasker opt={dataOptions}/>
                    </Route>
                    <Route exact path="/">
                      <Redirect to='/tasker'/>
                    </Route>
                    <Route exact path="/register">
                      <Register/>
                    </Route>
                    {
                      nivel===2 ? (
                        <React.Fragment>
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
                        </React.Fragment>
                      ):(
                        null
                      )
                    }
                    
                  </Switch>   
                </React.Fragment>
              ):(
                <React.Fragment>
                  <Switch>
                    <Route exact path="/register">
                      <Register/>
                    </Route>
                    <Route path="/">
                      <Login/>
                    </Route>
                  </Switch>
                </React.Fragment>
              )
            )
          } 
        </div>
      </Router>
    </ThemeProvider>   
    
  );
}

export default App
