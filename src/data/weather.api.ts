import { WeatherInfoApi } from "@/types/WeatherInfoApi.type";

// const url = "https://api.weatherapi.com/v1/current.json?";
const weatherApiKey = "d0db54b0d6a441318b2171036252804";

export async function getCityWeather(city: string) {
  try {
    const response = await fetch(`${url}q=${city}&key=${weatherApiKey}`);

    const data = await response.json();
    const payload = mapJsonResponseToPayload(data);

    return { payload, error: "" };
  } catch (err) {
    return {
      payload: {} as WeatherInfoApi,
      error: err instanceof Error ? err.message : "Une erreur est survenue",
    };
  }
}

function mapJsonResponseToPayload(data: WeatherInfoApi) {
  let payload: WeatherInfoApi = {
    location: {
      lat: data.location.lat,
      name: data.location.name,
      region: data.location.region,
      country: data.location.country,
      lon: data.location.lon,
    },
    current: {
      temp_c: data.current.temp_c,
      temp_f: data.current.temp_f,
      humidity: data.current.humidity,
      cloud: data.current.cloud,
      uv: data.current.uv,
    },
  };

  return payload;
}
