import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logoImage from "../../images/logo.svg";
import avatarImage from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.js";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
function Header({ onCreateModal, place }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentValue = React.useContext(CurrentTemperatureUnitContext);
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
          <div>
            <button
              className="header__button"
              type="button"
              onClick={onCreateModal}
            >
              + Add New Clothes
            </button>
          </div>
          <div className="header_name">Terrence Tegegne</div>
          <Link to="/profile">
            <div className="header_avatar">
              <img src={avatarImage} alt="avatar" />
            </div>
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
