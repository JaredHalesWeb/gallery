"use client";

import React from 'react';
import Sidebar from '../app/components/Sidebar';
import MainContent from '../app/components/MainContent';
import SearchBar from '../app/components/SearchBar';
import PlaybackUI from '../app/components/PlaybackUI';
import '../app/globals.css';
import SpotifyProvider from './context/SpotifyProvider';

const HomePage = () => {

  return (
    <SpotifyProvider>
      <div className="flex flex-col h-screen">
        <div className="flex flex-1 mb-16">
          <Sidebar />
          <MainContent />
        </div>
          <PlaybackUI />
      </div>
    </SpotifyProvider>
  );
};

export default HomePage;
