import { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";
import { listCurrencyFlags } from "./utils/utils";

function App() {
  let token = "";

  const [currency, setCurrency] = useState([]);
  const [fullNameCurrency, setFullNameCurrency] = useState([]);
  const [choosedCurrency, setChoosedCurrency] = useState('0');

  useEffect(() => {
    getCurrency();
    getFullNameCurrency();
  }, []);

  const getCurrency = async () => {
    await axios
      .get("http://data.fixer.io/api/latest?access_key=" + token)
      .then(function (response) {
        setCurrency(
          Object.entries(response.data.rates).map((e) => ({
            name: e[0],
            count: e[1],
          }))
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getFullNameCurrency = async () => {
    await axios
      .get("http://data.fixer.io/api/symbols?access_key=" + token)
      .then(function (response) {
        setFullNameCurrency(
          Object.entries(response.data.symbols).map((e) => ({
            name: e[0],
            fullname: e[1],
          }))
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  

  return <div className="App">
    <div style={{ display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',}}>
      <div>
      <select name="choice" onChange={(e) => setChoosedCurrency(e.target.value)} >
      <option value="0">Выберите валюту</option>
      {currency.map((item) => {
        return (
          <option value={item.name}>{fullNameCurrency.find((item1) => item1.name == item.name ).fullname}</option>
        )
      })}

</select>
      </div>
      <div style={{ marginLeft: 20}}>
      {choosedCurrency != '0' ? (
        <div>
        <img src={`https://flagcdn.com/32x24/${Object.entries(listCurrencyFlags).map((e) => ({
            name: e[0],
            fullname: e[1],
          })).find((item) => item.fullname == choosedCurrency).name.toLocaleLowerCase()}.png`} />
        <p>Валюта: {fullNameCurrency.find((item1) => item1.name == choosedCurrency).fullname}</p>
        <p>Курс: {currency.find((item1) => item1.name == choosedCurrency).count}</p>
        </div>
      ): ''}

      </div>
    </div>
  </div>;
}

export default App;
