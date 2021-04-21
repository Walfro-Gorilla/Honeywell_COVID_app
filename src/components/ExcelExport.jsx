import React from 'react'
import ExportExcel from 'react-export-excel';

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


const ExcelExport = () => {
    return (
        <div>
            <ExcelFile
                element={<button>Exportar</button>}
                filename="COVID Report Export"
            >
                <ExcelSheet
                    data={registroAcciones} name="Reporte Acciones"
                >
                    <ExcelColumn label="Fecha" value="fecha"/>
                    <ExcelColumn label="Gafete" value="gafete"/>
                    <ExcelColumn label="Falta" value="fault"/>
                    <ExcelColumn label="des" value="Detalle"/>

                </ExcelSheet>

            </ExcelFile>

        </div>
    )
}

export default ExcelExport
