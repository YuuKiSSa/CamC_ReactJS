import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CameraList from "./Components/CameraList";
import Navbar from "./Components/Page/Navbar";
import Footer from "./Components/Page/Footer";
import Login from "./Components/Login";
import './CSS/App.css';
import Home from "./Components/Home";
import CameraDetail from './Components/CameraDetail';
import Favorites from "./Components/Favorite";
import SignUp from "./Components/SignUp";
import ContactPage from './Components/ContactPage';

function App() {
  return (
      <Router>
          <div className="App">
              <Navbar />
              <div className="content">
                  <Routes>
                      <Route exact path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/gallery" element={<CameraList />} />
                      <Route path="/camera/:id" element={<CameraDetail />} />
                      <Route path="/favorite" element={<Favorites />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/contact" element={<ContactPage />} />
                  </Routes>
              </div>
              <Footer />
          </div>

      </Router>
  );
}

export default App;
