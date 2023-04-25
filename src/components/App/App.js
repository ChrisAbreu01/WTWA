import "./App.css";
import Header from "../Header/Header";
import { Route } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { ToggleSwitchContext } from "../ToggleSwitch/ToggleSwitchContext";
import Profile from "../Profile/Profile";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";
function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [place, setPlace] = useState("");
  const [checked, setChecked] = useState(false);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const handleChange = () => {
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
    handleCloseModal();
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
      <ToggleSwitchContext.Provider value={checked}>
        <Header
          onCreateModal={handleCreateModal}
          place={place}
          setChecked={handleChange}
        />
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

      {activeModal === "create" && (
        <AddItemModal
          isOpen={activeModal}
          onAddItem={handleAddItemSubmit}
          handleCloseModal={handleCloseModal}
        />
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
      <Footer />
    </div>
  );
}

export default App;
