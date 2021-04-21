import React from 'react'
import { Bar,Line, Pie } from  'react-chartjs-2'

const LineChart = () => {
    return (
        <div>
            
            <Line
                data={{
                    labels: ['January','February','March'],    
                    datasets: [
                        {
                        label: 'Faults by month' ,
                        data: [55,71,32],
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
                        {
                            label: 'Actions by month',
                            data: [47,52,67],
                            backgroundColor:'rgba(116, 235, 52,0.2)',
                            borderColor: 'green',
                        }                     
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
