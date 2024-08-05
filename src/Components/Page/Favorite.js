import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "../../CSS/Favorite.css";

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
                    const response_camera = await fetch(`http://localhost:8080/api/camera/${favorite.cameraId}`);
                    const data_camera = await response_camera.json();
                    return { ...data_camera, idealPrice: favorite.idealPrice };
                });
                const data_cameras = await Promise.all(response_cameras);
                setCameras(data_cameras);
            } catch (error) {
                console.error("Failed to fetch cameras: ", error);
            }
        };

        if (favorites.length > 0) {
            fetchCameras();
        }
    }, [favorites]);

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
                        <Link key={camera.id} to={`/camera/${camera.id}`} className="camera-item-link">
                            <div className="camera-item">
                                <div className="image">
                                    <img src={camera.imageUrl} alt={`${camera.brand} ${camera.model}`} className="camera-list-image"/>
                                </div>
                                <div className="info">
                                    <h2>{camera.brand} {camera.model}</h2>                                    
                                    <p>Current Price: ￥{camera.latestPrice}</p>
                                    <p>Ideal Price: ¥{camera.idealPrice}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorite;