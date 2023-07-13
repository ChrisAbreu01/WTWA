import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import "../ItemCard/ItemCard.css";
import {
  CurrentTemperatureUnitContext,
  currentTemperatureUnit,
} from "../../contexts/CurrentTemperatureUnitContext";
function Main({ weatherTemp, onSelectCard, defaultClothingItems, onItemLike }) {
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
  const currentValue = React.useContext(CurrentTemperatureUnitContext);

  let unit = "";
  if (currentValue.currentTemperatureUnit === true) {
    unit = currentTemperatureUnit.celsius.unit;
    weatherTemp = Math.round(((weatherTemp - 32) * 5) / 9);
  } else {
    unit = currentTemperatureUnit.fahrenheit.unit;
  }
  const filteredCards = defaultClothingItems.filter((item) => {
    return item?.weather?.toLocaleLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard weatherTemp={weatherTemp} />
      <section className="card_section" id="card-section">
        <div className="main_title">
          Today is {weatherTemp} {unit}/ You may want to wear:
        </div>
        <div className="card_items">
          {filteredCards.map((element) => (
            <ItemCard
              card={element}
              onSelectCard={onSelectCard}
              key={element._id}
              onItemLike={onItemLike}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
export default Main;
