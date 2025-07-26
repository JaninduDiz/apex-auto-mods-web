import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { type CustomizationState } from "@/app/customize/[id]/page";
import React from "react";
import { Separator } from "@/components/ui/separator";

type Part = "wheels" | "spoiler" | "bodykit" | "exhaust";

interface CustomizationPanelProps {
  customization: CustomizationState;
  setCustomization: React.Dispatch<React.SetStateAction<CustomizationState>>;
  carModel: string;
  onSaveBuild: () => Promise<void>;
  isSavingBuild: boolean;
}

const parts: { id: Part; label: string }[] = [
  { id: "wheels", label: "Performance Wheels" },
  { id: "spoiler", label: "Carbon Fiber Spoiler" },
  { id: "bodykit", label: "Aero Body Kit" },
  { id: "exhaust", label: "Titanium Sport Exhaust" },
];

export function CustomizationPanel({
  customization,
  setCustomization,
  carModel,
  onSaveBuild,
  isSavingBuild,
}: CustomizationPanelProps) {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomization((prev) => ({ ...prev, color: e.target.value }));
  };

  const handlePartToggle = (part: Part) => {
    setCustomization((prev) => {
      const newParts = prev.selectedParts.includes(part)
        ? prev.selectedParts.filter((p) => p !== part)
        : [...prev.selectedParts, part];
      return { ...prev, selectedParts: newParts };
    });
  };

  return (
    <Card className="h-full shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Customize Your Ride</CardTitle>
            <CardDescription>{carModel}</CardDescription>
          </div>
          <Button onClick={onSaveBuild} disabled={isSavingBuild} size="sm">
            {isSavingBuild ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Build
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="color-picker" className="mb-2 block font-medium">
            Body Color
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="color-picker"
              type="color"
              value={customization.color}
              onChange={handleColorChange}
              className="p-1 h-10 w-14 cursor-pointer"
            />
            <Input
              type="text"
              value={customization.color}
              onChange={handleColorChange}
              className="font-mono"
            />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="mb-4 font-medium">Modifications</h3>
          <div className="space-y-3">
            {parts.map((part) => (
              <div key={part.id} className="flex items-center space-x-2">
                <Checkbox
                  id={part.id}
                  checked={customization.selectedParts.includes(part.id)}
                  onCheckedChange={() => handlePartToggle(part.id)}
                />
                <Label htmlFor={part.id} className="cursor-pointer">
                  {part.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
