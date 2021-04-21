// Librerias importadas
import React from 'react';
///Libreria de ID dinamicos
import shortid from 'shortid';

function App() {

  // STATES 
  const [tarea,setTarea] = React.useState('')
  const [tareas, setTareas] = React.useState([])
  const [modoEdicion , setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')
  const [error,setError] = React.useState(null)


  // FUNCION para gregar tareas al state
  const agregarTarea = e => {
    /// Previene el refresh de pafe
    e.preventDefault()
    ///Evaluamos que SI este vacio el iput y muestra un error
    if(!tarea.trim()){
      console.log('Elemento Vacio')
      setError('Escriba algo por favor...')
      ////Salimon de la funcion
      return
    }
    ///Evaluamos que NO este vacio el input y asigna el valor al state
    /// + los datos que ya tenia el state
    console.log(tarea)
    setTareas([
      ...tareas,
      ///Generamos el ID dinamico mediante ahortid.generate()
      {id:shortid.generate(),nombreTarea:tarea}
    ])

    ///Limpiamos el state de TAREA y ERROR
    setTarea('')
    setError(null)
  }
  // FUNCION eliminar tareas
  const eliminarTarea = id => {
    ///Filtramos el el state en un array mediante el ID
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    ///Asignamos el valor del array al estado de TAREAS
    setTareas(arrayFiltrado)
  }
  
  // FUNCION editar tareas; habilita el modo edicion 
  const editar = item => {
    console.log(item)
    setModoEdicion(true)
    setTarea(item.nombreTarea)
    setId(item.id)
    setError(null)
  }
  //FUNCION editar tarea
  const editarTarea = e => {
    e.preventDefault()
    ///Evalua si el state TAREA esta vacio
    if(!tarea.trim()){
      console.log('Elemento Vacio')
      setError('Escriba algo por favor...')

      return
    }  
    ///Si no esta vacio ejecuta lo sig...    
    const arrayEditado = tareas.map(
      item => item.id === id ? {id:id,nombreTarea:tarea} : item
    )
    
    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">hello world</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
            {

              tareas.length === 0 ? (
                <li className="list-group-item">No hay tareas.</li>
              ) : (

                tareas.map(item => (
                  <li className="list-group-item" key={item.id}>
                    <span className="lead">{item.nombreTarea}</span>

                    {/* Boton ELIMINAR */}
                
                    <button 
                      className="btn btn-danger btn-sm float-right mx-2"
                      onClick={() => eliminarTarea(item.id)}
                    >
                      Eliminar
                    </button>

                    {/* Boton EDITAR */}
    
                    <button 
                      className="btn btn-warning btn-sm float-right"
                      onClick={() => editar(item)}
                    >
                      Editar
                    </button>
    
                  </li>
            
                  ))

              )

              
            }
            
            
          </ul>
        </div>
        <div className="col-4">
        <h4 className="text-center">
          {
            modoEdicion ? 'Editar Tarea': 'Agregar Tarea'
          }
      </h4>
    

      {/* FORMULARIO */}

      <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
        
        {/* Mensaje de ERROR */}
        {
            error ? <span className="text-danger">{error}</span> : null
        }

          <input 
          type="text" 
          className="form-control mb-2"
          placeholder="Ingrese Tarea"
          onChange={e => setTarea(e.target.value)}
          value={tarea}
          />

          {
            modoEdicion ? (
              <button 
                className="btn btn-warning btn-block" 
                type="submit"
              >Editar
              </button>
            ) : (
              <button 
                className="btn btn-dark btn-block" 
                type="submit"
              >Agregar
              </button>              
            )
          }

          

        </form>

        </div>
      </div>
    </div>
    
  );
}

export default App;
