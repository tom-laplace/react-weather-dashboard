import { Button } from "@/components/ui/button";
import { useRecentSearches } from "@/hooks/use-recent-searches";
import { APICurrentWeatherSchema } from "@/services/weather.api.types";
import { X } from "lucide-react";
import { useCallback } from "react";

export default function CitiesList({
  citiesList,
  listType,
}: {
  citiesList: APICurrentWeatherSchema[] | undefined;
  listType: "Recents" | "Favorites";
}) {
  const { removeRecentSearch } = useRecentSearches();

  const handleCityClick = useCallback((city: APICurrentWeatherSchema) => {
    console.log(`Clic sur ${city.location.name}`);
  }, []);

  const handleRemove = useCallback(
    (index: number, e: React.MouseEvent) => {
      e.stopPropagation(); 
      removeRecentSearch(index);
    },
    [removeRecentSearch],
  );

  const citiesListItems = citiesList?.map((city, index) => {
    return (
      <li
        key={`${city.location.name}-${city.location.country}-${index}`}
        className="flex items-center justify-between py-1 px-2 my-1 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer"
        onClick={() => handleCityClick(city)}
      >
        <div className="flex items-center gap-2">
          <img
            src={city.current.condition.icon}
            alt={city.current.condition.text}
            className="w-6 h-6"
          />
          <span>{city.location.name}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-50 hover:opacity-100"
          onClick={(e) => handleRemove(index, e)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Supprimer</span>
        </Button>
      </li>
    );
  });

  if (!citiesListItems || citiesListItems.length === 0) {
    return <span className="m-2">Aucune recherche récente</span>;
  }

  return (
    <>
      <h2 className="font-semibold">{listType} :</h2>
      <ul className="m-2">{citiesListItems}</ul>
    </>
  );
}
