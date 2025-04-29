import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APICurrentWeatherSchema } from "@/services/weather.api.types";

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
      <Card className="w-1/2 mx-auto">
        <CardHeader>
          <CardTitle>Météo du jour</CardTitle>
          <CardDescription>
            Actuellement dans la ville de {city.location.name},{" "}
            {city.location.region}, {city.location.country} :
          </CardDescription>
          <CardContent>
            <img
              src={city.current.condition.icon}
              alt={city.current.condition.text}
            />
          </CardContent>
        </CardHeader>
        <CardContent>
          Température de{" "}
          <span className="font-bold">
            {unit === "°C" ? city.current?.temp_c : city.current?.temp_f}
          </span>
          {unit}
        </CardContent>
        <CardFooter>
          <div>
            <span className="font-bold mx-2">
              Humidité : {city?.current.humidity}%
            </span>
            <span className="font-bold mx-2">UV : {city?.current.uv}</span>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
