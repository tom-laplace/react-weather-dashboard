import { SkeletonCard } from "@/components/skeleton-card";
import WeatherCard from "@/components/weather-card";
import WeatherForm from "@/components/weather-form";
import WeatherSearchList from "@/components/weather-search-list";
import { useCurrentWeatherQuery } from "@/hooks/use-current-weather-query";
import useGeolocation from "@/hooks/use-geolocation";
import { APICurrentWeatherSchema } from "@/services/weather.api.types";
import { useEffect, useState } from "react";

export function AppWeather() {
  const [inputCity, setInputCity] = useState("");
  const [unit, setUnit] = useState<string>("°C");
  const [recentSearchList, setRecentSearchList] = useState<
    APICurrentWeatherSchema[]
  >([]);
  const [query, setQuery] = useState<string>("");

  const { latitude, longitude, geolocationError } = useGeolocation();
  const { current_weather, isError, isLoading } = useCurrentWeatherQuery({
    q: query,
  });

  useEffect(() => {
    if (!inputCity) {
      setQuery(`${latitude},${longitude}`);
    }

    if (geolocationError) {
      console.error("Geolocation error : ", geolocationError);
      setInputCity("Paris");
    }
  }, [latitude, longitude, geolocationError]);

  useEffect(() => {
    if (current_weather) {
      setRecentSearchList((prev) => {
        const exists = prev.some(
          (item) =>
            item.location.name === current_weather.location.name &&
            item.location.country === current_weather.location.country,
        );

        if (exists) return prev;

        return [current_weather, ...prev].slice(0, 5);
      });
    }
  }, [current_weather]);

  if (isLoading) {
    return <SkeletonCard></SkeletonCard>;
  }

  if (isError) {
    <div className="p-4 text-center text-red-500">
      Error while loading data. Please try an other location.
    </div>;
  }

  return (
    <>
      <div className="flex-row mx-auto w-screen">
        <div>
          <WeatherForm
            inputCity={inputCity}
            setInputCity={setInputCity}
            setQuery={setQuery}
            unit={unit}
            setUnit={setUnit}
          ></WeatherForm>
        </div>
        {current_weather ? (
          <div>
            <WeatherCard city={current_weather} unit={unit}></WeatherCard>
          </div>
        ) : (
          <div className="p-4 text-center">
            No weather data. Please try an other location.
          </div>
        )}
      </div>
      <div className="mt-6 text-center">
        <h2 className="font-semibold">Recently searched :</h2>
        <WeatherSearchList
          citiesRecentlySearchedList={recentSearchList}
        ></WeatherSearchList>
      </div>
    </>
  );
}
