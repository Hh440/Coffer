import axios from "axios";
import { useEffect, useState } from "react";

export default function Source(){

    const[source,setSource]=useState(0);

    useEffect(()=>{
        async function fetchData(){
            const response = await axios.get('http://localhost:3000/fetch-source');
            const data= response.data;

            setSource(data);
        }


        fetchData()
    },[])



    return(
        <div>
   <div className="w-60 h-40 border  rounded-md shadow-lg grid  p-6 ">
    <div className="flex items-center justify-between">
        <div className="text-6xl font-bold">{source}</div>
        <SourceIcon className="w-20 h-20 fill-primary" />
        
        
    </div>
    <h3>Sources</h3>
   
   
 </div>
    
</div>


    )
}

function SourceIcon(props){

    return(
        <svg
        {...props}
        
        xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 64 80" x="0px" y="0px" stroke="currentColor">
    <path d="M60,1H36a3,3,0,0,0-3,3V16.66A19.64,19.64,0,0,0,28,16,20,20,0,0,0,8,36a19.76,19.76,0,0,0,
    1.38,7.3L7.49,45.19a2,2,0,0,0,0,2.83l1.06,1.06L1.24,56.39l1.42,1.42L10,50.5,13.5,54,6.19,61.34l1.42,
    1.42,7.31-7.31L16,56.51a2,2,0,0,0,2.83,0l1.89-1.89A19.91,19.91,0,0,0,41.18,51H60a3,3,0,0,0,3-3V4A3,
    3,0,0,0,60,1ZM28,54a17.91,17.91,0,0,1-7.14-1.48,1,1,0,0,0-1.11.21l-2.36,2.36L8.91,46.61l2.36-2.36a1,
    1,0,0,0,.21-1.11A18,18,0,1,1,28,54Zm33-6a1,1,0,0,1-1,1H43.17a22.87,22.87,0,0,0,1.52-2H61Zm0-3H45.84A19.93,
    19.93,0,0,0,35,17.29V7H61ZM61,5H35V4a1,1,0,0,1,1-1H60a1,1,0,0,1,1,1Z"/><path d="M20,36a3,3,0,0,1,3-3h3a3,3,0,0,
    1,3,3,3.14,3.14,0,0,1-.09.75l1.93.5A4.82,4.82,0,0,0,31,36a5,5,0,0,0-5-5H23a5,5,0,0,0
    ,0,10h2V39H23A3,3,0,0,1,20,36Z"/><path d="M33,31H31v2h2a3,3,0,0,1,0,6H30a3,3,0,0,1-3-3,3.14,3.14,0,
    0,1,.09-.75l-1.93-.5A4.82,4.82,0,0,0,25,36a5,5,0,0,0,5,5h3a5,5,0,0,0,0-10Z"/><path d="M28,20A16,16,0,1,0,44,36,16,
    16,0,0,0,28,20Zm0,30A14,14,0,1,1,42,36,14,14,0,0,1,28,50Z"/><path d="M41,14H55v9H48v2h8a1,1,0,0,0,1-1V13a1,1,0,0,0-1-1H40a1,
    1,0,0,0-1,1v3h2Z"/><rect x="51" y="31" width="6" height="2"/><rect x="51" y="37" width="6" height="2"/></svg>
    )

}