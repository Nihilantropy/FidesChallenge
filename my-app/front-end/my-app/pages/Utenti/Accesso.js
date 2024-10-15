import React, { useState } from "react";
import './../../assets/style/main.css';
import './zz_LibUtenti.js';


const Accesso = ({ showPage, gShowPopupFB, sShowPopupFB }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    function accedi() {
        if(email == '' || password == ''){
            document.getElementById("errortext").innerHTML="Completa tutti i campi<br />prima di proseguire";
            return;
        }
        if(email == ''){
            document.getElementById("errortext").innerHTML="Email non valida";
            return;
        }
        let passhas=password;
        console.log("invio fetch");
        //fetch a Express
    }
    return (
        <div id="stacca">
            <center>
                <table className="base">
                    <tbody>
                        <tr><td><h1 className="titoli">Accesso a Sergio</h1></td></tr>
                        <tr>
                            <td>
                                <label htmlFor="email" className="testi">Email</label><br />
                                <input autoComplete="email" id="email" spellCheck="false" className="credenziali" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </td>
                        </tr>
                        <tr><td><br /></td></tr>
                        <tr>
                            <td>
                                <label htmlFor="password" className="testi">Password</label><br />
                                <input autoComplete="password" id="password" spellCheck="false" className="credenziali" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </td>
                        </tr>
                        <tr><td><h2 className="testi" id="errortext"></h2></td></tr>
                        <tr><td><h2 className="link" onClick={() => showPage(5)}>Registrati, qui!</h2></td></tr>
                        <tr><td><br /></td></tr>
                        <tr><td><button className="bottoni" onClick={() => accedi()}>Accedi</button></td></tr>
                    </tbody>
                </table>
            </center>
        </div>
    );
}
export default Accesso;