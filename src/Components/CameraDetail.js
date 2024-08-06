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

    useEffect(() => {
        const fetchCamera = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/main/${id}`);
                const data = await response.json();
                setCamera(data);
            } catch (error) {
                console.error('Failed to fetch camera data:', error);
            }
        };

        fetchCamera();
    }, [id]);

    const handleAddToFavorite = async () => {
        if (!camera) return;

        const idealPrice = window.prompt('Enter your ideal price for this camera:', camera.lowestPrice);

        if (idealPrice === null || isNaN(idealPrice) || parseFloat(idealPrice) <= 0) {
            alert('Please enter a valid ideal price.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/favorite/add', {
                cameraId: id,
                idealPrice: parseFloat(idealPrice)
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                setIsFavorite(true);
                alert('Added to favorites successfully!');
            } else {
                alert('Failed to add to favorites.');
            }
        } catch (error) {
            console.error('Failed to add to favorites:', error);
            alert('Failed to add to favorites. Please try again later.');
        }
    };

    if (!camera) {
        return <div>Loading...</div>; // or you could use a spinner/loading component
    }

    return (
        <div id='camera-detail'>
            <div className="image">
                <img src={camera.imageUrl} alt={camera.productName} className="camera-image"/>
            </div>
            <div className="camera-detail">
                <h1>{camera.productName}</h1>
                <div className="details">
                    <div className="details1"> 
                        <span className="color">Price</span>
                        <span className="prices">${camera.lowestPrice}</span>
                        <span className="shic">Initial price<span className="prices2">${camera.initialPrice}</span></span>
                        <span className="yis">Average Rate: {camera.averageRate}</span>
                    </div>
                    <h3>Predict trend:</h3>
                    <div className='predict-graph'>
                        <CameraLineChart />
                    </div>
                    <div className="favorite">
                        <button onClick={handleAddToFavorite}>
                            {isFavorite ? 'Added to Favorite' : 'Add to Favorite'}
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
    );
};

const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

export default CameraDetail;