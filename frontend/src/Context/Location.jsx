import { createContext, useContext, useEffect, useState } from "react";

//eslint-disable-next-line
const LocationContext = createContext();

//eslint-disable-next-line
const LocationAccessProvider = ({ children }) => {
  const [accessGranted, setAccessGranted] = useState(false);
  const [location, setLocation] = useState(null);

  //fetching the location
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setAccessGranted(true);
            setLocation({
              lat: position.coords.latitude,
              long: position.coords.longitude,
            });
          },
          (err) => {
            setAccessGranted(false);
            console.error("ERROR: ", err.message);
          }
        );
      } else {
        setAccessGranted(false);
        console.error("Geolocation is not supported by this browser");
      }
    };

    if (!location) getLocation();
  }, [location]);

  return (
    <LocationContext.Provider value={{ accessGranted, location }}>
      {children}
    </LocationContext.Provider>
  );
};

const useLocationAccess = () => {
  let context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useLocationAccess must be used within a LocationAccessProvider"
    );
  }
  return context;
};

export default { LocationAccessProvider, useLocationAccess };
