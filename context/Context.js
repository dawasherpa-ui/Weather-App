"use client"
// LocationContext.js
import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null); // Default values for latitude, longitude, and country

  const setGlobalLocation = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <LocationContext.Provider value={{ location, setGlobalLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  return useContext(LocationContext);
};
