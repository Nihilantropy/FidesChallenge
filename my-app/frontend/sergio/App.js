import React, { useState, useRef } from 'react';
import { View, Platform } from 'react-native';
import styles from './app/assets/style/main.js';

/* ====== Componenti ====== */
import Navbar from './app/components/Navbar';
import FooterWeb from './app/components/FooterWeb';
import FooterApp from './app/components/FooterApp';

import PupupFunBlock from './app/components/PupupFunBlock';
import PupupConf from './app/components/PupupConf';
import PupupErr from './app/components/PupupErr';
import PupupDelStory from './app/components/PupupDelStory';

/* ====== Pagine ====== */
import Home from './app/pages/Home';

import HomeStory from './app/pages/Story/HomeStory';
import HomeMyStory from './app/pages/Story/HomeMyStory';
import NewStory from './app/pages/Story/NewStory';
import ModStory from './app/pages/Story/ModStory';

import Registati from './app/pages/Utenti/Registati';
import Accesso from './app/pages/Utenti/Accesso';
import Profilo from './app/pages/Utenti/Profilo';

export default function App() {
  /* ====== Show Page ====== */
  const [visiblePage, setVisiblePage] = useState(1);
  const showPage = (page) => { setVisiblePage(page); };
  const gshowPage = (page) => { return visiblePage; };

  /* ====== Autentificazione utente ====== */
  const [WVTtoken, setWVTtoken] = useState('');
  const sJWTtoken = (page) => { setWVTtoken(page); };
  const gJWTtoken = (page) => { return WVTtoken; };

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
      {visiblePage === 2 && <HomeStory sShowErr={sShowErr} showPage={showPage} gJWTtoken={gJWTtoken} sShowPopupFB={sShowPopupFB} />}
      {visiblePage === 3 && <NewStory setShowErr={setShowErr} showPage={showPage} sShowPopupFB={sShowPopupFB} gJWTtoken={gJWTtoken} setInviaFunction={setInviaFunction} />}
      {visiblePage === 4 && <Accesso showPage={showPage} sJWTtoken={sJWTtoken} />}
      {visiblePage === 5 && <Registati showPage={showPage} sJWTtoken={sJWTtoken} />}
      {visiblePage === 6 && <Profilo showPage={showPage} sShowPopupFB={sShowPopupFB} gJWTtoken={gJWTtoken} setShowPopupConf={setShowPopupConf} />}
      {visiblePage === 7 && <HomeMyStory sShowPopupES={sShowPopupES} sid={sid} showPage={showPage} gJWTtoken={gJWTtoken} />}
      {visiblePage === 8 && <ModStory gid={gid} setShowErr={setShowErr} showPage={showPage} sShowPopupFB={sShowPopupFB} gJWTtoken={gJWTtoken} setModificaFunction={setModificaFunction} />}

      { Platform.OS === 'web' && <FooterWeb /> }

      {/* ====== Popup ====== */}
      {ShowPopupFB === true && <PupupFunBlock sShowPopupFB={sShowPopupFB} showPage={showPage} />}
      {ShowErr !== '' && <PupupErr sShowErr={sShowErr} gShowPopupErr={gShowPopupErr} />}
      {ShowPopupConf === true && <PupupConf gJWTtoken={gJWTtoken} sShowErr={sShowErr} showPage={showPage} setShowPopupConf={setShowPopupConf} sJWTtoken={sJWTtoken} />}
      {ShowPopupES === true && <PupupDelStory gid={gid} sShowPopupES={sShowPopupES} sShowErr={sShowErr} setShowPopupConf={setShowPopupConf} />}
    </View>
  );
}
