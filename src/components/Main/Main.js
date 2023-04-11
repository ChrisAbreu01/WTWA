import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import "./Main.css";
import "../ItemCard/ItemCard.css";
function Main({ weatherTemp, onSelectCard }) {
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

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLocaleLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={false} type="cloudy" weatherTemp={weatherTemp} />
      <section className="card_section" id="card-section">
        <div className="main_title">
          Today is {weatherTemp}°F/ You may want to wear:
        </div>
        <div className="card_items">
          {filteredCards.map((element) => (
            <ItemCard
              card={element}
              onSelectCard={onSelectCard}
              id={element._id}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
export default Main;
