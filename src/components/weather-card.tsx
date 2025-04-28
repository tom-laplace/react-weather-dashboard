import { useEffect, useState } from "react";
import { WeatherInfo } from "../data/weather.mock";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

export default function WeatherCard({
  cityWeatherInfo,
  unit,
  isLoading,
  setIsLoading,
}: {
  cityWeatherInfo: WeatherInfo;
  unit: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [temperature, setTemperature] = useState(0);
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    if (unit === "°F") {
      let tempF = cityWeatherInfo.temperature * (9 / 5) + 32;
      setTemperature(Math.round(tempF));
    } else {
      setTemperature(cityWeatherInfo.temperature);
    }

    if (isLoading) {
      setProgress(13);
      const timer = setTimeout(() => setProgress(100), 250);
      setIsLoading(false);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setProgress(100), 250);
    setIsLoading(false);
    return () => clearTimeout(timer);
  }, [unit, isLoading]);

  if (progress !== 100) {
    return <Progress value={progress} />;
  } else {
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>Meteo du jour</CardTitle>
            <CardDescription>
              Actuellement dans la ville de {cityWeatherInfo.city} :
            </CardDescription>
          </CardHeader>
          <CardContent>
            Température de <span className="font-bold">{temperature}</span>{" "}
            degrès {unit}
          </CardContent>
        </Card>
      </>
    );
  }
}
