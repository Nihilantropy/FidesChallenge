import React, { useState } from "react";
import './../assets/style/main.css';

function pulsante1(par1, par2){;}
const Tendina = ({ showPage, showTendina}) => {
  return (
    <table>
      <tbody>
        <tr>
          <td><img className="fototendina" onClick={() => showTendina(false)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEDklEQVR4nO2dTWxUVRiGzzcbz5lRd2BIXJhoYiKxRiRtp3O/c4sb/xVsTIyJIho7M2iCiQtduFDUFjFiokYXRik/GjauDLRs1L3EBRooqOWfFrBwBS0EhDHHOwzD11Ttn99N+j7Jm9neeZ575+7mGAMAAAAAAAAAAAAAAAAAAAByzsSLnfGPOsNd4bO1ZcVTH73/Zc/6T756J6zv061rm7fhs21vX96m9f1rrt7Wxjb39ffKfb5hoOff9sXG7W+lG/h7WzZvf/OD97asy8rW9m5as+i25U87Ez+WLniLFxtjctO6nfKmdIcj/sERX3Dkzzviczff2HVuZHj0Ui1jJEmSqe0ZHKrdtGBpzZFvzJL/sWCilinFKJi7b7DkRxzxn81BXn7pwwu1DJJkIILcquffvSpIPcqxginOn3QQR/4NR/6iDNKzug9Bkv8W5NVXPh4XJB2/PukglrgfQZJZCWKJt03hCeFvECSZlSDBLYIk//87BEES/Rc5gtTRlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCLQlo8gAm35CCKYs0FefGHd+VoGSTIQQK78bO/sB5l//b1nv98xeLGWMZIMBGjet19/V5t33T0zF2Sivxp3xGfzuXis5dYnxqLW7j/CSq3PnYlau09Hbd2/pSuf4rbySW6rjHJ7+Vdur5zw7ZXj6crHGitWRnyxMhwWF6tH42Il7EhjHdXDnR3VQ50dlbCDnR3VA42VqvvDlpRW7ltSWjnUducztaxs4S2P1/K5eIIYU/6rcb96oiCO/Jgj/t0Rn3HkT1vixBKfsuRPWvKjlviEJX88nARgiYct+aOW/JF0fNgSHwpz5A868gfq2++Iw/Y58kP1/eLI/+yIw35yxHvT+T2O/KAjDtvtiHdN9OUzOcOvTTpIOFLBkh9GED+jMSzxyLUmmjfpIGmUqMUS78QT4mcqxs6C8bebaZLLG17kjF92+cij+pZdWbQ0HT+Szj/ctIfC8iZ+MF3UNH5g/Pz9YvfJuZxf5cjv/oefrEvO8MYrRw5pj7vyJrpr2kceZZlrTNzpKBoYH4T3hhtA+/rmKlQwpYXhSbQmfrJ+8BZpXxQAAAAAAAAAAAAAAAAAM8f5C+1qZGoCmoUzAAAAAElFTkSuQmCC" /></td>
          <td width="20%"></td>
          <td>
            <h2 className="elementinav" onClick={() => {showPage(2);showTendina(false)}}>Leggi</h2>
            <h2 className="elementinav" onClick={() => {showPage(1);showTendina(false)}}>Home</h2>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

const Navbar = ({ showPage }) => {
  const [visibleTendina, setVisibleTendina] = useState(false);
  const showTendina = (page) => {setVisibleTendina(page);};
  return (
    <table id="nav">
      <tbody>
        <tr>
          <td><h1 className="titoli" onClick={() => showPage(1)}>Sergio</h1></td>
          <td width="80%"></td>
          <td>
            {/*chiuso*/}
            {visibleTendina === false && <img className="fototendina" onClick={() => showTendina(true)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACyUlEQVR4nO2dPWtUURRFzxZM3p7RSrARGysFESRYqO/eQUXQRrD3DwiKjbX/wVJQsLQUCwV/gNhaqemtRAtNpYmRQYswScq8fd7cveD05641H29uMxHGGGNMArooJxnlXofyhigfibJB1O2WJxQwrp7oUJ4Q5bdaAJONIEa9RdQf6oMz6Qwco79P1C31oZl4BosxiXqTKJvqAzP5DPad4Y+pmigI6lP1K48jmWEebf1RtZ0myP8vcvkrjyOZAw/SobxWH5IjmgMPQpR19SE5ohkiyE/1ITmiGSCI/pAc0TgI9BEcBHrxDgK97KUI0kW5FCOji/7y0gaJkcKs53WQ6iAZ8DskGQ6SDAdJhoMkw0GS4SDJcJBkLG2Q+TVEjIwuZv3SBmltwkGqPIKDQC/eQaCX7SDQC3YQ6KU6CPQiHSSBPDqIXhgdRC+JDqIXQwfRy2CC8dUJ9BEcBHrxDgK9bAeBXrCDQC/VQaAX6SAJ5NFB9MLoIHpJdBC9GDqIXgYTjK9OoI/gINCLdxDoZTsI9IIdBHqpDgK9SAdJII8OohdGB9FLooPoxdBB9DKYYHx1An0EB4FevINAL9tBoBfsINBLdRDoRTpIAnl0EL0wOoheEh1EL4YOopfBBOOrE+gjZAqy1aG+7KK/sxr9qYi1yYEv1Dr7xehQP0yjP6ferzn2DlLeRcyOqHdrkj3eGd+ncfG4eq9m2RUk6iP1Tk2zGGQas7PqnZpm92Odn6SkdKjfdgY5GteOaTdqnPnj7c4gq1GvqHdqGqI8W/jYeq7eqWkmMbux8Btkk1EvqPdqmLXDRP208Fvky7+rEpPkXTKPUr4y6m3NRmb+r9GP97nTes+Y3V2Jeibi+tSqhuMQUV+or7eZfGJgwKgPiPpLfXAmnVAwiXq+Q3lF1D9qAUw2oWQlZqe7KA+J8paon4myoRbCloMYY4yJlvgLNQX3vNBWF4gAAAAASUVORK5CYII=" />}

            {/*aperto*/}
            {visibleTendina === true && <Tendina showPage={showPage} showTendina={showTendina} />}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
export default Navbar;