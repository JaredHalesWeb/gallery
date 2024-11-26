"use client";

import React from 'react';
import Sidebar from '../app/components/Sidebar';
import MainContent from '../app/components/MainContent';
import PlaybackUI from '../app/components/PlaybackUI';
import '../app/globals.css';
import SpotifyProvider from './context/SpotifyProvider';

const HomePage = () => {

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 ml-1/4 overflow-y-auto pb-[80rem] md:pb-[60rem] lg:pb-[30rem] xl:pb-[20rem]">
      <MainContent />
      </div>
      <div className="fixed bottom-0 w-full">
        <PlaybackUI />
      </div>
    </div>
  );
};

export default HomePage;
