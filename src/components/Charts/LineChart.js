import React from 'react'
import { Bar,Line, Pie } from  'react-chartjs-2'

const LineChart = (props) => {
    

    const sortArray = props.date.sort((a, b) => (a.fecha > b.fecha) ? 1 : -1) // Sortea los datos de menor a mayot
    const newArrayDate = Array.from(new Set(sortArray.map(item => item.fecha))) // Elimina fechas duplicadas y deja solo fechas
    const newArray = Array.from(new Set(sortArray.map(item => item))) // Sortea x fechas 

    console.log('PROPS:',props) // array de componente en props
    console.log('Array de fechas: newArrayDate ',newArrayDate)
    console.log('Array sorteado: newArray ',newArray)


    const newArrayDateCount = newArrayDate.length //Contamos el total de fechas
    const newArrayCount = newArray.length // Contamos el total de registros de fechas

    console.log('Array total de SOLO fechas:',newArrayDateCount) 
    console.log('Array total de fechas en arreglo:',newArrayCount)


    const valueDate = []
    for (let t = 0; t < newArrayDate.length; t++) {
    
        let counter = 0;
        for (let i = 0; i < props.date.length; i++) {

            if (props.date[i].fecha === newArrayDate[t]) counter++;
        }

    console.log('del: ',newArrayDate[t],' son: ',counter); // 

    valueDate.push(counter)

    console.log('arreglo de vaolers:',valueDate)

    }
    

    const count = newArray.reduce((counter, { fecha }) => fecha === '19/4/2021' ? counter += 1 : counter, 0); 
    console.log('fecha con:',count)




    return (
        <div>            
            <Line
                data={{
                    labels: newArrayDate    ,    
                    datasets: [
                        {   
                            label: 'Faults by month' ,
                            data: valueDate,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)'
                            ],
                             borderWidth:1
                        },  
                        // {
                        //     label: 'Actions by month',
                        //     data: [47,52,67],
                        //     backgroundColor:'rgba(116, 235, 52,0.2)',
                        //     borderColor: 'green',
                        // }                     
                    ]               
                }}              
                height={600}
                width={400}
                options={{
                    maintainAspectRatio:true,
                    scales:{
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                }
                            }
                        ]
                    }
                }}
            />           
        </div>
    )
}

export default LineChart
