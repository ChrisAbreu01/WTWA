import "./App.css";
import Header from "../Header/Header";
import { Route } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import Profile from "../Profile/Profile";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import AddItemModal from "../AddItemModal/AddItemModal";
import { baseUrl } from "../../utils/constants";
import { ItemsApi } from "../../utils/itemsApi";
import { CurrentWeatherContext } from "../../contexts/CurrentWeatherContext";
function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [place, setPlace] = useState("");
  const [isDay, setIsDay] = useState(false);
  const [weather, setWeather] = useState("Clear");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState(false);
  const itemsApi = new ItemsApi({ baseUrl });
  const defaultClothingItems = [];
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  useEffect(() => {
    itemsApi
      .getItems()
      .then((res) => {
        setClothingItems(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(!currentTemperatureUnit);
  };
  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddItemSubmit = (item) => {
    setClothingItems([item, ...clothingItems]);
    itemsApi.addItem(item);
    handleCloseModal();
  };
  const handleDeleteItem = (item) => {
    itemsApi.deleteItem(item).then(() => {
      const updatedClothingItems = clothingItems.filter((element) => {
        return element.id !== item.id;
      });
      console.log(updatedClothingItems);
      handleCloseModal();
      setClothingItems(updatedClothingItems);
    });
  };
  let timeTosunset = 0;
  let timeTosunrise = 0;
  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
        console.log(data);
        timeTosunset = data.sys.sunset;
        timeTosunrise = data.sys.sunrise;
        console.log(data.weather[0].main);
        setWeather(data.weather[0].main);
        setPlace(data.name);
        isDaytime();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function isDaytime() {
    const now = Date.now();
    const hours = new Date(now).getHours();
    const sunrise = new Date(timeTosunrise * 1000).getHours();
    const sunset = new Date(timeTosunset * 1000).getHours();
    if (hours >= sunrise || hours < sunset) {
      setIsDay(false);
    } else {
      setIsDay(true);
    }
  }

  return (
    <div className="app">
      <CurrentWeatherContext.Provider value={{ isDay, weather }}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header onCreateModal={handleCreateModal} place={place} />
          <Switch>
            <Route exact path="/">
              <Main
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                defaultClothingItems={clothingItems}
              />
            </Route>
            <Route exact path="/profile">
              <Profile
                onSelectCard={handleSelectedCard}
                onCreateModal={handleCreateModal}
                defaultClothingItems={clothingItems}
              />
            </Route>
          </Switch>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentWeatherContext.Provider>

      {activeModal === "create" && (
        <AddItemModal
          isOpen={activeModal}
          onAddItem={handleAddItemSubmit}
          handleCloseModal={handleCloseModal}
        />
      )}
      {activeModal === "preview" && (
        <ItemModal
          selectedCard={selectedCard}
          onClose={handleCloseModal}
          onDelete={handleDeleteItem}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
