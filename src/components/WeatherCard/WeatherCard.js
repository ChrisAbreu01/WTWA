import React from "react";
import "./WeatherCard.css";
import { CurrentWeatherContext } from "../../contexts/CurrentWeatherContext";
import {
  CurrentTemperatureUnitContext,
  currentTemperatureUnit,
} from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions } from "../../utils/constants";
const WeatherCard = ({ weatherTemp = "" }) => {
  const weatherData = React.useContext(CurrentWeatherContext);
  const imageSrc = weatherOptions.filter((item) => {
    return item.day === weatherData.isDay && item.type === weatherData.weather;
  });
  const currentValue = React.useContext(CurrentTemperatureUnitContext);
  let unit = "";
  if (currentValue.currentTemperatureUnit === true) {
    unit = currentTemperatureUnit.celsius.unit;
  } else {
    unit = currentTemperatureUnit.fahrenheit.unit;
  }

  let imageSrcUrl = "";
  imageSrcUrl = imageSrc[0].url;
  return (
    <section className="weather" id="Weather">
      <div className="weather__info">
        {weatherTemp}
        {unit}
      </div>
      <img src={imageSrcUrl} alt="Sunny" className="weather__image" />
    </section>
  );
};
export default WeatherCard;
