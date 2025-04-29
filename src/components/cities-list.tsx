import { APICurrentWeatherSchema } from "@/services/weather.api.types";

export default function CitiesList({
  citiesList,
  listType,
}: {
  citiesList: APICurrentWeatherSchema[] | undefined;
  listType: "Recents" | "Favorites";
}) {
  const citiesListItems = citiesList?.map((city, index) => {
    return (
      <li key={`${city.location.name}-${city.location.country}-${index}`}>
        {city.location.name}
      </li>
    );
  });

  if (!citiesListItems) {
    return <span className="m-2">Aucune recherche récente</span>;
  }

  return (
    <>
      <h2 className="font-semibold">{listType} :</h2>
      <ul className="m-2">{citiesListItems}</ul>
    </>
  );
}
