// src/components/MainContent.js

import React from 'react';

const MainContent = ({ songs, onPlaySong }) => {
    console.log('Rendering songs:', songs);  // Log songs to ensure data is passed

    return (
        <div className="w-3/4 p-6">
            <h1 className="text-4xl font-bold mb-4 text-black">Tracks</h1>
            <div className="grid grid-cols-5 gap-2">  {/* Reduced the gap between columns */}
                {songs.map((song, index) => {
                    const albumName = song ? song.name : 'Unknown Album';
                    const artistName = song.artists && song.artists.length > 0 ? song.artists[0].name : 'Unknown Artist';
                    const albumArt = song && song.images && song.images.length > 0 ? song.images[0].url : '';

                    return (
                        <div 
                            key={index} 
                            className="rounded cursor-pointer relative bg-cover bg-center" 
                            onClick={() => onPlaySong(song)}
                            style={{
                                backgroundImage: `url(${albumArt})`,
                                width: '100%',   // Scaled down width to 70%
                                paddingBottom: '100%', // Maintains the 1:1 aspect ratio
                                position: 'relative',
                                margin: '0 auto' // Centers the div within its container
                            }}
                        >
                            <div 
                                className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center"
                            >
                                <p className="text-white font-bold">{albumName}</p>
                                <p className="text-white">{artistName}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MainContent;
