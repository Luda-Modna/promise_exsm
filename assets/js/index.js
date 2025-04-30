"use strict";

//temperature_unit=fahrenheit

let isCelsiusDegrii = true;

const tempUnitBtn = document.getElementById("tempUnitBtn");


tempUnitBtn.onclick = switchTemperatureUnit;
function switchTemperatureUnit() {
  isCelsiusDegrii = !isCelsiusDegrii;
  updateData();
}

updateData();

function updateData() {
  tempUnitBtn.textContent = `Switch to ${isCelsiusDegrii ? "F" : "C"}`;

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=47.8517&longitude=35.1171&current_weather=true&timezone=auto${
    isCelsiusDegrii ? "" : "&temperature_unit=fahrenheit"
  }`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => updateWeather(data))
    .catch((err) => console.log(err));
}

function updateWeather({
  current_weather: { temperature, windspeed },
  current_weather_units: { temperature: tempUnit, windspeed: windspeedUnit },
}) {
  const currentemperatureEl = document.querySelector(".temp");
  currentemperatureEl.textContent = `${temperature} ${tempUnit}`;
  currentemperatureEl.style.color = calcColorTemperature(temperature);
  currentemperatureEl.classList.add("weather");

  const currentWindEl = document.querySelector(".wind");
  currentWindEl.textContent = `${windspeed} ${windspeedUnit}`;
  currentWindEl.classList.add("weather");
}

function calcColorTemperature(temperature) {
  if (temperature < 0) {
    return "blue";
  } else if (temperature === 0) {
    return "black";
  } else if (temperature > 0 && temperature < 40) {
    return "green";
  } else {
    return "red";
  }
}
