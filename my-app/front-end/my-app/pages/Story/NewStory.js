import React from "react";
import './../../assets/style/main.css';

const NewStory = ({ showPage, gLoginTF, sShowPopupFB }) => {
  if (gLoginTF() == false){showPage(2);sShowPopupFB(true);}
  return (
    <div id="stacca">
      <center>
        <div className="base">
          <h2 className="testi">Racconta la tua storia</h2>
          <br />
          <h2 className="link" onClick={() => showPage(2)}>Annulla</h2>
        </div>
      </center>
    </div>
  );
}
export default NewStory;