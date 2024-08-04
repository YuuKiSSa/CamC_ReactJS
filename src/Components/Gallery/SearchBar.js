// components/SearchBar.js
import React from 'react';
import "../../CSS/SearchBar.css"

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="search-bar">
            <i className="fas fa-search search-icon"></i>
            <input
                type="text"
                placeholder="What are you looking for?"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
