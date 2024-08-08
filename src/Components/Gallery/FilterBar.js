import React from 'react';
import "../../CSS/Filter.css"

const FilterBar = ({ filters, setFilters, setCurrentPage, sort, setSort }) => {
    const handleBrandChange = (brand) => {
        setFilters((prevFilters) => ({ ...prevFilters, brand }));
        setCurrentPage(1);
    };

    const handlePriceRangeChange = (field, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            priceRange: { ...prevFilters.priceRange, [field]: value === '' ? undefined : value }
        }));
        setCurrentPage(1);
    };

    const handleSortChange = (field) => {
        setSort((prevSort) => {
            const newOrder = prevSort.field === field && prevSort.order === 'asc' ? 'desc' : 'asc';
            return { field, order: newOrder };
        });
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
                        onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                    />
                    _
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={filters.priceRange.max || ''}
                        onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                    />
                </div>
            </div>
            <div className="filter-group">
                <h3>Sort By</h3>
                <div className="sort-buttons">
                    <button
                        className={`sort-button ${sort.field === 'latestPrice' ? 'active' : ''}`}
                        onClick={() => handleSortChange('latestPrice')}
                    >
                        Price {sort.field === 'latestPrice' && (sort.order === 'asc' ? '▲' : '▼')}
                    </button>
                    <button
                        className={`sort-button ${sort.field === 'averageRate' ? 'active' : ''}`}
                        onClick={() => handleSortChange('averageRate')}
                    >
                        Rating {sort.field === 'averageRate' && (sort.order === 'asc' ? '▲' : '▼')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;