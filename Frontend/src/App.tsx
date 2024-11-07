import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Room from "./page/ManageRoom/RoomLayout/insex";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Room />} />
      </Routes>
    </Router>
  );
};

export default App;