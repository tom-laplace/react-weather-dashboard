import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APICurrentWeatherSchema } from "@/services/weather.api.types";
import FeelslikeWidget from "./feelslike-widget";
import HumidityWidget from "./humidity-widget";
import PrecipitationWidget from "./precipitation-widget";
import UvWidget from "./uv-widget";

export default function WeatherCard({
  city,
  unit,
}: {
  city: APICurrentWeatherSchema | null;
  unit: string;
}) {
  if (!city) {
    return <div>Aucune ville trouvée</div>;
  }

  if (!city) {
    return <div>Données de localisation indisponibles</div>;
  }

  return (
    <>
      <Card className="w-1/2 mx-auto text-center">
        <CardHeader>
          <CardTitle className="text-2xl">
            {city.location.name}, {city.location.country}
          </CardTitle>
          <CardDescription className="flex flex-col">
            <div>
              <span className="font-bold text-4xl">
                {unit === "°C" ? city.current?.temp_c : city.current?.temp_f}
              </span>
              {unit}
            </div>
            <div>{city.current.condition.text}</div>
          </CardDescription>
          <CardContent className="mx-auto">
            <img
              src={city.current.condition.icon}
              alt={city.current.condition.text}
            />
          </CardContent>
        </CardHeader>
        <CardContent className="flex flex-row justify-around space-x-4">
          <FeelslikeWidget
            feelslike_c={city.current.feelslike_c}
            feelslike_f={city.current.feelslike_f}
            unit={unit}
          ></FeelslikeWidget>
          <UvWidget uv={city.current.uv}></UvWidget>
          <PrecipitationWidget
            precip_mm={city.current.precip_mm}
          ></PrecipitationWidget>
          <HumidityWidget humidity={city.current.humidity}></HumidityWidget>
        </CardContent>
      </Card>
    </>
  );
}
