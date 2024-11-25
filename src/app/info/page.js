"use client";

import React from 'react';
import Sidebar from '@/app/components/Sidebar';

const Info = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                <Sidebar />
                <div className="p-4 flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">How to Use DinoByte</h1>
                        <p className="mt-4 text-lg">To enjoy music seamlessly while using DinoByte, follow these steps to connect Spotify to DinoByte:</p>
                        <ol className="text-lg font-semibold space-y-6 mt-4">
                            <li>Open Spotify in a new tab or the Spotify application.</li>
                            <li>Click on the <strong className="text-blue-500">Connect to Device</strong> button.</li>
                            <li>Select <strong className="text-blue-500">DinoByte</strong> from the list of available devices.</li>
                            <li>Enjoy listening to music on <strong className="text-blue-500">DinoByte</strong>!</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Info;
