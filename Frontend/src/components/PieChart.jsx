import { ArcElement, CategoryScale, Chart as ChartJS, Filler, LineElement, LinearScale, PointElement } from 'chart.js';


import { useEffect, useState } from 'react';

import axios from 'axios';

import { Pie } from 'react-chartjs-2';

export default function PieChart(){


    ChartJS.register(
        LineElement,
        PointElement,
        CategoryScale,
        LinearScale,
        ArcElement,
        Filler
    )


    const [chartData,setChartData]= useState({

        labels:[],
        datasets: [
          {
            label: 'Energy Intensity',
            data:[],
            borderColor: 'rgba(0,0,0,0)',
            backgroundColor: 'rgba(0,0,0,0)',
            fill: true
          }
        ]

    })


    useEffect(()=>{
         axios.get('http://localhost:3000/fetch-pestle-likelihood')
         .then(response=>{

          const data = response.data
          const labels = data.map((item) => item.pestle);
          const avgLikelihood = data.map((item) => item.avgLikelihood);           
            

            setChartData({
                labels: labels,
                datasets: [
                  {
                    label: 'Energy Intensity',
                    data: avgLikelihood,


                    backgroundColor: [

           'rgba(0, 204, 204, 1)',      // Cyan
          'rgba(108, 166, 181, 1)',      // Blue 108, 166, 181, 1
          'rgba(102, 0, 204, 1)',      // Purple
          'rgba(69,62, 109, 1)',      // Pink 69, 62, 109, 1
          'rgba(107, 65, 62, 1)',       // Red 107, 65, 62, 1
          'rgba(255, 153, 0, 1)',      // Orange
          'rgba(127, 97, 54, 1)',      // Yellow
          'rgba(109, 111, 49, 1)',      // Green 109, 111, 49, 1
          'rgba(36, 71, 50, 1)',
          'rgba(43, 107, 103, 1)',

                    ]  ,
                    fill: true
                  }
                ]
              });
             

         })
         .catch(e=>console.error("Error fetching data",e))
         
    },[])


    const option={
      plugins:{
        legend:{

          display:false

        }
      }
    }

    




    return( 

    <div className='shadow-white shadow-lg rounded-full'>
    <Pie data={chartData} options={option}/>

    </div>
    
    
    
    )

}