import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "../../CSS/Favorite.css";
import axios from "axios";

const Favorite = () => {
    const [redirect, setRedirect] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [cameras, setCameras] = useState([]);
    const [cameraList, setCameraList] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response_favorites = await fetch(`http://localhost:8080/api/favorite`, { credentials: 'include' });
                if (response_favorites.status === 401) {
                    setRedirect(true);
                } else {
                    const data_favorites = await response_favorites.json();
                    setFavorites(data_favorites);
                }
            } catch (error) {
                console.error("Failed to fetch favorites:", error);
            }
        };

        const fetchCameraList = async () => {
            const response_list = await fetch(`http://localhost:8080/api/list`);
            const data_list = await response_list.json();
            setCameraList(data_list.cameras);
        };

        fetchFavorites();
        fetchCameraList();
    }, []);

    useEffect(() => {
        const fetchCameras = async () => {
            try {
                const response_cameras = favorites.map(async (favorite) => {
                    const response_camera = await fetch(`http://localhost:8080/api/main/${favorite.cameraId}`);
                    if (!response_camera.ok) {
                        throw new Error(`Failed to fetch camera with ID ${favorite.cameraId}`);
                    }
                    const data_camera = await response_camera.json();
                    
                    // Find the matching camera from the cameraList to get the latestPrice
                    const matchedCamera = cameraList.find(camera => camera.id === favorite.cameraId);
                    const latestPrice = matchedCamera ? matchedCamera.latestPrice : null;

                    return { ...data_camera, idealPrice: favorite.idealPrice, id: favorite.cameraId, latestPrice };
                });
                const data_cameras = await Promise.all(response_cameras);
                setCameras(data_cameras);
            } catch (error) {
                console.error("Failed to fetch cameras:", error);
            }
        };

        if (favorites.length > 0 && cameraList.length > 0) {
            fetchCameras();
        }
    }, [favorites, cameraList]);

    const handleDelete = async (cameraId) => {
        try {
            console.log('Sending delete request for cameraId:', cameraId);
            const response = await axios.delete('http://localhost:8080/api/favorite/delete', {
                data: { cameraId },
                withCredentials: true
            });
            console.log('Delete response:', response.data);

            setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.cameraId !== cameraId));
            setCameras(prevCameras => prevCameras.filter(camera => camera.id !== cameraId));
        } catch (error) {
            console.error('Failed to delete item:', error);
            alert('Failed to delete item. Please try again later.');
        }
    };

    const handleChangePrice = async (cameraId, currentIdealPrice) => {
        const newIdealPrice = prompt(`Current Ideal Price: ¥${currentIdealPrice}\nEnter new Ideal Price:`);
        if (newIdealPrice !== null && newIdealPrice !== "" && !isNaN(newIdealPrice)) {
            try {
                await handleDelete(cameraId); // 删除当前相机
                await axios.post('http://localhost:8080/api/favorite/add', { cameraId, idealPrice: newIdealPrice }, { withCredentials: true });
                setFavorites(prevFavorites => [...prevFavorites, { cameraId, idealPrice: newIdealPrice }]);
            } catch (error) {
                console.error('Failed to change ideal price:', error);
                alert('Failed to change ideal price. Please try again later.');
            }
        } else {
            alert('Please enter a valid price.');
        }
    };

    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="favorite">
            <h1>Your Favorite Items</h1>
            {favorites.length === 0 ? (
                <div>No favorited items yet.</div>
            ) : (
                <div>
                    {cameras.map((camera) => (
                        <div key={camera.id} className="camera-item">
                            <Link to={`/camera/${camera.id}`} className="link">
                                <div className="image">
                                    <img src={camera.imageUrls[0]} alt={`${camera.brand} ${camera.model}`} className="camera-list-image-favorite"/>
                                </div>
                                <div className="info">
                                    <h2>{camera.productName}</h2>                                    
                                    <p>Latest Price: ¥{camera.latestPrice}</p>
                                    <p>Ideal Price: ¥{camera.idealPrice}</p>
                                </div>
                                {camera.latestPrice <= camera.idealPrice && (
                                    <div className="alert">Get your camera in perfect price NOW!</div>
                                )}
                            </Link>
                            <button className="change" onClick={() => handleChangePrice(camera.id, camera.idealPrice)}>Change Ideal Price</button>
                            <button className="delete" onClick={() => handleDelete(camera.id)}>Unfavorite</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorite;