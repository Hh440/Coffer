import React, { useState } from "react";
import { CgWebsite } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { Link } from 'react-router-dom';
import Chart from "../subpage/Chart";



export default function(){


    const menus=[
        {name:'dashboard',link:'/dashboard', icon:MdOutlineDashboard},
        {name:'setting',link:'/', icon:IoSettingsOutline},
        {name:'about',link:'/', icon:CgWebsite}
    ]
   
    const [open,setOpen]= useState(true)

    return(
        <div className="flex ">

            <div className={`bg-[#0e0e0e] min-h-screen ${open?'w-72':'w-16'} duration-500 text-gray-100 px-4`}>
                <div className="py-3 flex justify-end">
                    <HiMenuAlt3 size={26} 
                    className="cursor-pointer"
                     onClick={()=>setOpen(!open)}/>

                </div>
                <div className="mt-4 flex flex-col gap-4 relative">

                    {
                menus?.map((menu,i)=>(

                    <Link to={menu?.link} key={i} className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md">
                        <div>{React.createElement(menu?.icon,{size:"20"})}</div>
                        <h2 
                        style={{
                            transitionDelay:`${i+3}00ms`
                        }}
                        
                        className={`whitespace-pre duration-500 ${!open&&'opacity-0 translate-x-28 overflow-hidden'}`}>
                            {menu?.name}
                        </h2>
                    </Link>

                ))
                   }

                </div>

            </div>

            <div className="flex  w-full pl-10">
              <Chart/>

            </div>
            
        </div>
    )
}