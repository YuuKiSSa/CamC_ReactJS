import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/CameraDetail.css'
import CameraLineChart from './Graph/CameraLineChart';

const CameraDetail = () => {
    const { id } = useParams();
    const [camera, setCamera] = useState(null);

    useEffect(() => {
        const fetchCamera = async () => {
            const response = await fetch(`http://localhost:8080/api/camera/${id}`, { credentials: 'include' });
            const data = await response.json();
            setCamera(data);
        };

        fetchCamera();
    }, [id]);

    if (!camera) {
        return <div>Loading...</div>;
    }

    return (
        <div className='camera-detail'>
            <div className="camera-image-container">
                <img src={camera.url} alt={`${camera.brand} ${camera.model}`} className="camera-image"/>
            </div>
            <h1>{camera.brand} {camera.model}</h1>
            <div className="camera-details">
                <p><strong>Category:</strong> {camera.category}</p>
                <p><strong>Release Time:</strong> {camera.releaseTime}</p>
                <p><strong>Initial Price:</strong> ￥{camera.initialPrice}</p>
                <p><strong>Effective Pixel:</strong> {camera.effectivePixel} MP</p>
                <p><strong>Focus Point:</strong> {camera.focusPoint || 'N/A'}</p>
                <p><strong>Continuous Shot:</strong> {camera.continuousShot} fps</p>
                <p><strong>Video Resolution:</strong> {camera.videoResolution}K</p>
                <p><strong>Video Rate:</strong> {camera.videoRate} fps</p>
                <p><strong>ISO:</strong> {camera.iso}</p>
            </div>
            <div className='predict-graph'>
                <CameraLineChart />
            </div>
        </div>
    );
};

export default CameraDetail;
