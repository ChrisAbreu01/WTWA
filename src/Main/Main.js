import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../Util/Constants";

function Main({ weatherTemp, onSelectCard }) {
  return (
    <main className="main">
      <WeatherCard day={false} type="cloudy" weatherTemp={weatherTemp} />
      <section className="card_section" id="card-section">
        <div className="main_title">
          Today is {weatherTemp} / You may want to wear:
        </div>
        <div className="card_items">
          {defaultClothingItems.map((x) => (
            <ItemCard x={x} onSelectCard={onSelectCard} />
          ))}
        </div>
      </section>
    </main>
  );
}
export default Main;
