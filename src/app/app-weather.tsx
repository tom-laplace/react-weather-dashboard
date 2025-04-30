import { SkeletonCard } from "@/components/skeleton-card";
import WeatherCard from "@/components/weather-card";
import WeatherForm from "@/components/weather-form";
import { useCurrentWeatherQuery } from "@/hooks/use-current-weather-query";
import useGeolocation from "@/hooks/use-geolocation";
import { useRecentSearches } from "@/hooks/use-recent-searches";
import { useEffect, useRef, useState } from "react";

export function AppWeather() {
  const [inputCity, setInputCity] = useState("");
  const [unit, setUnit] = useState<string>("°C");
  const [query, setQuery] = useState<string>("");
  const prevWeatherId = useRef("");

  const { addRecentSearch } = useRecentSearches();
  const { latitude, longitude, geolocationError } = useGeolocation();
  const { current_weather, isError, isLoading } = useCurrentWeatherQuery({
    q: query,
  });

  useEffect(() => {
    if (!inputCity && latitude && longitude) {
      setQuery(`${latitude},${longitude}`);
    }

    if (geolocationError) {
      console.error("Geolocation error : ", geolocationError);
      if (!inputCity) {
        setQuery("Paris");
      }
    }
  }, [latitude, longitude, geolocationError, inputCity]);

  useEffect(() => {
    if (
      current_weather &&
      current_weather.location &&
      current_weather.location.name
    ) {
      const weatherId = `${current_weather.location.name}-${current_weather.location.country}`;

      if (weatherId !== prevWeatherId.current) {
        addRecentSearch(current_weather);
        prevWeatherId.current = weatherId;
      }
    }
  }, [current_weather, addRecentSearch]);

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (isError) {
    return (
      <div className="p-4 text-center text-red-500">
        Error while loading data. Please try another location.
      </div>
    );
  }

  return (
    <>
      <div className="flex-row mx-auto w-full">
        <div>
          <WeatherForm
            inputCity={inputCity}
            setInputCity={setInputCity}
            setQuery={setQuery}
            unit={unit}
            setUnit={setUnit}
          />
        </div>
        {current_weather ? (
          <div>
            <WeatherCard city={current_weather} unit={unit} />
          </div>
        ) : (
          <div className="p-4 text-center">
            No weather data. Please try another location.
          </div>
        )}
      </div>
    </>
  );
}
