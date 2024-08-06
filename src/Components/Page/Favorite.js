import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "../../CSS/Favorite.css";
import axios from "axios";

const Favorite = () => {
    const [redirect, setRedirect] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [cameras, setCameras] = useState([]);

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

        fetchFavorites();
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
                    return { ...data_camera, idealPrice: favorite.idealPrice, id: favorite.cameraId};
                });
                const data_cameras = await Promise.all(response_cameras);
                setCameras(data_cameras);
            } catch (error) {
                console.error("Failed to fetch cameras:", error);
            }
        };

        if (favorites.length > 0) {
            fetchCameras();
        }
    }, [favorites]);

    const handleDelete = async (cameraId) => {
        const confirm_delete = window.confirm('Are you sure you want to unfavorite this item?');
        if (confirm_delete) {
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
        }
    };

    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            {favorites.length === 0 ? (
                <div>No favorited items yet.</div>
            ) : (
                <div>
                    {cameras.map((camera) => (
                        <div key={camera.id} className="camera-item">
                            <Link to={`/camera/${camera.id}`} className="link">
                                <div className="image">
                                    <img src={camera.imageUrl} alt={`${camera.brand} ${camera.model}`} className="camera-list-image-favorite"/>
                                </div>
                                <div className="info">
                                    <h2>{camera.productName}</h2>                                    
                                    <p>Lowest Price: ￥{camera.lowestPrice}</p>
                                    <p>Ideal Price: ¥{camera.idealPrice}</p>
                                </div>
                            </Link>
                            <button onClick={() => handleDelete(camera.id)}>Unfavorite</button>
                            {/* <pre>{JSON.stringify(camera, null, 2)}</pre> */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorite;
