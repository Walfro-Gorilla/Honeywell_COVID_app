import React from 'react'
import { Bar,Line, Pie } from  'react-chartjs-2'

const PieChart = (props) => {

    return (
        <div>
            
            <Pie
                data={{
                    labels: props.x,    
                    datasets: [
                        {
                        label: '# COVID actions' ,
                        data: props.y,
                        backgroundColor: [
                            'rgba(180, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(131, 52, 235, 0.2)',
                            'rgba(235, 52, 165, 0.2)'
                        ],
                        borderColor: [
                            'rgba(180, 99, 132, 1)',
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
