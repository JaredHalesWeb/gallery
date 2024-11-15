// src/components/MainContent.js

import React from 'react';

const MainContent = ({ artist, songs }) => {
    return (
        <div className="w-3/4 p-6">
            <h1 className="text-4xl font-bold mb-4">{artist.name}</h1>
            <p className="mb-6">{artist.description}</p>
            <h2 className="text-2xl font-semibold mb-4">Popular Songs</h2>
            <ul className="space-y-2">
                {songs.map((song, index) => (
                    <li key={index} className="p-2 bg-gray-200 rounded">{song.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default MainContent;
