import React from 'react';

export default function StatisticsDisplay() {
  return (
    <div className="w-full h- mb-8 flex flex-col bg-white rounded-lg shadow-md items-center justify-start">
      <div className="w-full mt-5 p-4 rounded-t-lg flex items-center justify-between bg-white text-green-900">
        <h1 className="text-2xl font-bold">LifeLeap</h1>
        <h2 id="yearCounter" className="text-xl">YEAR: 1</h2>
      </div>

      <div className="w-full mt-5 p-6 rounded-lg bg-white text-green-900 flex flex-col items-center">
        <h2 className="text-3xl font-semibold">Statistics</h2>
        <div className="w-[80%] h-[6px] bg-green-900 my-4"></div>

        <div className="flex flex-col items-center mb-6">
          <h3 className="text-xl">Total Population</h3>
          <h4 id="totalPopulationCounter" className="text-4xl font-bold">123,321,421</h4>
        </div>

        <div className="w-full flex justify-around mb-6">
          <div className="text-center">
            <h3 className="text-xl">Male</h3>
            <h4 id="malePer" className="text-4xl font-bold">55%</h4>
          </div>
          <div className="text-center">
            <h3 className="text-xl">Female</h3>
            <h4 id="femalePer" className="text-4xl font-bold">45%</h4>
          </div>
        </div>

        <div className="w-full flex justify-around mb-6">
          <h3 id="bornCount" className="text-lg">Total Born: 0</h3>
          <h3 id="deadCount" className="text-lg">Total Dead: 0</h3>
        </div>
      </div>

      <div className="w-full mt-5 p-6 rounded-b-lg bg-white text-green-900 flex flex-col items-center">
        <h2 className="text-2xl font-semibold">Add Years</h2>

        <div className="w-full flex justify-between mt-4">
          {[1, 5, 10, 25, 50, 75].map((value) => (
            <button
              key={value}
              className="bg-green-600 text-white text-lg w-[18%] h-[40px] border-2 border-green-900 rounded-lg"
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
