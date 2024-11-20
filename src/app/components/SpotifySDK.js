export const initializeSpotifySDK = (accessToken, setPlayerState) => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
  
    document.body.appendChild(script);
  
    // script.onload = () => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'DinoByte',
          getOAuthToken: cb => { cb(accessToken); },
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
            setPlayerState(player);  // Set the entire player instance, not just the state

          }
        });
  
        player.connect();
        window.player = player
      };
    };
//   };
  