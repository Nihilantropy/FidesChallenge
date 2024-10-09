import React from "react";
import './assets/style/main.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import HomeStory from './pages/HomeStory';

export default function App() {
  return (
    <div id="body">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}
