import { tsr } from "@/services/weather.api";

export function useCurrentWeatherQuery({ q }: { q: string }) {
  const { data, isError, isLoading } = tsr.getCurrentWeather.useQuery({
    queryData: {
      query: {
        q: q,
        key: import.meta.env.VITE_WEATHER_API_KEY,
      },
    },
    retry: 1,
    queryKey: ["current-weather", q],
    enabled: q.length > 0,
    refetchInterval: 60 * 1000,
  });

  return {
    current_weather: data?.body || null,
    isError,
    isLoading,
  };
}
