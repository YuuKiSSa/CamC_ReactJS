import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../CSS/CameraPrice.css';

const CameraPrice = ({ cameraId }) => {
  const { id } = useParams();
  const [cameraData, setCameraData] = useState([]);
  const [lowestPricePlatform, setLowestPricePlatform] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/price/${id}`);
        setCameraData(response.data);

        const prices = response.data.map(platform => ({
          platform: platform.platform,
          price: platform.details[0].price
        }));

        const lowestPrice = Math.min(...prices.map(p => p.price));
        const lowestPricePlatform = prices.find(p => p.price === lowestPrice).platform;
        setLowestPricePlatform(lowestPricePlatform);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [cameraId]);

  if (!cameraData.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="camera-price-container">
      <h2>Camera Prices</h2>
      {cameraData.map(platform => (
        <div key={platform.platform} className="price-row">
          <div className="price-image">
            <img src={`/${platform.platform}.png`} alt={`${platform.platform} logo`} />
          </div>
          <div className={`price ${lowestPricePlatform === platform.platform ? 'lowest-price' : ''}`}>
            <span className="platform-name">{platform.platform}:</span>
            <span className="product-name">{platform.details[0].productName}</span>
            <span className="product-price">${platform.details[0].price}</span>
            <a href={platform.details[0].link} target="_blank" rel="noopener noreferrer">
              <button>View in Shop</button>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CameraPrice;