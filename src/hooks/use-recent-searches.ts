import { APICurrentWeatherSchema } from "@/services/weather.api.types";
import { recentSearchesAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useCallback } from "react";

const MAX_RECENT_SEARCHES = 5;

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useAtom(recentSearchesAtom);

  const addRecentSearch = useCallback(
    (weather: APICurrentWeatherSchema) => {
      setRecentSearches((prev) => {
        const exists = prev.some(
          (item) =>
            item.location.name === weather.location.name &&
            item.location.country === weather.location.country,
        );

        if (exists) {
          const filteredList = prev.filter(
            (item) =>
              item.location.name !== weather.location.name ||
              item.location.country !== weather.location.country,
          );
          return [weather, ...filteredList];
        } else {
          return [weather, ...prev.slice(0, MAX_RECENT_SEARCHES - 1)];
        }
      });
    },
    [setRecentSearches],
  );

  const removeRecentSearch = useCallback(
    (index: number) => {
      setRecentSearches((prev) => {
        const newList = [...prev];
        newList.splice(index, 1);
        return newList;
      });
    },
    [setRecentSearches],
  );

  return {
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
  };
}
