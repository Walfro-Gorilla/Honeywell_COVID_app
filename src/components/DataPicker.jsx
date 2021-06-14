import { React } from 'react';
import { DatePicker, Space } from 'antd';

import 'antd/dist/antd.css';
import moment from 'moment';

const dateFormat = 'MM/DD/YYYY';
const DataPicker = (props) => {

console.log('Props defaultDate: ', props.defaultDate)

const firstDatePicker = moment(props.defaultDate) //moment(props.defaultDate, dateFormat)
const testDatePicker = moment('2021-09-29')

console.log('prop con moment: ', firstDatePicker)
console.log('text con moment: ', testDatePicker)
 
return (
 <Space direction="vertical" size={12}>
  <DatePicker value={moment(props.defaultDate)} format={dateFormat} />  
 </Space>
  )
}

export default DataPicker