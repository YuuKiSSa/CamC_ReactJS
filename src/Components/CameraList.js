import React, {useState, useEffect} from 'react';
import '../CSS/CameraList.css'
import {Link} from "react-router-dom";

const PAGE_SIZE = 9;

const CameraList = () => {
    const [cameras, setCameras] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchCameras = async () => {
            const response = await fetch(`http://localhost:8080/api/list`);
            const data = await response.json();
            setCameras(data.cameras);
        };

        fetchCameras();
    }, []);

    const indexOfLastCamera = currentPage * PAGE_SIZE;
    const indexOfFirstCamera = indexOfLastCamera - PAGE_SIZE;
    const currentCameras = cameras.slice(indexOfFirstCamera, indexOfLastCamera);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < Math.ceil(cameras.length / PAGE_SIZE)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(cameras.length / PAGE_SIZE); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="camera-list">
            <h1>You May Like</h1>
            <h1>Camera List</h1>
            <div className="camera-grid">
                {currentCameras.map((camera) => (
                    <Link key={camera.id} to={`/camera/${camera.id}`} className="camera-item-link">
                        <div className="camera-item">
                            {camera.imageUrl && (
                                <div className="camera-image-container">
                                    <img src={camera.imageUrl} alt={`${camera.brand} ${camera.model}`} className="camera-image" />
                                </div>
                            )}
                            <h2>{camera.brand} {camera.model}</h2>
                            <p>Initial Price: ￥{camera.initialPrice}</p>
                        </div>
                    </Link>
                ))}
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
    );
};

export default CameraList;