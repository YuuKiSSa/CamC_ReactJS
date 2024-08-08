// components/SearchBar.js
import React from 'react';
import "../../CSS/SearchBar.css"

const SearchBar = ({ searchTerm, setSearchTerm, setCurrentPage }) => {
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="search-bar">
            <i className="fas fa-search search-icon"></i>
            <input
                type="text"
                placeholder="What are you looking for?"
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;
