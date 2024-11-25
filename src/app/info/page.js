"use client";

import React from 'react';
import Sidebar from '@/app/components/Sidebar';

const info = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                <Sidebar />
                <div className="p-4 flex-grow">
                    <h1 className="text-2xl font-bold">How to Use DinoByte</h1>
                    <p className="mt-4 text-lg">This is the "How to Use" page where you can explain your application's features and guide users on how to interact with it.</p>
                </div>
            </div>
        </div>
    );
};

export default info;
