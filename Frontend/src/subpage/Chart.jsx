    import { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import BubbleChart from "../components/BubbleChart";
import PieChart from "../components/PieChart";
import Tabular from "../components/Tabular";
import Topsec from "../components/Topsec";
import motivationalPhrases, { backgroundImages } from "../hook/motivationalPhrases";
    
    export default function Chart() {
    const [selectedPhrase, setSelectedPhrase] = useState("");
    
    useEffect(() => {
        const randomPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
        setSelectedPhrase(randomPhrase);
    }, []);
  
    const backgroundImageStyle = {
        backgroundImage: backgroundImages[selectedPhrase],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    };
    const backgroundImagepie = {
        backgroundImage: "url(/img/piechart.jpeg)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    };
    return (
        <div className="p-4">
        <div>
            <Topsec />
        </div>
    
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 h-auto mt-4">
            <div className="flex justify-center shadow-lg w-full rounded-lg">
            <div className="w-full">
                <BarChart />
            </div>
            </div>
    
            <div
            className="flex justify-center items-end bg-gray-800 p-6 rounded-lg shadow-lg"
            style={backgroundImageStyle}
            >
            <p className="text-xl font-semibold italic text-black relative text-shadow-lg shadow-white duration-75"

            style={{
                transitionDelay:'400ms'
            }}
            
            >
                {selectedPhrase}
            </p>
            </div>
        </div>
    
    
        <div className="pt-8 grid gap-4 grid-cols-1 md:grid-cols-2 ">
                <div className="flex justify-center  items-center shadow-lg rounded-lg w-fit ml-6 ">
                    <div className=" pt-4  ">
                        <Tabular />
                    </div>
                </div>
                <div className="flex justify-center items-center shadow-lg bg-slate-700 bg-blend-darken rounded-lg ">
                    <PieChart/>
                </div>
            </div>
    
        <div className="mt-16 rounded-lg  h-auto  ">
            <div className="flex justify-center shadow-lg rounded-lg  w-full   ">
                <div className="w-full h-auto">
                    <BubbleChart   />
            </div>
            </div>
        </div>
        </div>
    );
    }
    