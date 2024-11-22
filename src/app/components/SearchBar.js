// src/components/SearchBar.js

import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSearch} className="w-full p-4 bg-gray-100 flex justify-center">
            <input
                type="text"
                className="w-3/4 p-2 border rounded text-black"
                placeholder="Search for songs or artists..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="p-2 bg-blue-500 text-black rounded ml-2">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
