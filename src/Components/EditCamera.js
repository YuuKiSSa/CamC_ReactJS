import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../CSS/EditCamera.css";

const EditCamera = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cameraDetails, setCameraDetails] = useState({
        brand: "",
        model: "",
        category: "",
        description: "",
        releaseTime: "",
        initialPrice: 0,
        effectivePixel: 0,
        iso: 0,
        focusPoint: 0,
        continuousShot: 0,
        videoResolution: 0,
        videoRate: 0
    });

    useEffect(() => {
        const fetchCameraDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/camera/${id}`);
                setCameraDetails(response.data);
            } catch (error) {
                console.error("Failed to fetch camera details:", error);
            }
        };
        fetchCameraDetails();
    }, [id]);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCameraDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/update-camera/${id}`, cameraDetails, {withCredentials: true});
            navigate("/admin-home");
        } catch (error) {
            console.error("Failed to update camera details:", error);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try{
            window.confirm("Are you sure you want to delete this camera?");
            await axios.delete(`http://localhost:8080/api/delete-camera/${id}`, {withCredentials: true});
            navigate("/admin-home");
        }catch (error){
            console.error("Failed to delete camera details:", error);
        }
    };

    return (
        <div className="edit-camera">
            <h1>Edit Camera Details</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="brand">Brand</label>
                <br/>
                <select id="brand" onChange={handleChange} value={cameraDetails.brand}>
                    <option>Canon</option>
                    <option>Nikon</option>
                    <option>Sony</option>
                </select>
                <label htmlFor="model">Model</label>
                <input id="model" onChange={handleChange} type="text" value={cameraDetails.model}/>
                <label htmlFor="category">Category</label>
                <select id="category" onChange={handleChange} value={cameraDetails.category}>
                    <option>SLR</option>
                    <option>DC</option>
                    <option>MIC</option>
                </select>
                <label htmlFor="releaseTime">Release Time</label>
                <input id="releaseTime" onChange={handleChange} type="date" value={cameraDetails.releaseTime}/>
                <label htmlFor="initialPrice">Initial Price</label>
                <input id="initialPrice" onChange={handleChange} type="number" value={cameraDetails.initialPrice}/>
                <label htmlFor="effectivePixel">Effective Pixel</label>
                <input id="effectivePixel" onChange={handleChange} type="number" value={cameraDetails.effectivePixel}/>
                <label htmlFor="ISO">ISO</label>
                <input id="ISO" onChange={handleChange} type="number" value={cameraDetails.iso}/>
                <label htmlFor="focusPoint">Focus Point</label>
                <input id="focusPoint" onChange={handleChange} type="number" value={cameraDetails.focusPoint}/>
                <label htmlFor="continuousShot">Continuous Shots</label>
                <input id="continuousShot" onChange={handleChange} type="number" value={cameraDetails.continuousShot}/>
                <label htmlFor="videoResolution">Video Resolution</label>
                <input id="videoResolution" onChange={handleChange} type="number" value={cameraDetails.videoResolution}/>
                <label htmlFor="videoRate">Video Rate</label>
                <input id="videoRate" onChange={handleChange} type="number" value={cameraDetails.videoRate}/>
                <label htmlFor="description">Description</label>
                <textarea id="description" onChange={handleChange} value={cameraDetails.description} rows="4" cols="50"/>
                <button type="submit" className="btn-save">Save Changes</button>
            </form>
            <div>
                <button className="btn-back" onClick={() => navigate(-1)}>Back</button>
                <button className="btn-delete" onClick={handleDelete}>Delete Camera</button>
            </div>

        </div>
    );
};

export default EditCamera;
