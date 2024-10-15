import React from "react";
import './../../assets/style/main.css';

const HomeStory = ({ showPage }) => {
  return (
    <div id="stacca">
      <center>
        <div id="boxgen">
          <h2 className="testi">Hai una storia che vuoi condividere?</h2>
          <br />
          <h2 className="link" onClick={() => showPage(3)}>Raccontala a Sergio</h2>
        </div>
        <div id="boxgen">
          Ciclo che fara vedere tutte le storie
        </div>
      </center>
    </div>
  );
}
export default HomeStory;