import React, {
  useState,
  createContext,
  useEffect,
  useMemo,
  useContext,
} from "react";

import {
  restaurantsRequest,
  restaurantsTransform,
} from "./restaurants.service";

import { LocationContext } from "../location/location.context";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
  const { location } = useContext(LocationContext);

  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const retrieveRestaurants = (searchLocation) => {
    setIsLoading(true);
    setRestaurants([]);
    setTimeout(() => {
      restaurantsRequest(searchLocation)
        .then(restaurantsTransform)
        .then((results) => {
          setIsLoading(false);
          setRestaurants(results);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 2000);
  };

  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveRestaurants(locationString);
    }
  }, [location]);

  return (
    <RestaurantsContext.Provider value={{ restaurants, isLoading, error }}>
      {children}
    </RestaurantsContext.Provider>
  );
};
// restaurantsRequest()
//   .then(restaurantsTransform)
//   .then((transformResponse) => console.log(transformResponse))
//   .catch((err) => console.log(err));
