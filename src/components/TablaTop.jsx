import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'faultName', headerName: 'Fault', width: 130 },
  { field: 'topDaily', headerName: 'Daily', width: 130, type:'number' },
  {
    field: 'topWeekly',
    headerName: 'Weekly',
    type: 'number',
    width:130 ,
  },
  {
    field: 'topMonthly',
    headerName: 'Monthly',
    width: 130,
    type: 'number',
  },
  {
    field: 'topYearly',
    headerName: 'Yearly',
    width: 130,
    type: 'number',
  },
];

const rows = [
  { id: 1, faultName: 'Cubrebocas', topDaily: 2, topWeekly: 26, topMonthly:70 ,topYearly:265},
  { id: 2, faultName: 'Temperatura', topDaily: 1, topWeekly: 12, topMonthly:48 ,topYearly:121},
  { id: 3, faultName: 'Sana distancia', topDaily: 12, topWeekly: 18, topMonthly:42 ,topYearly:165},
  { id: 4, faultName: 'Lavado de manos', topDaily: 5, topWeekly: 11, topMonthly:35 ,topYearly:102},
  { id: 5, faultName: 'Protector facial', topDaily: 8, topWeekly: 15, topMonthly:27 ,topYearly:172},
 
];

export default function TablaTop() {
  return (
    <div style={{ height: 400, width: 'auto' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5}  />
    </div>
  );
}
