// src/components/MainContent.js
'use client';
import React, { useContext, useEffect, useState } from 'react';
import { SpotifyContext, SpotifyTokenContext } from '../context/SpotifyProvider';
import SearchBar from './SearchBar';
import axios from 'axios';

const MainContent = () => {
    const {accessToken} = useContext(SpotifyTokenContext);
    const [songs, setSongs] = useState([]);
    const {songCategory} = useContext(SpotifyContext)

    const handleSearch = async (query) => {
      if (query) {
        await fetchSongs(query);  // Fetch songs based on search query
      } else {
        fetchCategorySongs();
      }
    };
    
    const fetchCategorySongs = async () => {
      let url
      switch(songCategory) {
        case "trends":
          url ='https://api.spotify.com/v1/browse/new-releases'
          break
        case "playlists":
          url = "https://api.spotify.com/v1/me/playlists"
          break
        default: 
          url ='https://api.spotify.com/v1/browse/new-releases'
          break
      }
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (response?.data.albums?.items && response?.data.albums?.items.length > 0) {
          setSongs(response.data.albums.items);
        } else {
          console.error('No tracks found.');
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };
    
  const fetchSongs = async (query) => {
    try {
    query = query || ''
      const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.tracks && response.data.tracks.items.length > 0) {
        setSongs(response.data.tracks.items);
      } else {
        console.error('No tracks found in response.');
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

    useEffect(() => {
        if(accessToken) fetchCategorySongs();
    }, [accessToken, songCategory])
    return (
        <div className="p-6"> {/* OLD: w-3/4 */}
          <SearchBar onSearch={handleSearch} />
            <h1 className="text-4xl font-bold mb-4 text-black">Tracks</h1>
            <div className="grid grid-cols-5 gap-2">  {/* Reduced the gap between columns */}
                {songs.map((song, index) => {
                    const albumName = song ? song.name : 'Unknown Album';
                    const artistName = song.artists && song.artists.length > 0 ? song.artists[0].name : 'Unknown Artist';
                    console.log(song);
                    const albumArt = song && song.images && song.images.length > 0 ? song.images[0].url : '' || song.album && song.album.images && song.album.images.length > 0 ? song.album.images[0].url : '';

                    return (
                        <div 
                            key={index} 
                            className="rounded cursor-pointer relative bg-cover bg-center" 
                            onClick={() => {
                                console.log(song);
                                window.open(song.uri)
                                onPlaySong(song)}
                            }
                            style={{
                                backgroundImage: `url(${albumArt})`,
                                width: '100%',   // Scaled down width to 70%
                                paddingBottom: '100%', // Maintains the 1:1 aspect ratio
                                position: 'relative',
                                margin: '0 auto' // Centers the div within its container
                            }}
                        >
                            <div 
                                className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center"
                            >
                                <p className="text-white font-bold">{albumName}</p>
                                <p className="text-white">{artistName}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MainContent;
