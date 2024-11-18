// src/app/components/PlaybackUI.js

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

// var spotify_client_id = process.env.SPOTIFY_CLIENT_ID
// var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

const PlaybackUI = ({ currentSong, onPrevSong, onNextSong, accessToken }) => {
    const [player, setPlayer] = useState(undefined);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);

    console.log(accessToken);
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(accessToken); }
            });
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                if (currentSong) {
                    window.fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
                        method: 'PUT',
                        body: JSON.stringify({ uris: [currentSong.uri] }),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                        },
                    });
                }
            });

            player.connect();
        };

        return () => {
            document.body.removeChild(script);
        };
    }, [currentSong, accessToken]);
    if (!currentSong) return null
    return (
        <>
            <div className="container">
                <div className="main-wrapper">
                    <img src={currentSong?.album?.images[0].url} 
                         className="now-playing__cover" alt="" />
    
                    <div className="now-playing__side">
                        <div className="now-playing__name">{
                                      currentSong?.name
                                      }</div>
    
                        <div className="now-playing__artist">{
                                      currentSong?.artists[0].name
                                      }</div>
                    </div>
                </div>
            </div>
         </>
    )
}    

export default PlaybackUI;
