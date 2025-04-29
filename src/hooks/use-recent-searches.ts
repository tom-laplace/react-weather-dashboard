import { APICurrentWeatherSchema } from "@/services/weather.api.types";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "recent_weather_searches";
const MAX_RECENT_SEARCHES = 5;

export function useRecentSearches(maxItems = MAX_RECENT_SEARCHES) {
  const [recentSearches, setRecentSearches] = useState<
    APICurrentWeatherSchema[]
  >(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const storedSearches = localStorage.getItem(STORAGE_KEY);
    if (storedSearches) {
      try {
        return JSON.parse(storedSearches);
      } catch (error) {
        console.error("Failed to parse stored searches : ", error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearches));
  }, [recentSearches]);

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
        }

        return [weather, ...prev.slice(0, maxItems - 1)];
      });
    },
    [maxItems],
  );

  const removeRecentSearch = useCallback((index: number) => {
    setRecentSearches((prev) => {
      const newList = [...prev];
      newList.splice(index, 1);
      return newList;
    });
  }, []);

  return {
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
  };
}
