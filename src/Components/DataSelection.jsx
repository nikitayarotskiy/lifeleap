import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Backend } from '../backend';

export default function DataSelection() {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [flag, setFlag] = useState('');
    const [selectedCountryPopulation, setSelectedCountryPopulation] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isValidCountry, setIsValidCountry] = useState(false);
    const navigate = useNavigate();

    const backend = new Backend();

    useEffect(() => {
        // Show the message by default when the component mounts
        setIsValidCountry(false);
    }, []);

    function handleInputChange(e) {
        setSelectedCountry(e.target.value);
        setIsValidCountry(false);
        setErrorMessage(null);
        setSelectedCountryPopulation(null);
    }

    async function calculatePopulation() {
        try {
            let data = await backend.getCountryData(selectedCountry);
            if (data) {
                setFlag(data.flags);
                setSelectedCountryPopulation(data.population);
                setErrorMessage(null);
                setIsValidCountry(true);
            } else {
                setErrorMessage('Invalid country or failed to fetch population data.');
                setSelectedCountryPopulation(null);
                setIsValidCountry(false);
            }
        } catch (error) {
            setErrorMessage('Error fetching population data.');
            setSelectedCountryPopulation(null);
            setIsValidCountry(false);
        }
    }

    function handleStart() {
        localStorage.setItem('country', selectedCountry);
        localStorage.setItem('population', selectedCountryPopulation);
        navigate('/');
    }

    return (
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
            <div className="form-control w-full">
                <label className="label mb-2">
                    <span className="text-gray-800 text-3xl font-semibold">Select Country</span>
                </label>
                <input
                    list="countries"
                    className="input input-bordered w-full px-4 py-2 border rounded-md text-white"
                    placeholder="Choose a country"
                    value={selectedCountry}
                    onChange={handleInputChange}
                />
                <datalist id="countries">
                    <option value="USA"></option>
                    <option value="Canada"></option>
                    <option value="UK"></option>
                    <option value="Germany"></option>
                    <option value="Australia"></option>
                </datalist>
            </div>

            <div className='w-full h-[5px] bg-black mt-2 mb-2 rounded-full'></div>

            <div className="w-full h-[100px] flex flex-col items-center justify-center mt-6 mb-6">
                {/* Show text when no valid country and user is inputting */}
                {!isValidCountry && (
                    <h2 className="text-gray-700 text-lg text-center">Select a country to see population</h2>
                )}

                {/* Combined Flag and Population/Error Message */}
                {selectedCountryPopulation && (
                    <div className="flex flex-col items-center">
                        {/* Flag with improved layout */}
                        <div className="w-24 h-16 flex justify-center items-center overflow-hidden rounded-md shadow-lg mb-2">
                            <img src={flag} alt="Country Flag" className="object-cover w-full h-full" />
                        </div>

                        {/* Population display */}
                        <h3 className="text-gray-800 text-lg font-semibold mt-2">
                            Population: {selectedCountryPopulation}
                        </h3>
                    </div>
                )}

                {/* Error message display */}
                {errorMessage && (
                    <div className="h-12 flex justify-center items-center mt-4">
                        <h3 className="text-red-600 text-lg font-semibold">
                            {errorMessage}
                        </h3>
                    </div>
                )}
            </div>

            <div className='w-full h-[5px] bg-black mt-2 mb-2 rounded-full'></div>

            {isValidCountry ? (
                <button
                    className="w-full bg-neutral h-14 rounded-lg text-2xl text-white font-semibold hover:bg-green-900 transition duration-300"
                    onClick={handleStart}
                >
                    START
                </button>
            ) : (
                <button
                    className="w-full bg-black h-14 rounded-lg text-2xl text-white font-semibold hover:bg-gray-800 transition duration-300"
                    onClick={calculatePopulation}
                >
                    Check Population
                </button>
            )}
        </div>
    );
}
