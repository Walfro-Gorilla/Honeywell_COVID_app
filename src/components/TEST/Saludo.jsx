import React from 'react'

const saludo = (props) => {

    console.log(props) 
    return (
        <div>
            <h2>Saludando a {props.persona}</h2>
            <p>tu edad es:{props.edad}</p>
        </div>
    )
}

export default saludo
