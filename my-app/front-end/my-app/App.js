import React, { useState } from "react";
import './assets/style/main.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import HomeStory from './pages/Story/HomeStory';

export default function App() {
  /* ShowPage */
  const [visiblePage, setVisiblePage] = useState(1);
  const showPage = (page) => {setVisiblePage(page);};

  return (
    <div id="body">
      <Navbar showPage={showPage} />
      {visiblePage === 1 && <Home showPage={showPage} />}
      {visiblePage === 2 && <HomeStory />}
      <Footer />
    </div>
  );
}