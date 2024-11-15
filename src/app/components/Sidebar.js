// src/components/Sidebar.js

import React from 'react';

const Sidebar = () => {
    return (
        <div className="w-1/4 h-screen bg-gray-800 text-white p-4">
            <h2 className="text-2xl font-bold mb-6">ROKK</h2>
            <nav>
                <ul className="space-y-2">
                    <li>Home</li>
                    <li>Trends</li>
                    <li>Discovery</li>
                    <li>Library</li>
                    <li>Recent</li>
                    <li>Favorites</li>
                    <li>Favorite Artist</li>
                    <li>Playlist</li>
                    <li>Create New</li>
                    <li>2021</li>
                    <li>2022</li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
