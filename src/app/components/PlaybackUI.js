import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlaybackUI = ({ currentSong, onPrevSong, onNextSong, accessToken }) => {
    const [player, setPlayer] = useState(undefined);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [token, setToken] = useState(accessToken);

    const refreshAccessToken = async () => {
        if (!accessToken) {
            console.error('No refresh token available');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8889/refresh_token?refresh_token=${accessToken}`);
            setToken(response.data.access_token);
        } catch (error) {
            console.error('Error refreshing token:', error);
        }
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(token); }
            });

            player.addListener('authentication_error', ({ message }) => {
                console.error('Failed to authenticate:', message);
                refreshAccessToken();
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
                    }).catch(error => {
                        console.error('Error playing song:', error);
                        if (error.status === 401) {
                            refreshAccessToken();
                        }
                    });
                }
            });

            player.connect();
            setPlayer(player);
        };

        return () => {
            document.body.removeChild(script);
        };
    }, [token, currentSong]);

    if (!currentSong) return null;

    return (
        <>
            <div className="container">
                <div className="main-wrapper">
                    <img src={currentSong?.album?.images[0]?.url} 
                         className="now-playing__cover" alt="" />
    
                    <div className="now-playing__side">
                        <div className="now-playing__name">{currentSong?.name}</div>
    
                        <div className="now-playing__artist">{currentSong?.artists[0]?.name}</div>
                    </div>
                </div>
            </div>
         </>
    );
};

export default PlaybackUI;
