import { React, useContext } from "react";
import "./Header.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import logoImage from "../../images/logo.svg";
// import avatarImage from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Header({ onCreateModal, place, onLogin, onRegister, setUser }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentValue = useContext(CurrentTemperatureUnitContext);
  const user = useContext(CurrentUserContext);
  const history = useHistory();
  const location = useLocation();
  const isMain = location.pathname === "/";
  const isProfile = location.pathname === "/profile";
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    history.push("/");
  };
  return (
    <div>
      <header className="header">
        <div className="header__logo">
          <Link to="/">
            <div>
              <img src={logoImage} alt="logo" className="header_logo-image" />
            </div>
          </Link>
          <div>
            {currentDate}, {place}
          </div>
        </div>
        <div className="header__avatar-logo">
          <div className="header_toggle">
            <ToggleSwitch value={currentValue.currentTemperatureUnit} />
          </div>
          {user ? (
            <>
              <div>
                <button
                  className="header__button"
                  type="button"
                  onClick={onCreateModal}
                >
                  + Add New Clothes
                </button>
              </div>
              <div className="header_name">{user.name}</div>
              <Link to="/profile">
                <div className="header_avatar">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="header_avatar"
                  />
                </div>
              </Link>
              {/* {!isMain && !isProfile && (
                <button onClick={handleSignOut} className="header_signout">
                  Sign out
                </button>
              )} */}
            </>
          ) : (
            <>
              <span className="header_nav" onClick={onLogin}>
                Log in
              </span>
              <span className="header_nav" onClick={onRegister}>
                Sign up
              </span>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
