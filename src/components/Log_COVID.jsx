

import React from 'react'
import {firebase} from '../firebase'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'


const App = () => {

    const [tareas,setTareas] = React.useState([])
    const [tarea,setTarea] = React.useState('')
    const [modoEdicion,setModoEdicion] = React.useState(false)
    const [id,setId] = React.useState('')



    React.useEffect(() => {


    const obtenerData = async () => { //FUNCION para obtener los datos de la BD
        
        try {

            const db= firebase.firestore()
            const data = await db.collection('tareas').get()
            console.log(data.docs)

            const arrayData = await data.docs.map(doc => ({ id: doc.id, ...doc.data()}))
            console.log(arrayData)
            setTareas(arrayData)
            
        } catch (error) { 
            console.log(error)            
        }

    }

    obtenerData() //Ejecutamos la funcion 

    },[])

    const agregar = async (e) => { //FUNCION para agregar datos ala BD
        e.preventDefault()

        if(!tarea.trim()){
            console.log('esta vacia')
            return
        }

        try {

            const db = firebase.firestore()
            const nuevaTarea = {
                name: tarea,
                fecha: Date.now()
            }

            const data = await db.collection('tareas').add(nuevaTarea)

            //Actualizamos el STATE para mostrarlos en el listado
            setTareas([
                ...tareas,
                {...nuevaTarea,id:data.id}
            ])

            setTarea('')
            
        } catch (error) {
            console.log(error)
        }

        console.log(tarea)
    }



    const eliminar = async (id) => { //ELIMINAR un dato de la BD
        try {

            const db = firebase.firestore()
            await db.collection('tareas').doc(id).delete()    
            
            const arrayFiltrado = tareas.filter(item => item.id !== id)
            setTareas(arrayFiltrado)

        } catch (error) {

            console.log(error)
            
        }
    }



    const activarEdicion = (item) => {
        setModoEdicion(true)
        setTarea(item.name)
        setId(item.id)
    }
    

    const editar = async (e) => {
        e.preventDefault()
        if(!tarea.trim()){
            console.log('vacio')
            return
        }
        try {

            const db = firebase.firestore()
            await db.collection('tareas').doc(id).update({
                name: tarea
            })
            
            const arrayEditado = tareas.map(item => (
                item.id === id ? {id: item.id, fecha: item.fecha, name: tarea} : item                
            ))

            setTareas(arrayEditado)
            setModoEdicion(false)
            setTarea('')
            setId('')
            
        } catch (error) {
            console.log(error)
            
        }
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6">
                    <ul className="list-group">
                        {
                        tareas.map(item =>(
                            <li className="list-group-item" key={item.id}>
                                {item.name}
                                <button 
                                    className="btn btn-danger btn-sm text-right"
                                    onClick={() => eliminar(item.id)}                                    
                                >
                                    Eliminar
                                </button>
                                <button 
                                    className="btn btn-warning btn-sm text-right mr-2"
                                    onClick={() => activarEdicion(item)}                                    
                                >
                                    Editars
                                </button>
                            </li>
                        ))                            
                        }
                    </ul>                
                </div>
                <div className="col-md-6">
                    <h2>
                        {
                            modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
                        }
                    </h2> 
                    <form onSubmit={modoEdicion ? editar : agregar}>
                       
                        <TextField
                          id="outlined-basic"
                          label="Ingrese numero de gafete"
                          variant="outlined"
                          value={tarea}
                          onChange={e => setTarea(e.target.value)}
                          fullWidth                          
                        />
                        
                        <Button 
                            variant="outlined" 
                            color="primary"
                            type="submit"
                            fullWidth
                        >
                            REGISTRAR                          
                        </Button>
                        
                    </form>
                </div>
            </div>            
        </div>
    )
}

export default App
