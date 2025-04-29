import WeatherCard from "@/components/weather-card";
import WeatherForm from "@/components/weather-form";
import WeatherSearchList from "@/components/weather-search-list";
import { useCurrentWeatherQuery } from "@/hooks/use-current-weather-query";
import { APICurrentWeatherSchema } from "@/services/weather.api.types";
import { useEffect, useState } from "react";

export function AppWeather() {
  const [inputCity, setInputCity] = useState("");
  const [unit, setUnit] = useState<string>("°C");
  const [recentSearchList, setRecentSearchList] = useState<
    APICurrentWeatherSchema[]
  >([]);
  const [query, setQuery] = useState<string>("");

  const { current_weather, isError, isLoading } = useCurrentWeatherQuery({
    q: query,
  });

  useEffect(() => {
    if (navigator.geolocation && !inputCity) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setQuery(`${latitude},${longitude}`);
        },
        (error) => {
          console.error("Error while trying to use geolocation : ", error);
          setQuery("Paris");
        },
      );
    }
  }, []);

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

  const handleSearch = () => {
    if (inputCity.trim()) {
      setQuery(inputCity);
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Chargement des données météo</div>;
  }

  if (isError) {
    <div className="p-4 text-center text-red-500">
      Erreur pendant le chargement des données. Merci d'essayer une autre
      location.
    </div>;
  }

  return (
    <>
      <div className="flex-row">
        <div>
          <WeatherForm
            inputCity={inputCity}
            setInputCity={setInputCity}
            handleSearch={handleSearch}
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
            Aucune donnée météo. Merci d'essayer une autre localisation.
          </div>
        )}
      </div>
      <div className="mt-6 text-center">
        <h2 className="font-semibold">Recherches récentes :</h2>
        <WeatherSearchList
          citiesRecentlySearchedList={recentSearchList}
        ></WeatherSearchList>
      </div>
    </>
  );
}
