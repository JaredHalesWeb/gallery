// src/app/page.js

"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '../app/components/Sidebar';
import MainContent from '../app/components/MainContent';
import SearchBar from '../app/components/SearchBar';
import PlaybackUI from '../app/components/PlaybackUI';
import '../app/globals.css';

const HomePage = () => {
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);

    useEffect(() => {
        fetchPopularSongs();
    }, []);

    const fetchPopularSongs = async (index = 0, limit = 10) => {
        try {
            const response = await fetch(`http://localhost:8889/api/deezer/chart?index=${index}&limit=${limit}`);
            const data = await response.json();
            console.log('Deezer API Response:', data);
            if (data.tracks && data.tracks.data.length > 0) {
                console.log('Popular tracks found:', data.tracks.data);
                setSongs(data.tracks.data);
            } else {
                console.error('No popular tracks found.');
            }
        } catch (error) {
            console.error('Error fetching popular songs:', error);
        }
    };

    const fetchSongs = async (query, index = 0, limit = 10) => {
        try {
            const response = await fetch(`http://localhost:8889/api/deezer/search?q=${query}&index=${index}&limit=${limit}`);
            const data = await response.json();
            console.log('Deezer API Response:', data);
            if (data.data && data.data.length > 0) {
                console.log('Tracks found:', data.data);
                setSongs(data.data);
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
                />
            )}
        </div>
    );
};

export default HomePage;
