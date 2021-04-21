import React from 'react'
import { Bar,Line, Pie } from  'react-chartjs-2'

const BarChart = () => {
    return (
        <div>
            
            <Bar
                data={{
                    labels: ['Red','Blue','Orange'],    
                    datasets: [
                        {
                        label: '# COVID actions' ,
                        data: [12,19,3],
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
                            label: 'Quantity',
                            data: [47,52,67,58,9,50],
                            backgroundColor:'Orange',
                            borderColor: 'red',
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

export default BarChart
