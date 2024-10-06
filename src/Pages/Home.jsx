import React, { useState, useEffect } from 'react';
import StatisticsDisplay from '../Components/StatisticsDisplay';
import PopulationGrid from '../Components/PopulationGrid';
import { generateData, generateList } from '../logic';
import Buttons from '../Components/Buttons';

export default function Home() {
    const [populationList, setPopulationList] = useState([]);
    const [statistics, setStatistics] = useState({}); // Initialize as an empty object

    useEffect(() => {
        const fetchData = async () => {
            setPopulationList(generateList(100))
    
            const population = localStorage.getItem('population'); // Ensure the key is a string
            console.log(population)
            const generatedStats = generateData(Number(population)); // Call to generate data, converting to a number
            setStatistics(generatedStats); // Set statistics
            console.log(statistics)
        };
    
        fetchData(); // Call the async function
    }, []);
    

    return (
        <div className="flex w-full min-h-screen bg-neutral p-4">

            <div className="w-2/3 bg-white p-6 rounded shadow-md">

                <h2 className="text-black text-5xl">POPULATION</h2>
                <div className="w-full bg-black h-[5px] rounded mb-4"></div>
                <PopulationGrid populationList={populationList} />
            </div>

            <div className='w-1/3 h-full fixed top-4 right-0'>
                <div className="pl-2 pr-2">
                    <StatisticsDisplay statistics={statistics} /> {/* Pass statistics as a prop */}
                    <Buttons statistics={statistics} setStatistics={setStatistics} populationList={populationList} setPopulationList={setPopulationList}  />
                </div>
            </div>
           
        </div>
    );
}
