import React from 'react'
import { Line } from  'react-chartjs-2'

const LineChart = (props) => {      

    return (
        <div>            
            <Line
                data={{
                    labels: props.x,  //PROPS x contiene las fechas unicas  
                    datasets: [
                        {   
                            label: 'Faults history' ,
                            data: props.y, //PROPS y contiene los valores de cada fecha
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)'
                                
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)'
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
 