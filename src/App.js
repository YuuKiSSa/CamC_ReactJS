import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CameraList from "./Components/CameraList";
import Navbar from "./Components/Page/Navbar";
import Footer from "./Components/Page/Footer";
import Login from "./Components/Login";
import './CSS/App.css';
import Home from "./Components/Home";
import CameraDetail from './Components/CameraDetail';
import SignUp from "./Components/SignUp";

function App() {
  return (
      <Router>
          <div className="App">
              <Navbar />
              <div className="content">
                  <Routes>
                      <Route exact path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/gallery" element={<CameraList />} />
                      <Route path="/camera/:id" element={<CameraDetail />} />
                  </Routes>
              </div>
              <Footer />
          </div>

      </Router>
  );
}

export default App;
