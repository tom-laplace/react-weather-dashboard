import { useCallback, useEffect, useState } from "react";

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
}

interface Coordinates {
  latitude: number | null;
  longitude: number | null;
  geolocationError: GeolocationPositionError | null;
}

type GeolocationCallback = (coordinates: Coordinates) => void;

const useGeolocation = (
  options: GeolocationOptions = {},
  callback?: GeolocationCallback,
  isEnabled = true,
) => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: null,
    longitude: null,
    geolocationError: null,
  });

  const updateCoordinates = useCallback(
    ({ coords }: GeolocationPosition) => {
      const { latitude, longitude } = coords;

      const newCoordinates: Coordinates = {
        latitude,
        longitude,
        geolocationError: null,
      };

      setCoordinates(newCoordinates);

      if (typeof callback === "function") {
        callback(newCoordinates);
      }
    },
    [callback],
  );

  const setError = useCallback((error: GeolocationPositionError) => {
    setCoordinates({
      latitude: null,
      longitude: null,
      geolocationError: error,
    });
  }, []);

  useEffect(() => {
    let watchId: number;

    if (isEnabled && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateCoordinates, setError);
      watchId = navigator.geolocation.watchPosition(
        updateCoordinates,
        setError,
        {
          enableHighAccuracy: options.enableHighAccuracy,
          maximumAge: options.maximumAge,
          timeout: options.timeout,
        },
      );
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [
    isEnabled,
    callback,
    options.enableHighAccuracy,
    options.maximumAge,
    options.timeout,
    setError,
    updateCoordinates,
  ]);

  return coordinates;
};

export default useGeolocation;
