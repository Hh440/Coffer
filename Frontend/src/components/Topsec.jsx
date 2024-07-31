import Pestle from "../boxes/Pestle";
import Source from "../boxes/Souce";
import Topic from "../boxes/topic";
import Year_Impact from "../boxes/year_Impact";

export default function TopSec(){
    return(
        <div className="flex flex-row pt-1 ">

           <div className="m-6 bg-stone-200 rounded-lg">
             <Topic/>
           </div>
           <div className="m-6 bg-stone-200 rounded-lg">
             <Year_Impact/>
           </div>
           <div className="m-6 bg-stone-200 rounded-lg">
            <Source/>
           </div>
           <div className="m-6 bg-stone-200 rounded-lg">
            <Pestle/> 
           </div>
            

        </div>
    )
}