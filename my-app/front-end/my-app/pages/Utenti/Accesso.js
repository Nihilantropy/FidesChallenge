import React, { useState } from "react";
import './../../assets/style/main.css';

const Accesso = ({ showPage, gShowPopupFB, sShowPopupFB }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div id="stacca">
            <center>
                <table className="base">
                    <tr><td><h1>Accesso a Sergio</h1></td></tr>
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
                    <tr><td><br /></td></tr>
                    <tr><td><h2 className="link" onClick={() => showPage(5)}>Registrati, qui!</h2></td></tr>
                    <tr><td><br /></td></tr>
                    <tr><td><button className="bottoni">Accedi</button></td></tr>
                </table>
            </center>
        </div>
    );
}
export default Accesso;