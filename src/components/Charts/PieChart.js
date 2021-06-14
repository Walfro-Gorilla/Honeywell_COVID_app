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
                            'rgba(255, 255, 0, 0.3)',
                            'rgba(178, 255, 0, 0.3)',
                            'rgba(255, 0, 178, 0.3)',
                            'rgba(0, 210, 255, 0.3)',
                            'rgba(255, 40, 0, 0.3)',
                            'rgba(0, 255, 167, 0.3)',
                            'rgba(199, 0, 255, 0.3)',
                            'rgba(173, 255, 0, 0.3)',
                            'rgba(258, 52, 165, 0.2)',
                            'rgba(199, 52, 165, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 255, 0, 1)',
                            'rgba(178, 255, 0, 1)',
                            'rgba(255, 0, 178, 1)',
                            'rgba(0, 210, 255, 1)',
                            'rgba(255, 40, 0, 1)',
                            'rgba(0, 255, 167, 1)',
                            'rgba(199, 0, 255, 1)',
                            'rgba(173, 255, 0, 1)',
                            'rgba(258, 52, 165, 1)',
                            'rgba(199, 52, 165, 1)'
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
