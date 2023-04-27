import React from "react";
import "./WeatherCard.css";
import {
  CurrentTemperatureUnitContext,
  currentTemperatureUnit,
} from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions } from "../../utils/constants";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imageSrc = weatherOptions.filter((item) => {
    return item.day === day && item.type === type;
  });
  const currentValue = React.useContext(CurrentTemperatureUnitContext);
  let unit = "";
  if (currentValue.currentTemperatureUnit === true) {
    unit = currentTemperatureUnit.celsius.unit;
  } else {
    unit = currentTemperatureUnit.fahrenheit.unit;
  }
  const imageSrcUrl = imageSrc[0].url || "";
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
