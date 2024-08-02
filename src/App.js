import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CameraList from "./Components/CameraList";
import CameraDetail from "./Components/CameraDetail";
import Navbar from "./Components/Page/Navbar";
import Footer from "./Components/Page/Footer";
import './CSS/App.css';

function App() {
  return (
      <Router>
          <div className="App">
              <Navbar />
              <div className="content">
                  <Routes>
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
