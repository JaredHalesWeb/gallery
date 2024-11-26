import React, { useContext, useEffect, useState } from 'react';
import { SpotifyContext } from '../context/SpotifyProvider';
import { FaShuffle, FaRepeat  } from "react-icons/fa6";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";

const PlaybackUI = () => {
    const { spotify } = useContext(SpotifyContext);
    const currentSong = spotify?.currentSong;

    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1); // Volume state (range from 0 to 1)
    const [isShuffling, setIsShuffling] = useState(false);
    const [isLooping, setIsLooping] = useState(false);

    useEffect(() => {
        if (spotify?.player) {
            const player = spotify.player;

            const updateProgress = setInterval(() => {
                player.getCurrentState().then((state) => {
                    if (state) {
                        setDuration(state.duration);
                        setProgress(state.position);
                        setIsPlaying(!state.paused);
                    }
                });
            }, 100); // Update progress every 1 second

            return () => {
                clearInterval(updateProgress); // Cleanup interval when component unmounts or when player changes
            };
        }
    }, [spotify?.player]);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollHeight = document.documentElement.scrollHeight;
    //         const scrollTop = document.documentElement.scrollTop;
    //         const clientHeight = document.documentElement.clientHeight;

    //         if (scrollHeight - scrollTop - clientHeight < 100) {
    //             setIsVisible(false);
    //         } else {
    //             setIsVisible(true);
    //         }
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.addEventListener('scroll', handleScroll);
    //     };
    // }, []);

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

    const handleVolumeChange = (e) => {
        const volumeValue = e.target.value;
        setVolume(volumeValue);
        if (spotify.player) {
            spotify.player.setVolume(volumeValue).catch(error => console.error('Error setting volume:', error));
        }
    };

    const toggleShuffle = () => {
        if (spotify.player) {
            const newShuffleState = !isShuffling;
            setIsShuffling(newShuffleState);
            spotify.player.setShuffle(newShuffleState).catch(error => console.error('Error toggling shuffle:', error));
        }
    };

    const toggleLoop = () => {
        if (spotify.player) {
            const newLoopState = !isLooping;
            setIsLooping(newLoopState);
            spotify.player.setRepeat(newLoopState ? 'track' : 'off').catch(error => console.error('Error toggling loop:', error));
        }
    };

    const handleProgressBarClick = (e) => {
        // Get the position of the click relative to the width of the progress bar
        const progressBar = e.target;
        const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
        const newProgress = (clickPosition / progressBar.offsetWidth) * duration;

        // Update progress and seek to the clicked position in the song
        setProgress(newProgress);

        // Seek the player to the new position
        if (spotify.player) {
            spotify.player.seek(newProgress).catch(error => console.error('Error seeking:', error));
        }
    };

    return (
        <div className="fixed bottom-0 w-full p-12 bg-gray-900 text-white flex flex-col items-center">
            {/* Song Info */}
            <div className="fixed w-30 left-20 bottom-10">
                <img
                    src={currentSong ? currentSong?.images?.[0]?.url : '/Images/RealDinoByte.png'}
                    className="w-24 h-24 object-cover rounded-lg" // Tailwind class for styling the image
                />
                <h3 className="text-lg">{currentSong ? currentSong.name : "No song playing"}</h3>
                <p className="text-sm">{currentSong ? currentSong.artists[0].name : ""}</p>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4 mt-4">
                <button className="p-2 bg-gray-700 rounded" onClick={handlePrev}><IoIosSkipBackward /></button>
                <button id="togglePlay" className="p-2 bg-gray-700 rounded" onClick={togglePlay}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button className="p-2 bg-gray-700 rounded" onClick={handleNext}><IoIosSkipForward /></button>
            </div>

            {/* Shuffle and Loop buttons on the right */}
            <div className="flex space-x-4 mt-7 absolute right-20 top-3">
                {/* Shuffle Button */}
                <button
                    className={`p-2 bg-gray-700 rounded-full ${isShuffling ? 'text-white' : 'text-gray-500'}`}
                    onClick={toggleShuffle}
                >
                    <FaShuffle />
                </button>

                {/* Loop Button */}
                <button
                    className={`p-2 bg-gray-700 rounded-full ${isLooping ? 'text-white' : 'text-gray-500'}`}
                    onClick={toggleLoop}
                >
                    <FaRepeat />
                </button>
            </div>

            {/* Volume Control at the bottom-left corner */}
            <div className="absolute bottom-8 right-10 w-32">
                <label htmlFor="volume" className="text-sm">Volume</label>
                <input
                    id="volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    className="w-full"
                    onChange={handleVolumeChange}
                />
            </div>

            {/* Progress Bar */}
            <div className="w-[60vw] mt-2">
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={progress}
                    className="w-full"
                    readOnly
                    onClick={handleProgressBarClick}  // Add the click event handler
                />
                <div className="flex justify-between text-sm mt-1">
                    <span>{Math.floor(progress / 60000)}:{("0" + (Math.floor(progress / 1000) % 60)).slice(-2)}</span>
                    <span>{Math.floor(duration / 60000)}:{("0" + (Math.floor(duration / 1000) % 60)).slice(-2)}</span>
                </div>
            </div>

        </div>
    );
};

export default PlaybackUI;
