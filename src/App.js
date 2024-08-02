import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CameraList from "./Components/CameraList";
import CameraDetail from "./Components/CameraDetail";
import CameraPrice from "./Components/CameraPrice";
import './CSS/App.css';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<CameraList />} />
              <Route path="/camera/:id" element={<CameraDetail />} />
          </Routes>
      </Router>
  );
}

export default App;
