import React, { useState, useRef } from 'react';
import { View, Platform } from 'react-native';
import styles from './assets/style/main.js';

/* ====== Componenti ====== */
import Navbar from './components/Navbar';
import FooterWeb from './components/FooterWeb';
import FooterApp from './components/FooterApp';

import PupupFunBlock from './components/PupupFunBlock';
import PupupConf from './components/PupupConf';
import PupupErr from './components/PupupErr';
import PupupDelStory from './components/PupupDelStory';

/* ====== Pagine ====== */
import Home from './pages/Home';

import HomeStory from './pages/Story/HomeStory';
import HomeMyStory from './pages/Story/HomeMyStory';
import NewStory from './pages/Story/NewStory';
import ModStory from './pages/Story/ModStory';

import Registati from './pages/Utenti/Registati';
import Accesso from './pages/Utenti/Accesso';
import Profilo from './pages/Utenti/Profilo';

export default function App() {
  /* ====== Show Page ====== */
  const [visiblePage, setVisiblePage] = useState(1);
  const showPage = (page) => { setVisiblePage(page); };
  const gshowPage = (page) => { return visiblePage; };

  /* ====== Autentificazione utente ====== */
  const [WVTtoken, setWVTtoken] = useState('');
  const sJWTtoken = (page) => { setWVTtoken(page); };
  const gWVTtoken = (page) => { return WVTtoken; };

  /* ====== Popup Funzionalità bloccate ====== */
  const [ShowPopupFB, setShowPopupFB] = useState(false);
  const sShowPopupFB = (page) => { setShowPopupFB(page); };

  /* ====== Popup Delete Story ====== */
  const [ShowPopupES, setShowPopupES] = useState(false);
  const sShowPopupES = (page) => { setShowPopupES(page); };

  /* ====== Popup errori ====== */
  const [ShowErr, setShowErr] = useState('');
  const sShowErr = (page) => { setShowErr(page); };
  const gShowPopupErr = (page) => { return ShowErr; };

  /* ====== Id condivisi ====== */
  const [id, setId] = useState('');
  const sid = (page) => { setId(page); };
  const gid = (page) => { return id; };

  /* ====== Popup conferma elimina ====== */
  const [ShowPopupConf, setShowPopupConf] = useState('');

  /* ====== Invia Function SetUP ====== */
  const inviaFunction = useRef(null);
  const setInviaFunction = (fn) => { inviaFunction.current = fn; };

  /* ====== Modifica Function SetUP ====== */
  const modificaFunction = useRef(null);
  const setModificaFunction = (fn) => { modificaFunction.current = fn; };

  return (
    <View style={styles.body}>
      { Platform.OS === 'web' && <Navbar showPage={showPage} gshowPage={gshowPage} /> }
      { Platform.OS !== 'web' && <FooterApp showPage={showPage} gshowPage={gshowPage} invia={() => inviaFunction.current && inviaFunction.current()} modifica={() => ModificaFunction.current && ModificaFunction.current()} /> }

      {/* ====== Pagine ====== */}
      {visiblePage === 1 && <Home showPage={showPage} />}
      {visiblePage === 2 && <HomeStory sShowErr={sShowErr} showPage={showPage} gWVTtoken={gWVTtoken} sShowPopupFB={sShowPopupFB} />}
      {visiblePage === 3 && <NewStory setShowErr={setShowErr} showPage={showPage} sShowPopupFB={sShowPopupFB} gWVTtoken={gWVTtoken} setInviaFunction={setInviaFunction} />}
      {visiblePage === 4 && <Accesso showPage={showPage} sJWTtoken={sJWTtoken} />}
      {visiblePage === 5 && <Registati showPage={showPage} sJWTtoken={sJWTtoken} />}
      {visiblePage === 6 && <Profilo showPage={showPage} sShowPopupFB={sShowPopupFB} gWVTtoken={gWVTtoken} setShowPopupConf={setShowPopupConf} />}
      {visiblePage === 7 && <HomeMyStory sShowPopupES={sShowPopupES} sid={sid} showPage={showPage} gWVTtoken={gWVTtoken} />}
      {visiblePage === 8 && <ModStory gid={gid} setShowErr={setShowErr} showPage={showPage} sShowPopupFB={sShowPopupFB} gWVTtoken={gWVTtoken} setModificaFunction={setModificaFunction} />}

      { Platform.OS === 'web' && <FooterWeb /> }

      {/* ====== Popup ====== */}
      {ShowPopupFB === true && <PupupFunBlock sShowPopupFB={sShowPopupFB} showPage={showPage} />}
      {ShowErr !== '' && <PupupErr sShowErr={sShowErr} gShowPopupErr={gShowPopupErr} />}
      {ShowPopupConf === true && <PupupConf gWVTtoken={gWVTtoken} sShowErr={sShowErr} showPage={showPage} setShowPopupConf={setShowPopupConf} sJWTtoken={sJWTtoken} />}
      {ShowPopupES === true && <PupupDelStory gid={gid} sShowPopupES={sShowPopupES} sShowErr={sShowErr} setShowPopupConf={setShowPopupConf} />}
    </View>
  );
}
