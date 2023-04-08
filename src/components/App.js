import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather, parseWeatherData } from "../utils/WeatherApi";
function App() {
  const weatherTemp = "75°F";
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
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
  useEffect(() => {
    getForecastWeather().then((data) => {
      const temperature = parseWeatherData(data);
      setTemp(temperature);
    });
  }, []);
  return (
    <div className="app">
      <Header onCreateModal={handleCreateModal} />
      <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm title="New Garment" onClose={handleCloseModal}>
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
            <div className="modal_input" id="modal_input-link">
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
          <p className="modal_weather-subtitle">select the weather type:</p>
          <div>
            <div className="modal_weather-option">
              <input type="radio" id="hot" value="hot" />
              <label>Hot</label>
            </div>
            <div className="modal_weather-option">
              <input type="radio" id="warm" value="warm" />
              <label>warm</label>
            </div>
            <div className="modal_weather-option-last">
              <input type="radio" id="cold" value="cold" />
              <label>cold</label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
