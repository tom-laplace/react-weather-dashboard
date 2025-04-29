import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UvWidget({ uv }: { uv: number }) {
  return (
    <>
      <Card className="w-1/4">
        <CardHeader className=" text-left">
          <CardTitle>UV Index</CardTitle>
          <CardDescription>
            <div>
              <span className="font-bold text-4xl">{uv}</span>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
