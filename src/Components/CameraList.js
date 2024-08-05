import React, {useState, useEffect} from 'react';
import '../CSS/CameraList.css'
import {Link} from "react-router-dom";
import SearchBar from './Gallery/SearchBar';
import FilterBar from "./Gallery/FilterBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

const PAGE_SIZE = 9;

const CameraList = () => {
    const [cameras, setCameras] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        brand: '',
        priceRange:''
    });
    const [cameras_like, setCamerasLike] = useState([]);

    useEffect(() => {
        const fetchCameras = async () => {
            const response_list = await fetch(`http://localhost:8080/api/list`);
            const data_list = await response_list.json();
            setCameras(data_list.cameras);
        };
        const fetchCamerasLike = async () => {
            const response_like = await fetch(`http://localhost:8080/api/you-may-like`, { credentials: 'include' });
            if (response_like.status !== 401) {
                const data_like = await response_like.json();
                setCamerasLike(data_like);
            }
        }
        fetchCameras();

        fetchCamerasLike()
    }, []);

    const indexOfLastCamera = currentPage * PAGE_SIZE;
    const indexOfFirstCamera = indexOfLastCamera - PAGE_SIZE;

    const filteredCameras = cameras.filter(camera =>
        (camera.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            camera.model.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filters.brand === '' || camera.brand === filters.brand) &&
        (filters.priceRange.min === undefined || camera.latestPrice >= filters.priceRange.min) &&
        (filters.priceRange.max === undefined || camera.latestPrice <= filters.priceRange.max)
    );


    const currentCameras = filteredCameras.slice(indexOfFirstCamera, indexOfLastCamera);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < Math.ceil(filteredCameras.length / PAGE_SIZE)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredCameras.length / PAGE_SIZE); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="camera-list-container">
            <FilterBar filters={filters} setFilters={setFilters} setCurrentPage={setCurrentPage} />
            <div className="camera-list-content">
                {cameras_like.length > 0 ? (
                    <div>
                        <h1>You May Like</h1>
                        <div className="camera-grid">
                            {cameras_like.map((camera) => {
                                const discountPercentage = (
                                    ((camera.initialPrice - camera.latestPrice) / camera.initialPrice) * 100
                                ).toFixed(2);

                                return (
                                    <Link key={camera.id} to={`/camera/${camera.id}`} className="camera-item-link">
                                        <div className="camera-item">
                                            {camera.imageUrl && (
                                                <div className="camera-image-container">
                                                    <img src={camera.imageUrl} alt={`${camera.brand} ${camera.model}`}
                                                         className="camera-list-image"/>
                                                </div>
                                            )}
                                            {discountPercentage > 0 && (
                                                <div className="discount-badge">
                                                    <FontAwesomeIcon icon={faTag} className="discount-icon" />
                                                    {discountPercentage} % OFF
                                                </div>
                                            )}
                                            <h2>{camera.brand} {camera.model}</h2>
                                            <div className="camera-list-price">
                                                <p className="initial-price">￥{camera.initialPrice}</p>
                                                <p className="latest-price">￥{camera.latestPrice}</p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
                <h1>Camera List</h1>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />
                <div className="camera-grid">
                    {currentCameras.map((camera) => {
                        const discountPercentage = (
                            ((camera.initialPrice - camera.latestPrice) / camera.initialPrice) * 100
                        ).toFixed(2);

                        return (
                            <Link key={camera.id} to={`/camera/${camera.id}`} className="camera-item-link">
                                <div className="camera-item">
                                    {camera.imageUrl && (
                                        <div className="camera-image-container">
                                            <img src={camera.imageUrl} alt={`${camera.brand} ${camera.model}`}
                                                 className="camera-list-image"/>
                                        </div>
                                    )}
                                    {discountPercentage > 0 && (
                                        <div className="discount-badge">
                                            <FontAwesomeIcon icon={faTag} className="discount-icon" />
                                            {discountPercentage} % OFF
                                        </div>
                                    )}
                                    <h2>{camera.brand} {camera.model}</h2>
                                    <div className="camera-list-price">
                                        <p className="initial-price">￥{camera.initialPrice}</p>
                                        <p className="latest-price">￥{camera.latestPrice}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className="pagination">
                    <button
                        onClick={handlePrevious}
                        className="pagination-button"
                        disabled={currentPage === 1}
                    >
                        &lt; Prev
                    </button>
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`pagination-button ${number === currentPage ? 'active' : ''}`}
                        >
                            {number}
                        </button>
                    ))}
                    <button
                        onClick={handleNext}
                        className="pagination-button"
                        disabled={currentPage === pageNumbers.length}
                    >
                        Next &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CameraList;