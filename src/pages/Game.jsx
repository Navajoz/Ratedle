import React, { useEffect, useState } from 'react';
import SuspendedList from '../components/SuspendedList';
import supabase from '../inf/supabaseconfig';
import heartIcon from '../assets/heart-svgrepo-com.svg'
import GameOver from '../components/GameOver';

export default function Game() {
  const [gameData, setGameData] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [lifes, setLifes] = useState(3);
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleGuess = (value) => {
    if (value === gameData.rating) {
      setPoints((prevPoints) => prevPoints + 100);
      getNextGame();
    } else {
      setLifes((prevLifes) => prevLifes - 1);
      if (lifes === 1) {
        setIsGameOver(true);
      }
    }
  };

  const getNextGame = () => {
    const randomGameId = Math.floor(Math.random() * 100) + 1;
    setGameId(randomGameId);
  };

  useEffect(() => {
    const fetchInitialGameData = async () => {
      const randomGameId = Math.floor(Math.random() * 100) + 1;
      setGameId(randomGameId);
    };

    fetchInitialGameData();
  }, []);

  useEffect(() => {
    if (gameId !== null) {
      const fetchGameData = async () => {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from('games')
            .select()
            .eq('id', gameId)
            .single();

          if (error) {
            console.error('Error fetching game data:', error);
          } else {
            setGameData(data);
          }
        } catch (error) {
          console.error('Error fetching game data:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchGameData();
    }
  }, [gameId]);

  if (isLoading || !gameData) {
    return <div>Loading...</div>;
  }
  if (isGameOver) {
    return <GameOver points={points} />;
  }

  return (
    <div className="grid justify-center text-center mt-40">
    <div className='flex justify-center mt-3'>
      {Array.from({ length: lifes }).map((_, index) => (
        <img src={heartIcon} key={index} className='w-8 mx-1' />
      ))}
    </div>
    <h1 className="text-4xl mb-4">{gameData.title}:</h1>
    
    {/* Improved image container with consistent sizing */}
    <div className="flex justify-center mb-4">
      <img 
        src={gameData.image} 
        alt={gameData.title} 
        className="border border-white rounded max-h-64 object-contain" 
      />
    </div>
    
    <SuspendedList onGuess={handleGuess} />
    <div className="text-2xl font-bold mt-4">Points: {points}</div>
  </div>
  );
}
