import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../CSS/CameraInfo.css';

const CameraInfo = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://13.213.1.218:8080/api/details/${id}`, { credentials: 'include' });
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!details) return <div>Loading...</div>;

  const {
    brand,
    model,
    category,
    description,
    releaseTime,
    initialPrice,
    effectivePixel,
    focusPoint,
    continuousShot,
    videoResolution,
    videoRate,
    iso
  } = details;

  return (
    <div className="camera-details">
  <h2>Camera Details</h2>
  <div className="detail-item">
    <span className="detail-label">Brand:</span>
    <span className="detail-value">{brand}</span>
  </div>
  <div className="separator" />
  <div className="detail-item">
    <span className="detail-label">Model:</span>
    <span className="detail-value">{model}</span>
  </div>
  <div className="separator" />
  <div className="detail-item">
    <span className="detail-label">Category:</span>
    <span className="detail-value">{category}</span>
  </div>
  <div className="separator" />
  <div className="detail-item">
    <span className="detail-label">Description:</span>
    <span className="detail-value">{description || 'N/A'}</span>
  </div>
  <div className="separator" />
  <div className="detail-item">
    <span className="detail-label">Release Time:</span>
    <span className="detail-value">{releaseTime}</span>
  </div>
  <div className="separator" />
  <div className="detail-item">
    <span className="detail-label">Initial Price:</span>
    <span className="detail-value">${initialPrice ? initialPrice.toFixed(2) : 'N/A'}</span>
  </div>
  <div className="separator" />
  <div className="detail-item">
    <span className="detail-label">Effective Pixel:</span>
    <span className="detail-value">{effectivePixel} MP</span>
  </div>
  <div className="separator" />
  <div className="detail-item">
    <span className="detail-label">Focus Point:</span>
    <span className="detail-value">{focusPoint}</span>
  </div>
  <div className="separator" />
  <div className="detail-item">
    <span className="detail-label">Continuous Shot:</span>
    <span className="detail-value">{continuousShot} fps</span>
  </div>
  <div className="separator" />
  <div className="detail-item">
    <span className="detail-label">Video Resolution:</span>
    <span className="detail-value">{videoResolution} K</span>
  </div>
  <div className="separator" />
  <div className="detail-item">
    <span className="detail-label">Video Rate:</span>
    <span className="detail-value">{videoRate} fps</span>
  </div>
  <div className="separator" />
  <div className="detail-item">
    <span className="detail-label">ISO:</span>
    <span className="detail-value">{iso}</span>
  </div>
</div>
  );
};

export default CameraInfo;
