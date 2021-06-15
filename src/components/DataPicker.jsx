import { React } from 'react';
import { DatePicker, Space, Button } from 'antd';

import 'antd/dist/antd.css';
import moment from 'moment';

const dateFormat = 'DD/MM/YYYY';
const DataPicker = (props) => {
  const [date, setDate] = React.useState('01/01/2021'); //Inicializamos el estado 'firstDate' y le asignamos la fecha mas antigua.
  console.log('Props defaultDate: ', props.defaultDate)

  const firstDatePicker = moment(props.defaultDate) //moment(props.defaultDate, dateFormat)
  const testDatePicker = moment('2021-09-29')

  console.log('prop con moment: ', firstDatePicker)
  console.log('text con moment: ', testDatePicker)
  
  return (
  <Space direction="vertical" size={12}>
    <DatePicker onChange={e=>props.fecha(e)} value={moment(props.defaultDate)} format={dateFormat} />  
  </Space>
    )
}

export default DataPicker