import "./App.css";
import Header from "../Header/Header";
import { Route } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import {
  CurrentTemperatureUnitContext,
  currentTemperatureUnit,
} from "../../contexts/CurrentTemperatureUnitContext";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { ToggleSwitchContext } from "../ToggleSwitch/ToggleSwitchContext";
import Profile from "../Profile/Profile";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import AddItemModal from "../AddItemModal/AddItemModal";
import { baseUrl } from "../../utils/constants";
import { ItemsApi } from "../../utils/itemsApi";
function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [place, setPlace] = useState("");
  const [checked, setChecked] = useState(false);
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
    setChecked(!checked);
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
  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
        setPlace(data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <ToggleSwitchContext.Provider value={checked}>
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
        </ToggleSwitchContext.Provider>
      </CurrentTemperatureUnitContext.Provider>

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
