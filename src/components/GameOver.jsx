import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../inf/supabaseconfig';

export default function GameOver({ points }) {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (nickname.trim() === '') {
      alert('Please enter your username.'); 
      return;
    }

    const { data, error } = await supabase.from('ranking').insert({
      username: nickname,
      points: points,
    });

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="grid justify-center text-center mt-40">
      <h1 className="text-4xl mb-4">Game Over</h1>
      <h2 className="text-2xl mb-4">Your Score: {points}</h2>
      <div className="mb-4">
        <label htmlFor="nickname" className="block text-lg font-bold">
          Enter Your Username:
        </label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="px-4 py-2 border bg-inherit border-gray-300 rounded w-64"
          required 
        />
      </div>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-inherit text-white hover:bg-inherit border border-white rounded"
      >
        Submit Score
      </button>
    </div>
  );
}