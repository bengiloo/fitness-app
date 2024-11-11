import { useState } from 'react';
import {exerciseOptions, fetchData} from '../utils/fetchData'
import { redirect } from "react-router-dom"
const Searchbar = () => {
  const [text, setText] = useState('');
  const [exercises, setExercises] = useState([]);
  const handleSearch = async () =>{
    try {
      if (text) {
        const exercisesData =  await fetchData('https://exercisedb.p.rapidapi.com/exercises',exerciseOptions);
  
        const searchedExercises = exercisesData.filter(
          (exercise) => exercise.name.toLowerCase().includes(text.toLowerCase())
          || exercise.target.toLowerCase().includes(text.toLowerCase())
          || exercise.equipment.toLowerCase().includes(text.toLowerCase())
          || exercise.bodyPart.toLowerCase().includes(text.toLowerCase())
        )
        setText('');
        setExercises(searchedExercises);
        window.scrollTo({ top: 1800, behavior: 'smooth' });
      }
      else {
        console.log('Fetched data is not an array')
      }
    }
    catch (error){
      console.error('Error fetching exercises.', error)
    }
  }
  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  }
  return (
    <div>
      <h1 className="sm:text-6xl text-center tracking-wide flex-row mb-3">
        Exercise Search
      </h1>
      <span className="text-lg bg-gradient-to-r from-blue-500 to-cyan-800 text-transparent bg-clip-text">
          Search through our curated database filled with vast exercises.
      </span>
      <div className="relative w-full max-w-xl px-4 mt-6"> {/* Parent div for Searchbar */}
        <input
          type="text"
          value={text}
          className="w-full h-12 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-white 
          hover:shadow-lg"
          placeholder="🔎 Search"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleEnterKey}
        />
        {text !== '' && (
          <button
            type="button"
            className="absolute right-10 bottom-2.5 text-2xl text-white hover:text-gray-700"
            onClick={() => setText('')}
          >
            X
          </button>
        )}
      </div>
      {/* Display the cards after search */}
      {exercises.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="card bg-white shadow-lg rounded-lg cursor-pointer"
              onClick={() => redirect(`/exercise/${exercise.id}`)} // Navigate to the detailed page
            >
              <div className="relative">
                <img
                  src={exercise.gifUrl} // Use the GIF or image URL here
                  alt={exercise.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-40 p-2 text-white text-center">
                  {exercise.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
