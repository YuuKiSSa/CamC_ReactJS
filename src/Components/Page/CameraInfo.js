import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../CSS/CameraInfo.css';

const CameraInfo = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/details/${id}`)
      .then(response => response.json())
      .then(data => setDetails(data))
      .catch(error => console.error('Error fetching data:', error));
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
        <span className="detail-label">Brand:</span> {brand}
      </div>
      <div className="separator" />
      <div className="detail-item">
        <span className="detail-label">Model:</span> {model}
      </div>
      <div className="separator" />
      <div className="detail-item">
        <span className="detail-label">Category:</span> {category}
      </div>
      <div className="separator" />
      <div className="detail-item">
        <span className="detail-label">Description:</span> {description || 'N/A'}
      </div>
      <div className="separator" />
      <div className="detail-item">
        <span className="detail-label">Release Time:</span> {releaseTime}
      </div>
      <div className="separator" />
      <div className="detail-item">
        <span className="detail-label">Initial Price:</span> ${initialPrice ? initialPrice.toFixed(2) : 'N/A'}
      </div>
      <div className="separator" />
      <div className="detail-item">
        <span className="detail-label">Effective Pixel:</span> {effectivePixel} MP
      </div>
      <div className="separator" />
      <div className="detail-item">
        <span className="detail-label">Focus Point:</span> {focusPoint}
      </div>
      <div className="separator" />
      <div className="detail-item">
        <span className="detail-label">Continuous Shot:</span> {continuousShot} fps
      </div>
      <div className="separator" />
      <div className="detail-item">
        <span className="detail-label">Video Resolution:</span> {videoResolution} K
      </div>
      <div className="separator" />
      <div className="detail-item">
        <span className="detail-label">Video Rate:</span> {videoRate} fps
      </div>
      <div className="separator" />
      <div className="detail-item">
        <span className="detail-label">ISO:</span> {iso}
      </div>
    </div>
  );
};

export default CameraInfo;
