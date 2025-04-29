import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCcw } from "lucide-react";

export default function WeatherForm({
  inputCity,
  setInputCity,
  handleSearch,
  unit,
  setUnit,
}: {
  inputCity: string;
  setInputCity: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
  unit: string;
  setUnit: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleInputChange = (e: any) => {
    setInputCity(e.target.value);
  };

  return (
    <div className="flex justify-center mx-auto mb-4">
      <div className="m-2 flex">
        <Input
          type="text"
          placeholder="Ville"
          value={inputCity}
          onChange={handleInputChange}
        />
        <Button
          onClick={handleSearch}
          type="submit"
          className="hover:cursor-pointer"
        >
          Chercher
        </Button>
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
    </div>
  );
}
