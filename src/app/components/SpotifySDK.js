// export const initializeSpotifySDK = (accessToken, setPlayerState) => {
//   // Check if the script is already added
//   if (!document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]')) {
//     const script = document.createElement('script');
//     script.src = 'https://sdk.scdn.co/spotify-player.js';
//     script.async = true;
//     document.body.appendChild(script);
//   }

//   // Ensure this code runs only when the SDK is ready
//   window.onSpotifyWebPlaybackSDKReady = () => {
//     const player = new window.Spotify.Player({
//       name: 'DinoByte',
//       getOAuthToken: cb => { cb(accessToken); },
//       volume: 0.5
//     });

//     player.addListener('ready', ({ device_id }) => {
//       console.log('Ready with Device ID', device_id);
//     });

//     player.addListener('not_ready', ({ device_id }) => {
//       console.log('Device ID has gone offline', device_id);
//     });

//     player.addListener('initialization_error', ({ message }) => {
//       console.error(message);
//     });

//     player.addListener('authentication_error', ({ message }) => {
//       console.error(message);
//     });

//     player.addListener('account_error', ({ message }) => {
//       console.error(message);
//     });

//     player.addListener('player_state_changed', (state) => {
//       if (state) {
//         console.log('Player state changed:', state);
//         setPlayerState(state);
//         if (state.track_window && state.track_window.current_track) {
//           const currentTrack = {
//             name: state.track_window.current_track.name,
//             artists: state.track_window.current_track.artists,
//             uri: state.track_window.current_track.uri

//           };
//           handlePlaySong(currentTrack);  // Call handlePlaySong with the current track
//         }
//       }
//     });

//     player.connect();
//     window.player = player;
//   };
// };
