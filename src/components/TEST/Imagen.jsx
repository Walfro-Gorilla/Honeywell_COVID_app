import React from 'react'

const Imagen = ({urlImagen}) => {
    return (
        <img 
            src={urlImagen}
            alt=""
            className="mr-3"
        />
    )
}

export default Imagen
