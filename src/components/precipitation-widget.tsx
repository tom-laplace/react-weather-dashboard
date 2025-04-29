import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  export default function PrecipitationWidget({ precip_mm }: { precip_mm: number }) {
    return (
      <>
        <Card className="w-full">
          <CardHeader className=" text-left">
            <CardTitle>Precipitations</CardTitle>
            <CardDescription>
              <div>
                <span className="font-bold text-4xl">{precip_mm}mm</span>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      </>
    );
  }
  