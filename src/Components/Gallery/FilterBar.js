// components/FilterBar.js
import React from 'react';
import "../../CSS/Filter.css"

const FilterBar = ({ filters, setFilters }) => {
    const handleBrandChange = (brand) => {
        setFilters({ ...filters, brand });
    };

    const handlePriceRangeChange = (field, value) => {
        setFilters({ ...filters, priceRange: { ...filters.priceRange, [field]: value } });
    };

    return (
        <div className="sidebar">
            <h1>Filter</h1>
            <div className="filter-group">
                <h3>Brand</h3>
                <div className="brand-buttons">
                    <div className="brand-button-group">
                        <button
                            className={`brand-button ${filters.brand === '' ? 'active' : ''}`}
                            onClick={() => handleBrandChange('')}
                        >
                            All
                        </button>
                    </div>
                    <div className="brand-button-group">
                        {['Canon', 'Nikon', 'Sony'].map((brand) => (
                            <button
                                key={brand}
                                className={`brand-button ${filters.brand === brand ? 'active' : ''}`}
                                onClick={() => handleBrandChange(brand)}
                            >
                                {brand}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="filter-group">
                <h3>Price Range</h3>
                <div className="price-range-inputs">
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={filters.priceRange.min || ''}
                        onChange={e => handlePriceRangeChange('min', e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={filters.priceRange.max || ''}
                        onChange={e => handlePriceRangeChange('max', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
