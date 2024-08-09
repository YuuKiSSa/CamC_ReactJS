import React, { useState } from "react";
import axios from "axios";
import '../CSS/AddCamera.css'
import {useNavigate} from "react-router-dom";

const AddCamera = () => {
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
        videoRate: 0,
        imageUrls: [""],
        websites: [{ website: "", platform: "" }],
        prices: [{ date: "", price: 0, platform: "" }]
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCameraDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }));
    };

    const handleArrayChange = (index, event, arrayName, field = "") => {
        const newArray = [...cameraDetails[arrayName]];

        if (field) {
            newArray[index][field] = event.target.value;
        } else {
            newArray[index] = event.target.value;
        }

        setCameraDetails({
            ...cameraDetails,
            [arrayName]: newArray,
        });
    };

    const handleBlur = (arrayName) => {
        setCameraDetails((prevDetails) => ({
            ...prevDetails,
            [arrayName]: prevDetails[arrayName].filter(item =>
                typeof item === "string" ? item !== "" : Object.values(item).some(value => value !== "")
            )
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedDetails = {
            ...cameraDetails,
            initialPrice: parseFloat(cameraDetails.initialPrice),
            effectivePixel: parseFloat(cameraDetails.effectivePixel),
            iso: parseInt(cameraDetails.iso, 10),
            focusPoint: parseInt(cameraDetails.focusPoint, 10),
            continuousShot: parseInt(cameraDetails.continuousShot, 10),
            videoResolution: parseInt(cameraDetails.videoResolution, 10),
            videoRate: parseInt(cameraDetails.videoRate, 10),
            websites: cameraDetails.websites.filter(site =>
                site.website && site.platform
            ),
            prices: cameraDetails.prices.filter(price =>
                price.date && price.price && price.platform
            ),
            imageUrls: cameraDetails.imageUrls.filter(url => url)
        };
        try {
            console.log(formattedDetails);
            await axios.post('http://13.213.1.218:8080/api/add-camera', formattedDetails, {withCredentials: true});
            alert("Camera added successfully");
            navigate("/admin-home");
        } catch (error) {
            console.error("Failed to add camera:", error);
        }
    };

    return (
        <div className="add-camera">
            <h1>Add New Camera</h1>
            <form onSubmit={handleSubmit}>
                {/* Brand */}
                <label htmlFor="brand">Brand</label>
                <select id="brand" onChange={handleChange} value={cameraDetails.brand}>
                    <option value="">--Select Brand--</option>
                    <option value="Canon">Canon</option>
                    <option value="Nikon">Nikon</option>
                    <option value="Sony">Sony</option>
                </select>

                {/* Model */}
                <label htmlFor="model">Model</label>
                <input id="model" onChange={handleChange} type="text" value={cameraDetails.model}/>

                {/* Category */}
                <label htmlFor="category">Category</label>
                <select id="category" onChange={handleChange} value={cameraDetails.category}>
                    <option value="">--Select Brand--</option>
                    <option value="SLR">SLR</option>
                    <option value="DC">DC</option>
                    <option value="MIC">MIC</option>
                </select>

                {/* Release Time */}
                <label htmlFor="releaseTime">Release Time</label>
                <input id="releaseTime" onChange={handleChange} type="date" value={cameraDetails.releaseTime}/>

                {/* Initial Price */}
                <label htmlFor="initialPrice">Initial Price</label>
                <input id="initialPrice" onChange={handleChange} type="number" value={cameraDetails.initialPrice}/>

                {/* Effective Pixel */}
                <label htmlFor="effectivePixel">Effective Pixel</label>
                <input id="effectivePixel" onChange={handleChange} type="number" value={cameraDetails.effectivePixel}/>

                {/* ISO */}
                <label htmlFor="iso">ISO</label>
                <input id="iso" onChange={handleChange} type="number" value={cameraDetails.iso}/>

                {/* Focus Point */}
                <label htmlFor="focusPoint">Focus Point</label>
                <input id="focusPoint" onChange={handleChange} type="number" value={cameraDetails.focusPoint}/>

                {/* Continuous Shot */}
                <label htmlFor="continuousShot">Continuous Shot</label>
                <input id="continuousShot" onChange={handleChange} type="number" value={cameraDetails.continuousShot}/>

                {/* Video Resolution */}
                <label htmlFor="videoResolution">Video Resolution</label>
                <input id="videoResolution" onChange={handleChange} type="number" value={cameraDetails.videoResolution}/>

                {/* Video Rate */}
                <label htmlFor="videoRate">Video Rate</label>
                <input id="videoRate" onChange={handleChange} type="number" value={cameraDetails.videoRate}/>

                {/* Description */}
                <label htmlFor="description">Description</label>
                <textarea id="description" onChange={handleChange} value={cameraDetails.description}/>

                {/* Image URLs */}
                <label>Image URLs</label>
                {cameraDetails.imageUrls.map((url, index) => (
                    <input
                        key={index}
                        onChange={(event) => handleArrayChange(index, event, "imageUrls")}
                        onBlur={() => handleBlur("imageUrls")}
                        type="text"
                        value={url}
                    />
                ))}
                <button type="button" onClick={() => setCameraDetails(prevDetails => ({
                    ...prevDetails,
                    imageUrls: [...prevDetails.imageUrls, ""]
                }))}>Add Image URL</button>

                {/* Websites */}
                <label>Websites</label>
                {cameraDetails.websites.map((site, index) => (
                    <div key={index}>
                        <input
                            placeholder="Website"
                            onChange={(event) => handleArrayChange(index, event, "websites", "website")}
                            onBlur={() => handleBlur("websites")}
                            type="text"
                            value={site.website}
                        />
                        <input
                            placeholder="Platform"
                            onChange={(event) => handleArrayChange(index, event, "websites", "platform")}
                            onBlur={() => handleBlur("websites")}
                            type="text"
                            value={site.platform}
                        />
                    </div>
                ))}
                <button type="button" onClick={() => setCameraDetails(prevDetails => ({
                    ...prevDetails,
                    websites: [...prevDetails.websites, { website: "", platform: "" }]
                }))}>Add Website</button>

                {/* Prices */}
                <label>Prices</label>
                {cameraDetails.prices.map((price, index) => (
                    <div key={index}>
                        <input
                            placeholder="Date"
                            onChange={(event) => handleArrayChange(index, event, "prices", "date")}
                            onBlur={() => handleBlur("prices")}
                            type="date"
                            value={price.date}
                        />
                        <input
                            placeholder="Price"
                            onChange={(event) => handleArrayChange(index, event, "prices", "price")}
                            onBlur={() => handleBlur("prices")}
                            type="number"
                            value={price.price}
                        />
                        <input
                            placeholder="Platform"
                            onChange={(event) => handleArrayChange(index, event, "prices", "platform")}
                            onBlur={() => handleBlur("prices")}
                            type="text"
                            value={price.platform}
                        />
                    </div>
                ))}
                <button type="button" onClick={() => setCameraDetails(prevDetails => ({
                    ...prevDetails,
                    prices: [...prevDetails.prices, { date: "", price: "", platform: "" }]
                }))}>Add Price</button>

                <button type="submit" className="btn-save">Add Camera</button>
            </form>
        </div>
    );
};

export default AddCamera;
