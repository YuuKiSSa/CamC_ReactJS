import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/CameraDetail.css';
import CameraLineChart from './Graph/CameraLineChart';
import CameraPrice from './Page/CameraPrice';
import UserReviews from './Page/UserReviews';
import PriceHistoryChart from './Graph/PriceHistoryChart';
import CameraInfo from './Page/CameraInfo';

const CameraDetail = () => {
    const { id } = useParams();
    const [camera, setCamera] = useState(null);

    useEffect(() => {
        const fetchCamera = async () => {
            const response = await fetch(`http://localhost:8080/api/main/${id}`);
            const data = await response.json();
            setCamera(data);
        };

        fetchCamera();
    }, [id]);

    if (!camera) {
        return <div>Loading...</div>;
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
                        <a href="#"><button className="favoritecolor">Add to Favorite</button></a>
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