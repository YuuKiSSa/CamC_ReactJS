import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/CameraDetail.css';
import CameraLineChart from './Graph/CameraLineChart';
import CameraPrice from './Page/CameraPrice';
import UserReviews from './Page/UserReviews';
import PriceHistoryChart from './Graph/PriceHistoryChart';
import CameraInfo from './Page/CameraInfo';
import axios from 'axios';

const CameraDetail = () => {
    const { id } = useParams();
    const [camera, setCamera] = useState(null);
    const [mainImageUrl, setMainImageUrl] = useState('');

    // Function to fetch camera details
    const fetchCamera = useCallback(async () => {
        try {
            const response = await fetch(`http://13.213.1.218:8080/api/main/${id}`);
            if (!response.ok) throw new Error('Failed to fetch camera data');
            const data = await response.json();
            setCamera(data);
            setMainImageUrl(data.imageUrls[0]); // Set the first image as the main image
        } catch (error) {
            console.error('Failed to fetch camera data:', error);
        }
    }, [id]);

    useEffect(() => {
        fetchCamera();
    }, [fetchCamera, id]);

    const handleAddToFavorite = async () => {
        if (!camera) return;

        const idealPrice = window.prompt('Enter your ideal price for this camera:', camera.lowestPrice);

        if (idealPrice === null || isNaN(idealPrice) || parseFloat(idealPrice) <= 0) {
            alert('Please enter a valid ideal price.');
            return;
        }

        try {
            await axios.post('http://13.213.1.218:8080/api/favorite/add', {
                cameraId: id,
                idealPrice: parseFloat(idealPrice)
            }, {
                withCredentials: true
            });
        } catch (error) {
            if (error.response.status === 401)
                alert('Pleasel login first.');
            else if(error.response.status === 500)
                alert('Already added to favorite.');
        }
    };

    const renderStars = (rate) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <i
                    key={i}
                    className={`fas fa-star ${i <= rate ? 'filled' : ''}`}
                ></i>
            );
        }
        return stars;
    };

    const handleThumbnailClick = (url) => {
        setMainImageUrl(url);
    };

    if (!camera) {
        return <div>Loading...</div>; // or you could use a spinner/loading component
    }

    return (
        <div id='camera-detail'>
            <div className="image">
                <div className="main-image-container">
                    <img src={mainImageUrl} alt={camera.productName} className="camera-image"/>
                </div>
                <div className="thumbnails">
                    {camera.imageUrls.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Thumbnail ${index}`}
                            className="thumbnail"
                            onClick={() => handleThumbnailClick(url)}
                        />
                    ))}
                </div>
            </div>
            <div className="camera-detail">
                <h1>{camera.productName}</h1>
                <div className="details">
                    <div className="details1"> 
                        <span className="color">Price</span>
                        <span className="prices">￥{camera.lowestPrice}</span>
                        <span className="shic">Initial price<span className="prices2">￥{camera.initialPrice}</span></span>
                        <span className="yis">Average Rate({camera.averageRate})：{renderStars(camera.averageRate)}</span>
                    </div>
                    <h2>Predict Trend</h2>
                    <div className='predict-graph'>
                        <CameraLineChart />
                    </div>
                    <div className="favorite">
                        <button className="back-button" onClick={handleAddToFavorite}>
                            Add to Favorite
                        </button>
                        <button className="back-button" onClick={() => window.history.back()}>
                            &#9664; Back
                        </button>
                    </div>
                </div>
            </div>
            <div id="top-buttons">
                <button onClick={() => scrollToSection('compare')}>Camera Price</button>
                <button onClick={() => scrollToSection('review')}>User Reviews</button>
                <button onClick={() => scrollToSection('history-graph')}>Price History</button>
                <button onClick={() => scrollToSection('info')}>Camera Details</button>
            </div>
            <div className='part'>
                <div className="divider"></div>
                <div id="compare">
                    <CameraPrice />
                </div>
                <div className="divider"></div>
                <div id="review">
                    <UserReviews />
                </div>
                <div className="divider"></div>
                <div id="history-graph">
                    <PriceHistoryChart />
                </div>
                <div className="divider"></div>
                <div id="info">
                    <CameraInfo />
                </div>
            </div>
        </div>
    );
};

const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

export default CameraDetail;