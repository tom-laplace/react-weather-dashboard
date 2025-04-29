import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FeelslikeWidget({
  feelslike_c,
  feelslike_f,
  unit,
}: {
  feelslike_c: number;
  feelslike_f: number;
  unit: string;
}) {
  return (
    <>
      <Card className="w-full">
        <CardHeader className=" text-left">
          <CardTitle>Feelslike</CardTitle>
          <CardDescription>
            <div>
              <span className="font-bold text-4xl">
                {unit === "°C" ? feelslike_c : feelslike_f}
              </span>
              {unit}
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
