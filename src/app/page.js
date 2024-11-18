// src/app/page.js

"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../app/components/Sidebar';
import MainContent from '../app/components/MainContent';
import SearchBar from '../app/components/SearchBar';
import PlaybackUI from '../app/components/PlaybackUI';
import '../app/globals.css';

const HomePage = () => {
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [accessToken, setAccessToken] = useState('');

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
            fetchPopularSongs(token);
        } else {
            window.location.href = 'http://localhost:8889/login';
        }
    }, []);

    const fetchPopularSongs = async (token) => {
        try {
            const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log(response);
            if (response?.data.albums?.items && response?.data.albums?.items.length > 0) {
                // console.log(response);
                setSongs(response.data.albums.items);
            } else {
                console.error('No popular tracks found.');
            }
        } catch (error) {
            console.error('Error fetching popular songs:', error);
        }
    };

    const fetchSongs = async (query) => {
        try {
            const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
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

    const handleSearch = (query) => {
        fetchSongs(query);
    };

    const handlePlaySong = (song) => {
        setCurrentSong(song);
    };

    const handlePrevSong = () => {
        // Implement previous song functionality
    };

    const handleNextSong = () => {
        // Implement next song functionality
    };

    return (
        <div className="flex flex-col h-screen">
            <SearchBar onSearch={handleSearch} />
            <div className="flex flex-1">
                <Sidebar />
                <MainContent songs={songs} onPlaySong={handlePlaySong} />
            </div>
            {currentSong && (
                <PlaybackUI 
                    currentSong={currentSong} 
                    onPrevSong={handlePrevSong} 
                    onNextSong={handleNextSong} 
                    accessToken={accessToken}
                />
            )}
        </div>
    );
};

export default HomePage;
