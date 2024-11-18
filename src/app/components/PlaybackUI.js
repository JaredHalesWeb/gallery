// src/app/components/PlaybackUI.js

import React, { useEffect } from 'react';
import Script from 'next/script';

const PlaybackUI = ({ currentSong, onPrevSong, onNextSong }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = 'YOUR_SPOTIFY_ACCESS_TOKEN';
            const player = new Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(token); }
            });

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                if (currentSong) {
                    window.fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
                        method: 'PUT',
                        body: JSON.stringify({ uris: [currentSong.uri] }),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    });
                }
            });

            player.connect();
        };

        return () => {
            document.body.removeChild(script);
        };
    }, [currentSong]);

    return (
        <div className="fixed bottom-0 w-full p-4 bg-gray-900 text-white flex flex-col items-center">
            <div className="w-full">
                <h3 className="text-lg">{currentSong ? currentSong.name : "No song playing"}</h3>
                <p className="text-sm">{currentSong ? currentSong.artists[0].name : ""}</p>
            </div>
            <div className="flex items-center space-x-4 mt-4">
                <button className="p-2 bg-gray-700 rounded" onClick={onPrevSong}>Prev</button>
                <button className="p-2 bg-gray-700 rounded" onClick={() => {
                    const player = new Spotify.Player({
                        getOAuthToken: cb => { cb('YOUR_SPOTIFY_ACCESS_TOKEN'); }
                    });
                    player.togglePlay();
                }}>Play</button>
                <button className="p-2 bg-gray-700 rounded" onClick={onNextSong}>Next</button>
            </div>
        </div>
    );
};

export default PlaybackUI;
