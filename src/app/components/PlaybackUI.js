// src/app/components/PlaybackUI.js

import React, { useEffect } from 'react';
import Script from 'next/script';

const PlaybackUI = ({ currentSong, onPrevSong, onNextSong }) => {
    useEffect(() => {
        if (currentSong && window.DZ) {
            window.DZ.player.playTracks([currentSong.id]);
        }
    }, [currentSong]);

    return (
        <div className="fixed bottom-0 w-full p-4 bg-gray-900 text-white flex flex-col items-center">
            <Script
                src="https://e-cdns-files.dzcdn.net/js/min/dz.js"
                strategy="afterInteractive"
                onLoad={() => {
                    console.log('Deezer SDK loaded');
                    if (!document.getElementById('dz-root')) {
                        console.error('dz-root element not found.');
                    } else {
                        window.DZ.init({
                            appId: 'YOUR_DEEZER_APP_ID',
                            channelUrl: 'http://localhost:3000/callback',
                            player: {
                                container: 'dz-root',
                                width: 300,
                                height: 300,
                                playlist: true,
                                autoplay: true,
                                onload: function() {
                                    console.log('Deezer player is ready');
                                }
                            }
                        });
                    }
                }}
            />
            <div className="w-full">
                <h3 className="text-lg">{currentSong ? currentSong.title : "No song playing"}</h3>
                <p className="text-sm">{currentSong ? currentSong.artist.name : ""}</p>
            </div>
            <div className="flex items-center space-x-4 mt-4">
                <button className="p-2 bg-gray-700 rounded" onClick={onPrevSong}>Prev</button>
                <button className="p-2 bg-gray-700 rounded" onClick={() => window.DZ.player.play()}>Play</button>
                <button className="p-2 bg-gray-700 rounded" onClick={onNextSong}>Next</button>
            </div>
        </div>
    );
};

export default PlaybackUI;
