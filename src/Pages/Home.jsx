import React, { useState, useEffect } from 'react';
import StatisticsDisplay from '../Components/StatisticsDisplay';
import PopulationGrid from '../Components/PopulationGrid';

export default function Home() {
    const [populationList, setPopulationList] = useState([]);

    useEffect(() => {
        // Fetch or generate the population list here if needed
        const generatedList = Array.from({ length: 100 }, (_, i) => ({
            imgSrc: "https://us-tuna-sounds-images.voicemod.net/2151310d-7f2b-4765-b1dd-7dd145652cac-1705982611885.png",
            name: `Person ${i + 1}`,
            gender: i % 2 === 0 ? 'Male' : 'Female', // Alternates gender between Male and Female
            age: Math.floor(Math.random() * 60) + 20, // Random age between 20 and 80
        }));
        setPopulationList(generatedList);
    }, []);

    return (
        <div className="flex w-full min-h-screen bg-neutral">
            <div className="w-[60%] bg-white p-6 rounded-lg shadow-md m-4">
                <h2 className="text-gray-800 text-[45px]">POPULATION</h2>
                <div className="w-full bg-neutral h-[5px] rounded mb-4"></div>
                <PopulationGrid populationList={populationList} />
            </div>

            <div className="fixed top-0 right-0 w-[37%] h-full m-4">
                <StatisticsDisplay />
            </div>
        </div>
    );
}
