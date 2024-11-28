import React, { useState, useRef, useEffect } from 'react';
import { View, Platform } from 'react-native';
import styles from './app/assets/style/main.js';

/* ====== Componenti ====== */
import Navbar from './app/components/Navbar.js';
import FooterWeb from './app/components/FooterWeb.js';
import FooterApp from './app/components/FooterApp.js';

import PupupFunBlock from './app/components/PupupFunBlock.js';
import PupupErr from './app/components/PupupErr.js';
import PupupDelStory from './app/components/PupupDelStory.js';

/* ====== Pagine ====== */
import Home from './app/pages/Home.js';

import HomeMyStory from './app/pages/Story/HomeMyStory.js';
import LeggiStory from './app/pages/Story/LeggiStory.js';
import LeggiStoryU from './app/pages/Story/LeggiStoryU.js';
import HomeStory from './app/pages/Story/HomeStory.js';
import NewStory from './app/pages/Story/NewStory.js';
import ModStory from './app/pages/Story/ModStory.js';

import Registati from './app/pages/Utenti/Registati.js';
import Delete from './app/pages/Utenti/Delete.js';
import Accesso from './app/pages/Utenti/Accesso.js';
import Profilo from './app/pages/Utenti/Profilo.js';

const { storeToken, getToken, removeToken } = Platform.OS === 'web' ? require('./app/libreri/Storage/Web') : require('./app/libreri/Storage/Mobile');

export default function App() {
  /* ====== Autentificazione utente ====== */
  const [JWTtoken, setJWTtoken] = useState('');
  const sJWTtoken = (page) => { setJWTtoken(page); };
  const gJWTtoken = (page) => { return JWTtoken; };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await getToken();
        if (token) {
          const api_url = process.env.EXPO_PUBLIC_URL_USERS + "profile";
          fetch(api_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
          })
          .then(response => {
              const status = response.status;
              if (status == 200) {
                sJWTtoken(token);
              } else{
                removeToken();
              }
          })
        }
      } catch (error) {
        console.error('Errore durante il controllo del token:', error);
      }
    };
    checkToken();
  }, []);

  /* ====== Show Page ====== */
  const [visiblePage, setVisiblePage] = useState(1);
  const showPage = (page) => { setVisiblePage(page); };
  const gshowPage = (page) => { return visiblePage; };


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
      {visiblePage === 2 && <HomeStory sid={sid} showPage={showPage} gJWTtoken={gJWTtoken} sShowPopupFB={sShowPopupFB} sShowErr={sShowErr} />}
      {visiblePage === 3 && <NewStory sShowErr={sShowErr} showPage={showPage} sShowPopupFB={sShowPopupFB} gJWTtoken={gJWTtoken} setInviaFunction={setInviaFunction} />}
      {visiblePage === 4 && <Accesso showPage={showPage} sJWTtoken={sJWTtoken} />}
      {visiblePage === 5 && <Registati showPage={showPage} sJWTtoken={sJWTtoken} />}
      {visiblePage === 6 && <Profilo sJWTtoken={sJWTtoken} showPage={showPage} sShowPopupFB={sShowPopupFB} gJWTtoken={gJWTtoken} />}
      {visiblePage === 7 && <HomeMyStory sShowErr={sShowErr} sShowPopupES={sShowPopupES} sid={sid} showPage={showPage} gJWTtoken={gJWTtoken} />}
      {visiblePage === 8 && <ModStory gid={gid} sShowErr={sShowErr} showPage={showPage} sShowPopupFB={sShowPopupFB} gJWTtoken={gJWTtoken} setInviaFunction={setInviaFunction} />}
      {visiblePage === 9 && <Delete gJWTtoken={gJWTtoken} sShowErr={sShowErr} showPage={showPage} sJWTtoken={sJWTtoken} />}
      {visiblePage === 10 && <LeggiStory sShowErr={sShowErr} gid={gid} sid={sid} showPage={showPage} gJWTtoken={gJWTtoken} />}
      {visiblePage === 11 && <LeggiStoryU sShowErr={sShowErr} gid={gid} sid={sid} showPage={showPage} />}

      { Platform.OS === 'web' && <FooterWeb /> }

      {/* ====== Popup ====== */}
      {ShowPopupFB === true && <PupupFunBlock sShowPopupFB={sShowPopupFB} showPage={showPage} />}
      {ShowErr !== '' && <PupupErr sShowErr={sShowErr} gShowPopupErr={gShowPopupErr} />}
      {ShowPopupES === true && <PupupDelStory gJWTtoken={gJWTtoken} gid={gid} sShowPopupES={sShowPopupES} sShowErr={sShowErr} />}
    </View>
  );
}
