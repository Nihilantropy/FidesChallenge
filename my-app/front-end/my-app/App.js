import React, { useState } from "react";
import './assets/style/main.css';

/* ====== Component ====== */
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PupupFunBlock from './components/PupupFunBlock';

/* ====== Pages ====== */
import Home from './pages/Home';
import HomeStory from './pages/Story/HomeStory';
import NewStory from './pages/Story/NewStory';
import Registati from './pages/Utenti/Registati';
import Accesso from './pages/Utenti/Accesso';

export default function App() {
  /* ====== ShowPage ====== */
  const [visiblePage, setVisiblePage] = useState(2);
  const showPage = (page) => {setVisiblePage(page);};

  /* ====== Check Login ====== */
  const [IsLoginIn, setLoginTF] = useState(false);
  const sLoginTF = (page) => {setLoginTF(page);};
  const gLoginTF = (page) => {return IsLoginIn;};

  /* ====== Popup Funzionalita bloccate ====== */
  const [ShowPopupFB, setShowPopupFB] = useState(false);
  const sShowPopupFB = (page) => {setShowPopupFB(page);};

  return (
    <div id="body">
      <Navbar showPage={showPage} />

      {/* ====== Pagine ====== */}
      {visiblePage === 1 && <Home showPage={showPage} />}
      {visiblePage === 2 && <HomeStory showPage={showPage} />}
      {visiblePage === 3 && <NewStory showPage={showPage} sShowPopupFB={sShowPopupFB} gLoginTF={gLoginTF} />}
      {visiblePage === 4 && <Accesso showPage={showPage} sLoginTF={sLoginTF} />}
      {visiblePage === 5 && <Registati showPage={showPage} sLoginTF={sLoginTF} />}
      <Footer />
      
      {/* ====== Popup ====== */}
      {ShowPopupFB === true && <PupupFunBlock sShowPopupFB={sShowPopupFB} showPage={showPage} />}
    </div>
  );
}