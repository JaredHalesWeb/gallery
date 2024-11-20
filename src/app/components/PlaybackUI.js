import React, { useContext, useMemo } from 'react';
import { SpotifyContext } from '../context/SpotifyProvider';

const PlaybackUI = () => {
const {spotify} = useContext(SpotifyContext)
const currentSong = useMemo(() => {
  return spotify?.currentSong 
}, [spotify?.currentSong])
  const togglePlay = () => {
    if (spotify.player) {
      spotify.player.togglePlay(); // Use the player instance's method directly
    }
  };
  const handleNext = () => {}
  const handlePrev = () => {}
  return (
    <div className="fixed bottom-0 w-full p-4 bg-gray-900 text-white flex flex-col items-center">
      <div className="w-full">
        <h3 className="text-lg">{currentSong ? currentSong.name : "No song playing"}</h3>
        {/* <h2 className="text-lg">{playerState ? playerState.track_window.current_track.name : ""}</h2>   */}
        <p className="text-sm">{currentSong ? currentSong.artists[0].name : ""}</p>
      </div>
      <div className="flex items-center space-x-4 mt-4">
        <button className="p-2 bg-gray-700 rounded" onClick={handlePrev}>Prev</button>
        <button id="togglePlay" className="p-2 bg-gray-700 rounded" onClick={togglePlay}>Play</button>
        <button className="p-2 bg-gray-700 rounded" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default PlaybackUI;
