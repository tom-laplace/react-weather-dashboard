import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { WeatherInfoApi } from "@/types/WeatherInfoApi.type";

export default function WeatherCard({
  city,
  unit,
}: {
  city: WeatherInfoApi | undefined;
  unit: string;
}) {
  if (!city) {
    return <div>Aucune ville trouvée</div>;
  }

  if (!city.location) {
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
