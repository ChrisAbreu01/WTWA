import React from "react";
export const CurrentTemperatureUnitContext = React.createContext();
export const currentTemperatureUnit = {
  celsius: {
    unit: "°C",
  },
  fahrenheit: {
    unit: "°F",
  },
};
