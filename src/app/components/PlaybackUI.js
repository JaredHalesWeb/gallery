import React, { useContext, useEffect, useState } from 'react';
import { SpotifyContext } from '../context/SpotifyProvider';

const PlaybackUI = () => {
    const { spotify } = useContext(SpotifyContext);
    const currentSong = spotify?.currentSong;

    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // useEffect(() => {
    //     if (spotify?.player) {
    //         const player = spotify.player;

    //         player.addListener('player_state_changed', (state) => {
    //             if (state) {
    //                 setDuration(state.duration);
    //                 setProgress(state.position);
    //                 setIsPlaying(!state.paused);
    //             }
    //         });

    //         return () => {
    //             player.removeListener('player_state_changed');
    //             player.removeListener('initialization_error');
    //             player.removeListener('authentication_error');
    //             player.removeListener('account_error');
    //             player.removeListener('playback_error');
    //         };
    //     }
    // }, [spotify?.player]);

    const togglePlay = () => {
        if (spotify.player) {
            spotify.player.togglePlay().catch(error => console.error('Error toggling play:', error));
        }
    };

    const handleNext = () => {
        if (spotify.player) {
            spotify.player.nextTrack().catch(error => console.error('Error skipping to next track:', error));
        }
    };

    const handlePrev = () => {
        if (spotify.player) {
            spotify.player.previousTrack().catch(error => console.error('Error skipping to previous track:', error));
        }
    };

    return (
        <div className="fixed bottom-0 w-full p-4 bg-gray-900 text-white flex flex-col items-center">
            <div className="w-full">
                <h3 className="text-lg">{currentSong ? currentSong.name : "No song playing"}</h3>
                <p className="text-sm">{currentSong ? currentSong.artists[0].name : ""}</p>
            </div>
            <div className="w-full mt-2">
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={progress}
                    className="w-full"
                    readOnly
                />
                <div className="flex justify-between text-sm mt-1">
                    <span>{Math.floor(progress / 60000)}:{("0" + (Math.floor(progress / 1000) % 60)).slice(-2)}</span>
                    <span>{Math.floor(duration / 60000)}:{("0" + (Math.floor(duration / 1000) % 60)).slice(-2)}</span>
                </div>
            </div>
            <div className="flex items-center space-x-4 mt-4">
                <button className="p-2 bg-gray-700 rounded" onClick={handlePrev}>Prev</button>
                <button id="togglePlay" className="p-2 bg-gray-700 rounded" onClick={togglePlay}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button className="p-2 bg-gray-700 rounded" onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default PlaybackUI;
