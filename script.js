// script.js

const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");

// List of popular currencies
const currencyCodes = [
  "USD",
  "EUR",
  "GBP",
  "INR",
  "JPY",
  "CAD",
  "AUD",
  "CHF",
  "CNY",
  "SGD",
];

function populateCurrencies() {
  currencyCodes.forEach((code) => {
    let option1 = document.createElement("option");
    option1.value = code;
    option1.text = code;
    let option2 = document.createElement("option");
    option2.value = code;
    option2.text = code;
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });
  fromCurrency.value = "USD";
  toCurrency.value = "INR";
}

populateCurrencies();

async function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    document.getElementById("result").innerText =
      "Please enter a valid amount.";
    return;
  }

  document.getElementById("result").innerText = "Converting...";

  // Using ExchangeRate-API for demonstration (you can use your own endpoint)
  const url = `https://api.exchangerate-api.com/v4/latest/${from}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch exchange rates.");
    const data = await response.json();
    const rate = data.rates[to];
    if (!rate) throw new Error("Currency not supported.");
    const converted = (amount * rate).toFixed(2);
    document.getElementById(
      "result"
    ).innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch (err) {
    document.getElementById("result").innerText = `Error: ${err.message}`;
  }
}
