import { WeatherInfoApi } from "@/types/WeatherInfoApi.type";

export default function WeatherSearchList({
  citiesRecentlySearchedList,
}: {
  citiesRecentlySearchedList: WeatherInfoApi[];
}) {
  const citiesListItems = citiesRecentlySearchedList.map((city) => {
    return <li key={city.location.name}>{city.location.name}</li>;
  });

  if (citiesListItems.length === 0) {
    return <span className="m-2">Aucune recherche récente</span>;
  }

  return <ul className="m-2">{citiesListItems}</ul>;
}
