"use strict";

const weatherUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=47.8517&longitude=35.1171&current_weather=true&timezone=auto";

fetch(weatherUrl)
  .then((response) => response.json())
  .then((data) => updateWeather(data))
  .catch((err) => console.log(err));

function updateWeather({
  current_weather: { temperature, windspeed },
  current_weather_units: { temperature: tempUnit, windspeed: windspeedUnit },
}) {
  const currentemperatureEl = document.createElement("div");
  currentemperatureEl.textContent = `${temperature} ${tempUnit}`;
  currentemperatureEl.style.color = calcColorTemperature(temperature);

  const currentWindEl = document.createElement("div");
  currentWindEl.textContent = `${windspeed} ${windspeedUnit}`;

  document.body.append(currentemperatureEl, currentWindEl);
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
