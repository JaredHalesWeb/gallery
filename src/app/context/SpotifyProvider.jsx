import { createContext, useEffect, useState } from "react";

export const SpotifyContext = createContext(null);
export const SpotifyTokenContext = createContext(null);

export default function SpotifyProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [spotify, setSpotify] = useState(null);

    useEffect(() => {
      const hash = window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
          if (item) {
            const parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
        }, {});
      window.location.hash = "";
      const token = hash.access_token;
      if (token) {
        setAccessToken(token);
        // fetchPopularSongs(token);
        // load spotify SDK
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.body.appendChild(script);
        
        window.onSpotifyWebPlaybackSDKReady = () => {
          const player = new window.Spotify.Player({
            name: 'DinoByte',
            getOAuthToken: cb => { cb(token); },
            volume: 0.5
          });
          player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
          });
          player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
          });
          player.addListener('initialization_error', ({ message }) => {
            console.error(message);
          });
          player.addListener('authentication_error', ({ message }) => {
            console.error(message);
          });
          player.addListener('account_error', ({ message }) => {
            console.error(message);
          });
          player.addListener('player_state_changed', (state) => {
            if (state) {
              console.log('Player state changed:', state);
              setSpotify((prev) => {
                return {
                  ...prev,
                  currentSong: state?.track_window?.current_track
                }
              })
            }
          });
          player.connect();

          setSpotify((prev) => {
            return {
              ...prev,
              player: player,
            }
          })
        };
      } else {
        window.location.href = "http://localhost:8889/login";
      }
    }, []);

  return (
    <SpotifyTokenContext.Provider value={{ accessToken, setAccessToken}}>
      <SpotifyContext.Provider value={{spotify, setSpotify}}>
        {children}
      </SpotifyContext.Provider>
    </SpotifyTokenContext.Provider>
  );
}