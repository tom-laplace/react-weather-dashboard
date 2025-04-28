import { useState } from "react";
import WeatherCard from "@/components/weather-card";
import { getCityWeather } from "@/data/weather.api";
import { WeatherInfoApi } from "@/types/WeatherInfoApi.type";
import WeatherForm from "./weather-form";
import WeatherSearchList from "./weather-search-list";

export function WeaterDashboard() {
  const [inputCity, setInputCity] = useState("");
  const [city, setCity] = useState<WeatherInfoApi>();
  const [unit, setUnit] = useState<string>("°C");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setIsError] = useState<boolean>(false);
  const [recentSearchList, setRecentSearchList] = useState<WeatherInfoApi[]>(
    []
  );

  const handleSearch = async () => {
    setIsLoading(true);

    const payload = await getCityWeather(inputCity);

    if (payload.error) {
      setIsError(false);
    }

    setCity(payload.payload);
    setRecentSearchList([...recentSearchList, payload.payload]);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>En cours...</div>;
  }

  if (error) {
    return <div>Erreur pendant la recherche</div>;
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
        <div>
          <WeatherCard city={city} unit={unit}></WeatherCard>
        </div>
      </div>
      <WeatherSearchList
        citiesRecentlySearchedList={recentSearchList}
      ></WeatherSearchList>
    </>
  );
}
