// src/components/Sidebar.js

import React from 'react';

const Sidebar = () => {
    return (
        <div className="w-1/4 h-screen bg-gray-800 text-white p-4">
            <img src="/Images/DinoByte.png" alt="DinoByte" style={{ width: '100px', height: '100px' }} />
            <h2 className="text-2xl font-bold mb-6">DinoByte</h2>
            <nav>
                <ul className="space-y-3 text-xl">
                    <li>Home</li>
                    <li>Trends</li>
                    <li>Discovery</li>
                    <li>Library</li>
                    <li>Recent</li>
                    <li>Favorites</li>
                    <li>Favorite Artist</li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
