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

    // songCategory = ""

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
        case "Jazz":
          url ="https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFAJ5xb0fwo9m/playlists"
          break
        case "New Releases":
          url = "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFGaKcChsSgUO/playlists"
          break
        case "Happy Holidays":
          url = "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFDKyRxRDLIbk/playlists"
          break
        case "Hip-Hop":
          url ="https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists"
          break
        case "Country":
          url ="https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFKLfwjuJMoNC/playlists"
          break
        case "Pop":
          url ="https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFEC4WFtoNRpw/playlists"
          break
        default: 
          url ='https://api.spotify.com/v1/browse/categories/0JQ5DAt0tbjZptfcdMSKl3/playlists'
          break
      }
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log(response.data.playlists.items)
        if (response?.data.playlists?.items && response?.data.playlists?.items.length > 0) {
          setSongs(response.data.playlists.items);
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
        <div className="p-6 "> {/* OLD: w-3/4 */}
          <SearchBar onSearch={handleSearch} />
            <h1 className="text-4xl font-bold mb-4 text-orange-400 Category-text">{songCategory}</h1>
            <div className="grid grid-cols-5 gap-4">  {/* Reduced the gap between columns */}
                {songs.map((song, index) => {
                    const albumName = song ? song.name : 'Unknown Album';

                    let artistContent;
                    if (song.artists && song.artists.length > 0) {
                        artistContent = song.artists[0].name;
                    } else if (song.description) {
                        // Check if description contains an <a> tag
                        const containsAnchorTag = /<a\b[^>]*>(.*?)<\/a>/.test(song.description);
                        artistContent = containsAnchorTag 
                            ? <span dangerouslySetInnerHTML={{ __html: song.description }} />
                            : song.description;
                    } else {
                        artistContent = 'Unknown Artist';
                    }
                    
                    const albumArt = song && song.images && song.images.length > 0 ? song.images[0].url : '' || song.album && song.album.images && song.album.images.length > 0 ? song.album.images[0].url : '';

                    return (
                        <div 
                            key={index} 
                            className="rounded cursor-pointer relative bg-cover bg-center album-container" 
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
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
                                <p className="text-white font-bold">{albumName}</p>
                                <p className={`text-white ${song.description ? 'text-sm' : 'text-base'} truncate-text`}
                                  title={typeof artistContent === 'string' ? artistContent : ''}>
                                  {artistContent}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MainContent;
