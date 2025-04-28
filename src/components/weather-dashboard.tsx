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
  const [isError, setIsError] = useState<boolean>(false);
  const [recentSearchList, setRecentSearchList] = useState<WeatherInfoApi[]>(
    []
  );

  if (navigator.geolocation && !inputCity) {
    navigator.geolocation.getCurrentPosition(geolocationSuccess);
  }

  async function geolocationSuccess(position: GeolocationPosition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const payload = await getCityWeather(latitude.toString + longitude.toString());

    if (payload.error) {
      setIsError(true);
    }

    setCity(payload.payload);
    setIsLoading(false);
  }

  const addCityToSearchList = (city: WeatherInfoApi) => {
    const cityExists = recentSearchList.some(
      (existingCity) => existingCity.location.name === city.location.name
    );

    if (!cityExists) {
      setRecentSearchList([...recentSearchList, city]);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);

    const payload = await getCityWeather(inputCity);

    if (payload.error) {
      setIsError(true);
    }

    setCity(payload.payload);
    addCityToSearchList(payload.payload);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>En cours...</div>;
  }

  if (isError) {
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
