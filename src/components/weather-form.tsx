import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function WeatherForm({
  inputCity,
  unit,
  setInputCity,
  setQuery,
  setUnit,
}: {
  inputCity: string;
  unit: string;
  setInputCity: React.Dispatch<React.SetStateAction<string>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setUnit: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleInputChange = (e: any) => {
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    if (inputCity.trim()) {
      setQuery(inputCity);
    }
  };

  return (
    <div className="flex justify-center mx-auto mb-4">
      <div className="m-2 flex">
        <Input
          type="text"
          placeholder="City"
          value={inputCity}
          onChange={handleInputChange}
        />
        <Button
          onClick={handleSearch}
          type="submit"
          className="hover:cursor-pointer"
        >
          Search
        </Button>
      </div>
      <div className="m-2">
        <Select defaultValue={unit} onValueChange={setUnit}>
          <SelectTrigger>
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="°C">°C</SelectItem>
            <SelectItem value="°F">°F</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
