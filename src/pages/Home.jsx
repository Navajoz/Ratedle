import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../inf/supabaseconfig';

export default function Home() {
    const [rankings, setRankings] = useState([]);

    useEffect(() => {
        const fetchRankings = async () => {
            const { data, error } = await supabase
                .from('ranking')
                .select('username, points')
                .order('points', { ascending: false })
                .limit(10);

            if (error) {
                console.error('Error fetching rankings:', error);
            } else {
                setRankings(data);
            }

        };

        fetchRankings();
    }, []);

    return (
        <div className="text-center mt-4 flex flex-col items-center">
            <h1 className="text-4xl mb-44">Home:</h1>
            <h2 className="text-2xl mb-4">Game Rankings:</h2>
            <ul className="bg-gray-900 w-96 justify-center text-center rounded border border-white">
                {rankings.map((rank, index) => (
                    <li key={index}>
                        <span className="font-bold">{index + 1} - {rank.username}:</span> {rank.points}
                    </li>
                ))}
            </ul>
            <Link
                to="/game"
                className="mt-6 px-4 py-2 bg-inherit text-white rounded border border-white"
            >
                Start Game
            </Link>
            <h2 className='mt-4 font-semibold'>Steam rating score guessing game</h2>
        </div>
    )
}
