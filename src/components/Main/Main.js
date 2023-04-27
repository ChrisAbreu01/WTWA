import React from "react";
import { ToggleSwitchContext } from "../ToggleSwitch/ToggleSwitchContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
// import { defaultClothingItems } from "../../utils/constants";
import "./Main.css";
import "../ItemCard/ItemCard.css";
import { unitFormat } from "../ToggleSwitch/ToggleSwitchContext";
function Main({ weatherTemp, onSelectCard, defaultClothingItems }) {
  const getWeatherType = () => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  };
  const weatherType = getWeatherType();
  const currentValue = React.useContext(ToggleSwitchContext);

  let unit = "";
  if (currentValue === true) {
    unit = unitFormat.celsius.unit;
    weatherTemp = Math.round(((weatherTemp - 32) * 5) / 9);
  } else {
    unit = unitFormat.fahrenheit.unit;
  }
  const filteredCards = defaultClothingItems.filter((item) => {
    return item?.weather?.toLocaleLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={false} type="cloudy" weatherTemp={weatherTemp} />
      <section className="card_section" id="card-section">
        <div className="main_title">
          Today is {weatherTemp} {unit}/ You may want to wear:
        </div>
        <div className="card_items">
          {filteredCards.map((element) => (
            <ItemCard
              card={element}
              onSelectCard={onSelectCard}
              key={element.id}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
export default Main;
