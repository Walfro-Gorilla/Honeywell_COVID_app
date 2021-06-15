import React from 'react'
import { Bar,Line, Pie } from  'react-chartjs-2'

const PieChart = (props) => {
    const newArrayFaults = Array.from(new Set(props.data.map(item => item.fault))) // Elimina FAULTS duplicadas y deja solo faltas

    const valueFault = [] // creamos el aareglo de los valores x FAULT
    for (let u = 0; u < newArrayFaults.length; u++) { // inicioamos un FOR con limite la cantidad de FAULTS unicas      
        let counterFault = 0; //creamos el contador por FAULT
        for (let j = 0; j < props.data.length; j++) {  //iniciamos un FOR con limite la qty de total de registros a evaluar
            if (props.data[j].fault === newArrayFaults[u]) counterFault++; // SI la FAULT del arreglo completo coincide con la primer FAULT
            //sumariza en la variable counterFault.
        }

        // console.log('del: ',newArrayFaults[u],' son: ',counterFault); //   
        valueFault.push(counterFault) // agregamos el total x FAULT al array de valores totales  
        // console.log('arreglo x FAULTS:',valueFault)  
    }

    return (
        <div>
            <Pie
                data={{
                    labels: newArrayFaults,    
                    datasets: [
                        {
                        label: '# COVID actions' ,
                        data: valueFault,
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
