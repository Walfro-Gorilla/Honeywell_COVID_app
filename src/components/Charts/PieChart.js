import React from 'react'
import { Bar,Line, Pie } from  'react-chartjs-2'

const PieChart = () => {
    return (
        <div>
            
            <Pie
                data={{
                    labels: ['Cubrebocas','Distancia','Antibacterial','Lavado de manos','Temperatura'],    
                    datasets: [
                        {
                        label: '# COVID actions' ,
                        data: [12,19,3,23,21],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(131, 52, 235, 0.2)',
                            'rgba(235, 52, 165, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(131, 52, 235, 1)',
                            'rgba(235, 52, 165, 1)'
                        ],
                        borderWidth:1
                        },  
                                            
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

export default PieChart
