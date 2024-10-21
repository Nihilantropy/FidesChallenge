import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import styles from './assets/style/main.js';

/* ====== Componenti ====== */
import Navbar from './components/Navbar';
import FooterWeb from './components/FooterWeb';
import FooterApp from './components/FooterApp';
import PupupFunBlock from './components/PupupFunBlock';

/* ====== Pagine ====== */
import Home from './pages/Home';
import HomeStory from './pages/Story/HomeStory';
import NewStory from './pages/Story/NewStory';
import Registati from './pages/Utenti/Registati';
import Accesso from './pages/Utenti/Accesso';

export default function App() {
  /* ====== Show Page ====== */
  const [visiblePage, setVisiblePage] = useState(1);
  const showPage = (page) => { setVisiblePage(page); };
  const gshowPage = (page) => { return visiblePage; };

  /* ====== Autentificazione utente ====== */
  const [WVTtoken, setWVTtoken] = useState('');
  const sWVTtoken = (page) => { setWVTtoken(page); };
  const gWVTtoken = (page) => { return WVTtoken; };

  /* ====== Popup Funzionalità bloccate ====== */
  const [ShowPopupFB, setShowPopupFB] = useState(false);
  const sShowPopupFB = (page) => { setShowPopupFB(page); };

  return (
    <View style={styles.body}>
      { Platform.OS === 'web' && <Navbar showPage={showPage} gshowPage={gshowPage} /> }
      { Platform.OS !== 'web' && <FooterApp showPage={showPage} gshowPage={gshowPage} /> }

      {/* ====== Pagine ====== */}
      {visiblePage === 1 && <Home showPage={showPage} />}
      {visiblePage === 2 && <HomeStory showPage={showPage} />}
      {visiblePage === 3 && <NewStory showPage={showPage} sShowPopupFB={sShowPopupFB} gWVTtoken={gWVTtoken} />}
      {visiblePage === 4 && <Accesso showPage={showPage} sWVTtoken={sWVTtoken} />}
      {visiblePage === 5 && <Registati showPage={showPage} sWVTtoken={sWVTtoken} />}

      { Platform.OS === 'web' && <FooterWeb /> }

      {/* ====== Popup ====== */}
      {ShowPopupFB === true && <PupupFunBlock sShowPopupFB={sShowPopupFB} showPage={showPage} />}
    </View>
  );
}
