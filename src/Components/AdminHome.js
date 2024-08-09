import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/AdminHome.css";
import {Link, useNavigate} from "react-router-dom";

function AdminCameraList() {
    const [cameras, setCameras] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 10;

    useEffect(() => {
        const fetchCameras = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/list");
                const adminResponse = await axios.get("http://localhost:8080/api/current-user", { withCredentials: true });
                setCameras(response.data.cameras);
                if (adminResponse.data.id !== 'admin'){
                    window.alert("You can't access the admin page!");
                    navigate("/login");
                }
            } catch (error) {
                console.error(error);
                window.alert("You can't access the admin page!");
                navigate("/login");
            }
        };
        fetchCameras();
    }, [navigate]);

    const indexOfLastCamera = currentPage * PAGE_SIZE;
    const indexOfFirstCamera = indexOfLastCamera - PAGE_SIZE;
    const currentCameras = cameras.slice(indexOfFirstCamera, indexOfLastCamera);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < Math.ceil(cameras.length / PAGE_SIZE)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(cameras.length / PAGE_SIZE); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="admin-camera-list">
            <div className="header">
                <h1>Camera List</h1>
                <button onClick={() => navigate("/add-camera")} className="add-camera-button">Add Camera</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {currentCameras.map(camera => (
                    <tr key={camera.id}>
                        <td><Link to={`/edit-camera/${camera.id}`}>{camera.id}</Link></td>
                        <td><img src={camera.imageUrl} alt={camera.model}/></td>
                        <td>{camera.brand}</td>
                        <td>{camera.model}</td>
                        <td>{camera.latestPrice}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    onClick={handlePrevious}
                    className="pagination-button"
                    disabled={currentPage === 1}
                >
                    &lt; Prev
                </button>
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`pagination-button ${number === currentPage ? 'active' : ''}`}
                    >
                        {number}
                    </button>
                ))}
                <button
                    onClick={handleNext}
                    className="pagination-button"
                    disabled={currentPage === pageNumbers.length}
                >
                    Next &gt;
                </button>
            </div>
        </div>
    );
}

export default AdminCameraList;
