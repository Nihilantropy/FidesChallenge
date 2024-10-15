import React, { useState } from "react";
import './../../assets/style/main.css';
import './zz_LibUtenti.js';

const Registati = ({ showPage, gShowPopupFB, sShowPopupFB }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfpassword] = useState('');

    function registati() {
        if(email == '' || password == '' || confpassword == ''){
            document.getElementById("errortext").innerHTML="Completa tutti i campi<br />prima di proseguire";
            return;
        }
        if(email == ''){
            document.getElementById("errortext").innerHTML="Email non valida";
            return;
        }
        if(password != confpassword){
            document.getElementById("errortext").innerHTML="Le password non sono uguali";
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
                        <tr><td><h1>Registati a Sergio</h1></td></tr>
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
                        <tr>
                            <td>
                                <label htmlFor="confpassword" className="testi">Conferma password</label><br />
                                <input autoComplete="confpassword" id="confpassword" spellCheck="false" className="credenziali" type="password" placeholder="Conferma password" value={confpassword} onChange={(e) => setConfpassword(e.target.value)} />
                            </td>
                        </tr>
                        <tr><td><h2 className="testi" id="errortext"></h2></td></tr>
                        <tr><td><h2 className="link" onClick={() => showPage(4)}>Accedi, qui!</h2></td></tr>
                        <tr><td><br /></td></tr>
                        <tr><td><button className="bottoni" onClick={() => registati()}>Registrati</button></td></tr>
                    </tbody>
                </table>
            </center>
        </div>
    );
}
export default Registati;