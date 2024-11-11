import {exerciseOptions, fetchData, youtubeOptions} from '../utils/fetchData'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ExerciseDetail = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [exerciseVideo, setExerciseVideos] = useState([]);



  useEffect(() => {
    const fetchExerciseDetails = async () => {
      try {
        const apiUrl = `https://exercisedb.p.rapidapi.com/exercises/${id}`;
        const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

        const exerciseDetailData = await fetchData(apiUrl, exerciseOptions)
        setExercise(exerciseDetailData);

        const exerciseVideoData = await fetchData(youtubeSearchUrl, youtubeOptions)
        setExerciseVideos(exerciseVideoData)

      } catch (error) {
        console.error('Error fetching exercise details:', error);
      }
    };

    fetchExerciseDetails();
  }, [id]);

  

  if (!exercise) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{exercise.name}</h1>
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        className="w-full h-64 object-cover mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">How to Perform:</h2>
      <p className="mb-4">{exercise.steps}</p>
      <h2 className="text-xl font-semibold mb-2">YouTube Videos:</h2>
      <ul>
        {exerciseVideo.youtubeLinks.map((link, index) => (
          <li key={index}>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Watch on YouTube
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseDetail;
