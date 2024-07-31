import { BarElement, CategoryScale, Chart as ChartJS, LinearScale } from 'chart.js';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import axios from 'axios';


ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  

)

export default function BarChart(){



  

  const[chartData,setChartData]= useState({labels: [], counts: []})



  useEffect(()=>{
    async function fetchData(){
try{
    const response = await axios.get('http://localhost:3000/fetch-sector')
    const data = await response.data
    setChartData(data)
    console.log(data)
    
}catch(e){
    console.log("Error encountered",e)
}
    
}

fetchData()

},[])





const data ={
  labels: chartData.labels,
          datasets: [
            {
              label: 'Number of Entries',
              data: chartData.counts,
              backgroundColor: [

                'rgba(75, 192, 192, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 99, 132, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(255, 205, 86, 0.8)',
                 'rgba(201, 203, 207, 0.8)'
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 99, 132, 1)',
                          'rgba(255, 159, 64, 1)',
                          'rgba(255, 205, 86, 1)',
                          'rgba(201, 203, 207, 1)'
              ],
              borderWidth: 2
            }
          ]
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: 'white'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.7)',
      borderWidth: 1
    }
  },
  scales: {
    x: {
      ticks: {
        color: 'white',
        display: false
      },
      grid: {
        display: false
      }
    },
    y: {
      ticks: {
        color: 'white'
      },
      grid: {
        display:false,
      }
    }
  }
};


  

    


    



    return(
        <div className='p-4 bg-gray-800 rounded-lg shadow-lg'>

            <Bar data={data}  options={options}/>

        </div>
    )
}