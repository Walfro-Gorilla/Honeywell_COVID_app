import React from 'react'
import { Line } from  'react-chartjs-2'

const LineChart = (props) => {     
    
    const newArrayDate = Array.from(new Set(props.data.map(item => item.fecha))) // Elimina FECHAS duplicadas y deja solo fechas

    const valueDate = [] // creamos el aareglo de los valores x fecha
    for (let t = 0; t < newArrayDate.length; t++) { // inicioamos un FOR con limite la cantidad de fechas unicas

        let counter = 0; //creamos el contador por fecha
        for (let i = 0; i < props.data.length; i++) {  //iniciamos un FOR con limite la qty de total de registros a evaluar

            if (props.data[i].fecha === newArrayDate[t]) counter++; // SI la fecha del arreglo completo coincide con la primer fecha
            //sumariza en la variable counter
        }

        //console.log('del: ',newArrayDate[t],' son: ',counter); 

        valueDate.push(counter) // agregamos el total x fecha al array de valores totales

        // console.log('arreglo x DATES:',valueDate)

    }

    return (
        <div>            
            <Line
                data={{
                    labels: newArrayDate,  //PROPS x contiene las fechas unicas  
                    datasets: [
                        {   
                            label: 'Faults history' ,
                            data: valueDate, //PROPS y contiene los valores de cada fecha
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
 