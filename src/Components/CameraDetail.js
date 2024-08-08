import React, { useState, useEffect } from 'react';
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
    const [isFavorite, setIsFavorite] = useState(false);
    const [mainImageUrl, setMainImageUrl] = useState('');

    // Function to fetch camera details
    const fetchCamera = async () => {
        try {
            const response = await fetch(`http://13.229.204.191:8080/api/main/${id}`);
            if (!response.ok) throw new Error('Failed to fetch camera data');
            const data = await response.json();
            setCamera(data);
            setMainImageUrl(data.imageUrls[0]); // Set the first image as the main image
        } catch (error) {
            console.error('Failed to fetch camera data:', error);
        }
    };

    // Function to fetch user's favorite cameras
    const fetchFavorites = async () => {
        try {
            const response = await fetch('http://13.229.204.191:8080/api/favorite', { credentials: 'include' });
            if (response.status === 401) {
                return; // Handle unauthorized status if necessary
            }
            const data = await response.json();
            const favoriteIds = data.map(favorite => favorite.cameraId);
            setIsFavorite(favoriteIds.includes(id));
        } catch (error) {
            console.error('Failed to fetch favorites:', error);
        }
    };

    useEffect(() => {
        fetchCamera();
    }, [id]);

    useEffect(() => {
        if (camera) {
            fetchFavorites();
        }
    }, [camera]);

    const handleAddToFavorite = async () => {
        if (!camera) return;

        const idealPrice = window.prompt('Enter your ideal price for this camera:', camera.lowestPrice);

        if (idealPrice === null || isNaN(idealPrice) || parseFloat(idealPrice) <= 0) {
            alert('Please enter a valid ideal price.');
            return;
        }

        try {
            const response = await axios.post('http://13.229.204.191:8080/api/favorite/add', {
                cameraId: id,
                idealPrice: parseFloat(idealPrice)
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                setIsFavorite(true); // Set as favorite upon successful addition
                await fetchFavorites(); // Fetch updated favorites to ensure synchronization
            } else {
                alert('Failed to add to favorites.');
            }
        } catch (error) {
            console.error('Failed to add to favorites:', error);
            alert('Failed to add to favorites. Please try again later.');
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
                            {isFavorite ? 'Added to Favorite' : 'Add to Favorite'}
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