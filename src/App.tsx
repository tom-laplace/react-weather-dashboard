import { useState } from "react";
import "./App.css";
import WeatherCard from "./components/weather-card";
import { WeatherInfo, weatherMock } from "./data/weather.mock";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./components/ui/button";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  const [city, setCity] = useState<WeatherInfo>(weatherMock[0]);
  const [unit, setUnit] = useState<string>("°C");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const returnCityInfoFromName = (value: string) => {
    for (const city of weatherMock) {
      if (city.city === value) {
        setCity(city);
      }
    }
  };

  const citiesList = weatherMock.map((city) => (
    <SelectItem value={city.city} key={city.city}>
      {city.city}
    </SelectItem>
  ));

  return (
    <>
      <div className="flex-row">
        <div className="flex justify-center mx-auto mb-4">
          <div className="m-2">
            <Select
              defaultValue={city.city}
              onValueChange={returnCityInfoFromName}
            >
              <SelectTrigger>
                <SelectValue placeholder="Ville" />
              </SelectTrigger>
              <SelectContent>{citiesList}</SelectContent>
            </Select>
          </div>
          <div className="m-2">
            <Select defaultValue={unit} onValueChange={setUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Unité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="°C">°C</SelectItem>
                <SelectItem value="°F">°F</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="m-2 hover:cursor-pointer"
            onClick={() => setIsLoading(true)}
          >
            Recharger
          </Button>
          <div className="m-2">
            <ModeToggle></ModeToggle>
          </div>
        </div>
        <div>
          <WeatherCard
            cityWeatherInfo={city}
            unit={unit}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          ></WeatherCard>
        </div>
      </div>
    </>
  );
}

export default App;
