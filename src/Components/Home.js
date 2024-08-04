import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Home.css'

const MainContent = () => (
    <div className="home">
        <div className="main-content">
            <section className="intro-section">
                <div className="header">
                    <h1><span className="word-find">Find</span> Your Favourite </h1>
                    <h1><span className="word-camera">Camera</span></h1>
                </div>
                <br/>
                <br/>
                <p>Predict future price trends to help you choose the best time <br/>to buy and avoid financial losses
                    due
                    to price fluctuations.</p>
                <div className="buttons">
                    <button className="browse-button" onClick={() => window.location.href = '/gallery'}>Browse Camera
                    </button>
                    <button className="demo-button">Demo video <span role="img" aria-label="video">🔊</span></button>
                </div>
            </section>
            <section className="highlight-section">
                <img src="/home.jpg" alt="Highlight Camera" className="highlight-image"/>
            </section>
        </div>
        <div>
            <section className="button-info">
                <div className="camc-info">
                    <p className="camc-info-title">CamC.NFT</p>
                    <p className="camc-info-text">Never miss a cheap opportunity, let <br />camera accompany you to record <br />every unforgettable moment.</p>
                </div>
                <div className="about">
                    <h2>About</h2>
                    <p>Home</p>
                    <p>Features</p>
                    <p>FAQs</p>
                    <p>Reviews</p>
                    <p>Stories</p>
                </div>
                <div className="privacy">
                    <h2>Privacy</h2>
                    <p>Privacy</p>
                    <p>Policy</p>
                    <p>Payment</p>
                    <p>Terms</p>
                </div>
                <div className="contact">
                    <h2>Contact Us</h2>
                    <p>+65 8888 8888</p>
                    <p>camc123456@gmail.com</p>
                    <section className="social-media">
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                    </section>
                </div>
            </section>
        </div>
    </div>


);

export default MainContent;
