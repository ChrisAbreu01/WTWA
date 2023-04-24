import "./App.css";
import Header from "../Header/Header";
import { Route } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { ToggleSwitchContext } from "../ToggleSwitch/ToggleSwitchContext";
import Profile from "../Profile/Profile";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [place, setPlace] = useState("");
  const [checked, setChecked] = useState(false);
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
  const handleSubmitForm = () => {
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
            <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
          </Route>
          <Route exact path="/profile">
            <Profile onSelectCard={handleSelectedCard} />
          </Route>
        </Switch>
      </ToggleSwitchContext.Provider>

      {activeModal === "create" && (
        <ModalWithForm
          title="New Garment"
          onClose={handleCloseModal}
          buttonText="Add garment"
          name="Name"
          handleSubmitForm={handleSubmitForm}
        >
          <div className="modal_inputs">
            <div className="modal_input">
              <label>
                <div>Name</div>
                <input
                  className="modal_input-field"
                  placeholder="Name"
                  type="text"
                  name="name"
                  minLength="1"
                  maxLength="30"
                ></input>
              </label>
            </div>
            <div className="modal_input modal_input-link">
              <label>
                <div>Image</div>
                <input
                  className="modal_input-field"
                  placeholder="Image URL"
                  type="url"
                  name="link"
                  minLength="1"
                  maxLength="30"
                ></input>
              </label>
            </div>
          </div>
          <p className="modal_weather-subtitle">Select the weather type:</p>
          <div>
            <div className="modal_weather-option">
              <input type="radio" id="hot" value="hot" />
              <label>Hot</label>
            </div>
            <div className="modal_weather-option">
              <input type="radio" id="warm" value="warm" />
              <label>Warm</label>
            </div>
            <div className="modal_weather-option-last">
              <input type="radio" id="cold" value="cold" />
              <label>Cold</label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
      <Footer />
    </div>
  );
}

export default App;
