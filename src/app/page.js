// src/app/page.js

"use client";  // Add this directive at the top

import React, { useState, useEffect } from 'react';
import Sidebar from '../app/components/Sidebar';
import MainContent from '../app/components/MainContent';
import '../app/globals.css';

const HomePage = () => {
    const [artist, setArtist] = useState({});
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const response = await fetch('YOUR_ARTIST_API_ENDPOINT');
                const data = await response.json();
                setArtist(data);
            } catch (error) {
                console.error('Error fetching artist data:', error);
            }
        };

        const fetchSongs = async () => {
            try {
                const response = await fetch('YOUR_SONGS_API_ENDPOINT');
                const data = await response.json();
                setSongs(data);
            } catch (error) {
                console.error('Error fetching songs data:', error);
            }
        };

        fetchArtist();
        fetchSongs();
    }, []);

    return (
        <div className="flex">
            <Sidebar />
            <MainContent artist={artist} songs={songs} />
        </div>
    );
};

export default HomePage;
