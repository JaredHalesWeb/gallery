"use client";

import React from 'react';
import Sidebar from '../app/components/Sidebar';
import MainContent from '../app/components/MainContent';
import PlaybackUI from '../app/components/PlaybackUI';
import '../app/globals.css';
import SpotifyProvider from './context/SpotifyProvider';

const HomePage = () => {

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <MainContent />
      </div>
        <PlaybackUI />
    </div>
  );
};

export default HomePage;
