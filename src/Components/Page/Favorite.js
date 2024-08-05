import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import CameraLineChart from "../Graph/CameraLineChart";
import "../CSS/Favorite.css"

const Favorite = () => {
    const [id, setId] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const fetchId = async () => {
            try {
                const response_id = await fetch(`http://localhost:8080/api/current-user`, { credentials: 'include' });
                if (response_id.status === 401) {
                    setRedirect(true);
                } else {
                    const data_id = await response_id.json();
                    setId(data_id);
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
                setRedirect(true);
            }
        };

        fetchId();
    }, []);

    useEffect(() => {
        if (id) {
            const fetchFavorites = async () => {
                try {
                    const response_favorite = await fetch(`http://localhost:8080/api/favorite/${id}`);
                    const data_favorite = await response_favorite.json();
                    setFavorites(data_favorite);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                    setLoading(false);
                }
            };

            fetchFavorites();
        } else if (id === null) {
            setLoading(false); // Stop loading if not authenticated
        }
    }, [id]);

    if (redirect) {
        return <Navigate to="/login" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (favorites.length === 0) {
        return <div>No favorite items found.</div>;
    }

    return (
        <div className="favorites">
            <h1>Favorite Items</h1>
            <div className="favorite-camera">
                {favorites.map(favorite => (
                    <Link key={favorite.id} to={`/camera/${favorite.id}`} className="camera-link">
                        <div className="favorite-item">
                            <h3>{favorite.brand} {favorite.model}</h3>
                            <div className="predict-graph">
                                <CameraLineChart />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Favorite;