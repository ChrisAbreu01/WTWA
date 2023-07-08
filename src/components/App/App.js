import "./App.css";
import Header from "../Header/Header";
import { Route } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useEffect, useState, useCallback } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import Profile from "../Profile/Profile";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import AddItemModal from "../AddItemModal/AddItemModal";
import { baseUrl } from "../../utils/constants";
import { ItemsApi } from "../../utils/itemsApi";
import { CurrentWeatherContext } from "../../contexts/CurrentWeatherContext";
import { checkToken, signIn, signUp } from "../../utils/auth";
import CurrentUserContext from "../../context/currentUserContext";
const itemsApi = new ItemsApi({ baseUrl });
function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [place, setPlace] = useState("");
  const [isDay, setIsDay] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [weather, setWeather] = useState("Clear");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState(false);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [token, setToken] = useState(null);
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
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
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
    itemsApi
      .addItem(item)
      .then((newCard) => {
        setClothingItems([item, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSigningOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  const isReloading = (token) => {
    checkToken(token)
      .then((res) => {
        setUser(res.data);
        setLoginModalOpen(false);
        setRegisterModalOpen(false);
        setAuthError("");
        setToken(token);
      })
      .catch((error) => {
        console.error("Error token invalid:", error);
        setAuthError("Error  token invalid");
      });
  };

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    if (currentToken) {
      isReloading(currentToken);
    }
  }, []);
  const handleLoginIn = ({ email, password }) => {
    signIn(email, password)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("token", res.token);
        } else {
          setAuthError(res.message || "Invalid credentials");
        }
      })
      .catch(() => {
        setAuthError("Incorrect password");
      });
  };
  const handleRegistration = ({ name, avatar, email, password }) => {
    signUp(name, avatar, email, password)
      .then((res) => {
        handleLoginIn({ email, password });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteItem = (item) => {
    itemsApi
      .deleteItem(item)
      .then(() => {
        const updatedClothingItems = clothingItems.filter((element) => {
          return element.id !== item.id;
        });
        handleCloseModal();
        setClothingItems(updatedClothingItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let timeTosunset = 0;
  let timeTosunrise = 0;
  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
        timeTosunset = data.sys.sunset;
        timeTosunrise = data.sys.sunrise;
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
      <CurrentUserContext.Provider value={user}>
        <CurrentWeatherContext.Provider value={{ isDay, weather }}>
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header
              onCreateModal={handleCreateModal}
              place={place}
              onLogin={() => setLoginModalOpen(true)}
              onRegister={() => setRegisterModalOpen(true)}
              setUser={setUser}
            />
            <Switch>
              <ProtectedRoute
                path="/profile"
                isAuthenticated={!!currentUser}
                component={Profile}
                onSelectCard={handleSelectedCard}
                onCreateModal={handleCreateModal}
                defaultClothingItems={clothingItems}
              />
              <Route exact path="/">
                <Main
                  weatherTemp={temp}
                  onSelectCard={handleSelectedCard}
                  defaultClothingItems={clothingItems}
                />
              </Route>
              {/* <Route exact path="/profile">
              <Profile
                onSelectCard={handleSelectedCard}
                onCreateModal={handleCreateModal}
                defaultClothingItems={clothingItems}
              />
            </Route> */}
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
