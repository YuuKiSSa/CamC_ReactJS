// components/FilterBar.js
import React from 'react';
import "../../CSS/Filter.css"

const FilterBar = ({ filters, setFilters }) => {
    return (
        <div className="sidebar">
            <h1>Filter</h1>
            <div className="filter-group">
                <label htmlFor="brand">Brand</label>
                <select id="brand" value={filters.brand} onChange={e => setFilters({ ...filters, brand: e.target.value })}>
                    <option value="">All</option>
                    <option value="Canon">Canon</option>
                    <option value="Nikon">Nikon</option>
                    <option value="Sony">Sony</option>
                </select>
            </div>
            <div className="filter-group">
                <label htmlFor="priceRange">Price Range</label>
                <select id="priceRange" value={filters.priceRange} onChange={e => setFilters({ ...filters, priceRange: e.target.value })}>
                    <option value="">All</option>
                    <option value="low">Below ￥5000</option>
                    <option value="medium">￥5000 - ￥20000</option>
                    <option value="high">Above ￥20000</option>
                </select>
            </div>
        </div>
    );
};

export default FilterBar;
