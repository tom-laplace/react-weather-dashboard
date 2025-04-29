import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HumidityWidget({ humidity }: { humidity: number }) {
  return (
    <>
      <Card className="w-full">
        <CardHeader className=" text-left">
          <CardTitle>Humidity</CardTitle>
          <CardDescription>
            <div>
              <span className="font-bold text-4xl">{humidity}%</span>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
