import React, { useState } from "react";
import './../../assets/style/main.css';

const Registati = ({ showPage, gShowPopupFB, sShowPopupFB }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfpassword] = useState('');
    return (
        <div id="stacca">
            <center>
                <table className="base">
                    <tr><td><h1>Registati a Sergio</h1></td></tr>
                    <tr>
                        <td>
                            <label for="email" className="testi">Email</label><br />
                            <input autocomplete="email" id="email" spellcheck="false" className="credenziali" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </td>
                    </tr>
                    <tr><td><br /></td></tr>
                    <tr>
                        <td>
                            <label for="password" className="testi">Password</label><br />
                            <input autocomplete="password" id="password" spellcheck="false" className="credenziali" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="confpassword" className="testi">Conferma password</label><br />
                            <input autocomplete="confpassword" id="confpassword" spellcheck="false" className="credenziali" type="password" placeholder="Conferma password" value={confpassword} onChange={(e) => setConfpassword(e.target.value)} />
                        </td>
                    </tr>
                    <tr><td><br /></td></tr>
                    <tr><td><h2 className="link" onClick={() => showPage(4)}>Accedi, qui!</h2></td></tr>
                    <tr><td><br /></td></tr>
                    <tr><td><button className="bottoni">Registrati</button></td></tr>
                </table>
            </center>
        </div>
    );
}
export default Registati;