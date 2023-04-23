import React from "react";
import "./WeatherCard.css";
import { ToggleSwitchContext } from "../ToggleSwitch/ToggleSwitchContext";
import { unitFormat } from "../ToggleSwitch/ToggleSwitchContext";
import { weatherOptions } from "../../utils/constants";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imageSrc = weatherOptions.filter((item) => {
    return item.day === day && item.type === type;
  });
  const currentValue = React.useContext(ToggleSwitchContext);
  let unit = "";
  if (currentValue === true) {
    unit = unitFormat.celsius.unit;
  } else {
    unit = unitFormat.fahrenheit.unit;
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
