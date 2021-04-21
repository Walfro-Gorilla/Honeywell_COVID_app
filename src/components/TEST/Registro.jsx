import React from 'react'
import { useParams } from 'react-router'

const Registro = () => {

    // USEPARAMS consume el ID de la URL
   const {id} = useParams()
   console.log(id)

   const [registro, setRegistro] = React.useState([])

    //USEEFFECT realiza un proceso al renderizar el componente, consumir API o DB
    React.useEffect(() => {

        //FUNICON asincrona(ASYNC) para consumir una API y setearla en un state
        const obtenerData = async() => {
        const data = await fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/civilization/${id}`)
        const registro = await data.json()
        setRegistro(registro)
    }
        //FUNCION para consumir la API
        obtenerData()
    },[id])

    

    
    return (
        <div>
            <h3>{registro.name}</h3>
            <p>{registro.team_bonus}</p>
        </div>
    )
}

export default Registro
