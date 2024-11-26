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
            <img src="/Images/RealDinoByte.png" alt="DinoByte" style={{ width: '100px', height: '100px' }} />
            <h2 className="text-2xl font-bold mb-6">DinoByte</h2>
            <nav>
                <ul className="space-y-3 text-xl">
                    <li className='cursor-pointer hover:bg-orange-400' onClick={() => handleClick("Made For You")}>Home</li>
                    <li className='cursor-pointer hover:bg-orange-400' onClick={() => handleClick("Jazz")}>Jazz</li>
                    <li className='cursor-pointer hover:bg-orange-400' onClick={() => handleClick("New Releases")}>New Releases</li>
                    <li className='cursor-pointer hover:bg-orange-400' onClick={() => handleClick("Happy Holidays")}>Happy Holidays</li>
                    <li className='cursor-pointer hover:bg-orange-400' onClick={() => handleClick("Hip-Hop")}>Hip-Hop</li>
                    <li className='cursor-pointer hover:bg-orange-400' onClick={() => handleClick("Country")}>Country</li>
                    <li className='cursor-pointer hover:bg-orange-400' onClick={() => handleClick("Pop")}>Pop</li>
                    <br />
                    <li className='hover:bg-orange-400'><Link href={"/info"}>How to use?</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
