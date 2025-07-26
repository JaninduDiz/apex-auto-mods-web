import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { type CustomizationState } from "@/app/customize/[id]/page";

export function CarPreview({
  customization,
}: {
  customization: CustomizationState;
}) {
  return (
    <Card className="overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <div
          className="relative aspect-video w-full transition-colors duration-300"
          style={{ backgroundColor: customization.color }}
        >
          <Image
            src="https://placehold.co/800x450/ffffff/ffffff.png?text=%20"
            alt="Car base"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />

          {customization.selectedParts.includes("wheels") && (
            <>
              <Image
                src="https://placehold.co/120x120/transparent.png"
                alt="Performance Wheels"
                width={120}
                height={120}
                className="absolute bottom-[14%] left-[17%] w-[16%] h-auto animate-in fade-in zoom-in-90 duration-500"
              />
              <Image
                src="https://placehold.co/120x120/transparent.png"
                alt="Performance Wheels"
                width={120}
                height={120}
                className="absolute bottom-[14%] right-[22%] w-[16%] h-auto animate-in fade-in zoom-in-90 duration-500"
              />
            </>
          )}

          {customization.selectedParts.includes("spoiler") && (
            <Image
              src="https://placehold.co/200x80/transparent.png"
              alt="Carbon Fiber Spoiler"
              width={200}
              height={80}
              className="absolute top-[32%] right-[12%] w-[25%] h-auto animate-in fade-in-0 slide-in-from-right-10 duration-500"
            />
          )}

          {customization.selectedParts.includes("bodykit") && (
            <Image
              src="https://placehold.co/600x60/transparent.png"
              alt="Body Kit"
              width={600}
              height={60}
              className="absolute bottom-[13%] left-1/2 -translate-x-1/2 w-[60%] h-auto animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
            />
          )}

          {customization.selectedParts.includes("exhaust") && (
            <Image
              src="https://placehold.co/50x30/transparent.png"
              alt="Sport Exhaust"
              width={50}
              height={30}
              className="absolute bottom-[23%] right-[11%] w-[6%] h-auto animate-in fade-in zoom-in-50 duration-500"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
