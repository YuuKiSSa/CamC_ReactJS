import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Home.css'

const MainContent = () => (
    <div className="main-content">
        <section className="intro-section">
            <h1><span className="word-find">Find</span> Your Favourite </h1>
            <h1><span className="word-camera">Camera</span></h1>
            <p></p>
            <p>Predict future price trends to help you choose the best time to buy and avoid financial losses due to price fluctuations.</p>
            <div className="buttons">
                <button className="browse-button"><Link to="/gallery">Browse Camera</Link></button>
                <button className="demo-button">Demo video <span role="img" aria-label="video">🔊</span></button>
            </div>
        </section>
        <section className="highlight-section">
            <img src="/home.jpg" alt="Highlight Camera" className="highlight-image"/>
            <div className="highlight-info">
                <span className="highlight-tag">Cheap</span>
                <p>Complete Category</p>
                <span className="highlight-stats">1,000+ All Kinds of Cameras</span>
            </div>
        </section>
    </div>
);

export default MainContent;
