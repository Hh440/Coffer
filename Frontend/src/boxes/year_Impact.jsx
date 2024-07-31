import axios from "axios"
import { useEffect, useState } from "react"

export default function Year_Impact(){
    const[data,setData]= useState({end_year:'',avgImpact:0})

    useEffect(()=>{
        async function fetchData(){
            const response= await axios.get('http://localhost:3000/fetch-impact-end-year')
            const data = await response.data
            console.log(data)

            setData(data)
        }

        fetchData()
    },[])


    return(
        <div>

            <div className="w-60 h-40 border  rounded-md shadow-lg grid  p-6 ">
                <div className="flex items-center justify-between">
                  <div className="text-6xl font-bold">{data.avgImpact}</div>
                  <ActivityIcon className="w-12 h-12 fill-primary"/>
                </div>

                <h3>Impact</h3>

                <div className="text-muted-foreground">Year: {data.end_year}</div>
            </div>
            
                
            
        </div>
    )
}



function ActivityIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
      </svg>
    )
  }
  