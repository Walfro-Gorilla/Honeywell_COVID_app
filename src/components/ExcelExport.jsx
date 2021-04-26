import React from 'react'
import ExportExcel from 'react-export-excel';
import { Button } from '@material-ui/core'


const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;

const registroAcciones = [
    {
        fecha: "enero",
        gafete:323232,
        fault:"Sin cubrebocas",
        des:"El operdor se nego a portar el cubrebocas"
    },
    {
        fecha: "febrero",
        gafete:454534,
        fault:"Sin careta",
        des:"El operdor se nego a portar el careta"
    },
    {
        fecha: "marzo",
        gafete:4848954,
        fault:"Sin antibacterial",
        des:"El operdor se nego a portar el antbacterial"
    },
]


const ExcelExport = (props) => {
    return (
        <div>
            <ExcelFile
                element={<Button variant="outlined" color="primary">.XLS</Button>}
                filename="COVID Report Export"
            >
                <ExcelSheet
                    data={props.data} name="Reporte Acciones"
                >
                    <ExcelColumn label="Fecha" value="fecha"/>
                    <ExcelColumn label="Gafete" value="name"/>
                    <ExcelColumn label="Falta" value="fault"/>
                    <ExcelColumn label="Detalle" value="desc"/>

                </ExcelSheet>

            </ExcelFile>

        </div>
    )
}

export default ExcelExport
