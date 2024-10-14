import React from "react";
import './../assets/style/main.css';

const Home = ({ showPage }) => {
  return (
    <center>
      <div id="primobox">
        <h2 className="testi">Sergio è una piattaforma che permette di narrare e leggere storie da tutto il mondo</h2>
        <br /><br /><br />
        <h2 className="link" onClick={() => showPage(2)}>Inizia a leggere, qui</h2>
      </div>
    </center>
  );
}

export default Home;