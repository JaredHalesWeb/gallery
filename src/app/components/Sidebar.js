// src/components/Sidebar.js

"use client"

import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { SpotifyContext } from '../context/SpotifyProvider';

const Sidebar = () => {
    const {setSongCategory} = useContext(SpotifyContext)

    const handleClick = (category) => {
        setSongCategory(category)
    }

    return (
        <div className="w-1/4 h-screen bg-gray-800 text-white p-4">
            <img src="/Images/DinoByte.png" alt="DinoByte" style={{ width: '100px', height: '100px' }} />
            <h2 className="text-2xl font-bold mb-6">DinoByte</h2>
            <nav>
                <ul className="space-y-3 text-xl">
                    <li className='hover:bg-blue-300'><Link href={"/"}>Home</Link></li>
                    <li className='cursor-pointer hover:bg-blue-300' onClick={() => handleClick("trends")}>Trends</li>
                    <li className='cursor-pointer hover:bg-blue-300' onClick={() => handleClick("trends")}>Discovery</li>
                    <li className='cursor-pointer hover:bg-blue-300' onClick={() => handleClick("playlists")}>Library</li>
                    <li className='cursor-pointer hover:bg-blue-300' onClick={() => handleClick("trends")}>Recent</li>
                    <li className='cursor-pointer hover:bg-blue-300' onClick={() => handleClick("trends")}>Favorites</li>
                    <li className='cursor-pointer hover:bg-blue-300' onClick={() => handleClick("trends")}>Favorite Artist</li>
                    <br />
                    <li className='hover:bg-blue-300'><Link href={"/info"}>How to use?</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
