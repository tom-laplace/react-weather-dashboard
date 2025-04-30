import { APICurrentWeatherSchema } from "@/services/weather.api.types";
import { atomWithStorage } from "jotai/utils";

const STORAGE_KEY = "recent_weather_searches";

export const recentSearchesAtom = atomWithStorage<APICurrentWeatherSchema[]>(
  STORAGE_KEY,
  [],
);
