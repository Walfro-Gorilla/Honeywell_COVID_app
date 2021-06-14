import React from 'react'
import ExportExcel from 'react-export-excel';
import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';


const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;

const ExcelExport = (props) => {
    return (
        <div>
            <ExcelFile
                element={<Button type="primary" icon={<DownloadOutlined />} size="medium" />}
                filename="Honeywell COVID Report Export"
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
