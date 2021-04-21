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
import Config from './components/Config.jsx'
import Registro from './components/TEST/Registro.jsx'
import Tasker from './components/Tasks.jsx'
import Navbar from './components/Navbar.jsx'
import {ThemeProvider} from '@material-ui/core/styles'
import theme from './components/temaConfig'

const App = () => {
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
            
            <Link to="/config" className="btn btn-warning">
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
            </Route>

            <Route path="/tasker">
              <Tasker/>
            </Route>

          </Switch> 
      </div>
      

      </Router>
    </ThemeProvider>   
    
  );
}

export default App
