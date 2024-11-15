// src/components/MainContent.js

import React from 'react';

const MainContent = ({ songs, onPlaySong }) => {
    console.log('Rendering songs:', songs);  // Log songs to ensure data is passed

    return (
        <div className="w-3/4 p-6">
            <h1 className="text-4xl font-bold mb-4 text-black">Tracks</h1>
            <div className="grid grid-cols-3 gap-4">
                {songs.map((song, index) => (
                    <div 
                        key={index} 
                        className="p-4 bg-gray-200 rounded cursor-pointer" 
                        onClick={() => onPlaySong(song)}
                    >
                        <p className="text-black">{song.title}</p>
                        <p className="text-black">{song.artist.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainContent;
