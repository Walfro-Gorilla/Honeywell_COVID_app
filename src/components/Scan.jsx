import { React, useEffect } from 'react';
import Quagga from 'quagga'; //Importamos el quagga scanneador
import { Video,ScanMarker, Container } from './styles'; //Importamos el estilo para el scanner

import scanArea from '../Assets/img/scan2.svg'
import honeyLogo from '../Assets/img/Honeywell-Logo.svg'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';




const Scan = props => {

    const onDetected = result => { // Al detectar un codigo de Barras
        
        let isbn = result.codeResult.code; // Creamos y asignamos el valor escaneado a una variable

        let res1 = isbn.slice(2) //Eliminamos los primeros 2 caracteres
        res1 = res1.slice(0,6)//limpiamos el valro segun config de gafetes

        let numId = isbn.slice(1) // Quitamos el 1er caracter
        numId = numId.slice(0,1) // Identificamos el primer caracter

        let letter = 'a' //Iniciamos a variable de la letra de identificador
        if (numId === '0') {   
            letter = 'E'                    
        } 
        else if (numId === '2') {
            letter = 'H'
        }

        let res2 = letter + res1 // Concatenamos los 2 valores   


        props.handleScan(res2)   
        //alert(isbn)
        //Quagga.stop(); 
    }

    useEffect(() => {
        //props.handleScan('hola')
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            Quagga.init({
                inputStream : {
                    name : "Live",
                    type : "LiveStream",
                    target: document.querySelector('#video'),
                    constraints: {
                        facingMode: 'environment',
                    },
                },
                numOfWorkers: 1,
                locate: true,
                decoder: {
                    readers: ['code_39_reader'],
                },
            },
            err => {
                if (err) {
                    console.error(err)
                    alert('Error: No se encontro la camara')
                    return
                }
                Quagga.start();
            },
            Quagga.onDetected(onDetected)
          );
        }        
    },[]);

    const useStyles = makeStyles((theme) => ({
        margin: {
          margin: theme.spacing(1),
        },
        extendedIcon: {
          marginRight: theme.spacing(1),
        },
      }));

        const classes = useStyles();

    return (
        <>
            <Video id="video" />
            <Container>
                <ScanMarker>
                    <img 
                        src={scanArea}
                        alt="Lector de ID" 
                        width="260"
                        height="260"
                    />
                    <p className="label"> Scan IT</p>
                </ScanMarker>   

                <img 
                    src={honeyLogo}
                    alt="Honeywell DevLab"
                    width="137"
                    height="69"                    
                />  
                <Button  variant="outlined" size="small" color="secondary" className={classes.margin}>
                    back
                </Button> 
                         
            </Container>
        </>
    )
}

export default Scan