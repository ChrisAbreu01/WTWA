import * as React from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = ({ value }) => {
  const temperatureContext = React.useContext(CurrentTemperatureUnitContext);
  return (
    <>
      <input
        checked={value}
        onChange={temperatureContext.handleToggleSwitchChange}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{
          background: value && "#FFFFFF",
          border: !value && "2px solid #000",
        }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <div>
          <p
            style={{ color: !value && "white" }}
            className="react-switch-letter-right"
          >
            F
          </p>
        </div>
        <div>
          <p
            style={{ color: value && "white" }}
            className="react-switch-letter-left"
          >
            C
          </p>
        </div>
        <span className={`react-switch-button`}></span>
      </label>
    </>
  );
};

export default ToggleSwitch;
