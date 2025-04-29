import { APICurrentWeatherSchema } from "@/services/weather.api.types";

export default function CitiesList({
  citiesList,
  listType,
}: {
  citiesList: APICurrentWeatherSchema[];
  listType: "Recents" | "Favorites";
}) {
  const citiesListItems = citiesList.map((city) => {
    return <li key={city.location.name}>{city.location.name}</li>;
  });

  if (citiesListItems.length === 0) {
    return <span className="m-2">Aucune recherche récente</span>;
  }

  return (
    <>
      <h2 className="font-semibold">{listType} :</h2>
      <ul className="m-2">{citiesListItems}</ul>
    </>
  );
}
