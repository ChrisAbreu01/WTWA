import React from "react";
import "./Header.css";
import logoImage from "../../images/logo.svg";
import avatarImage from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.js";
import { ToggleSwitchContext } from "../ToggleSwitch/ToggleSwitchContext";
function Header({ onCreateModal, place, setChecked }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentValue = React.useContext(ToggleSwitchContext);
  return (
    <div>
      <header className="header">
        <div className="header__logo">
          <div>
            <img src={logoImage} alt="logo" className="header_logo-image" />
          </div>
          <div>
            {currentDate}, {place}
          </div>
        </div>
        <div className="header__avatar-logo">
          <div className="header_toggle">
            <ToggleSwitch value={currentValue} handleToggle={setChecked} />
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
          <div className="header_avatar">
            <img src={avatarImage} alt="avatar" />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
