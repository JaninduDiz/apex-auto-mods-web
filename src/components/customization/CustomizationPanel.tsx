import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Save, Check } from "lucide-react";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { type CustomizationState } from "@/app/customize/[id]/page";
import { cn } from "@/lib/utils";

type Part = "wheels" | "spoiler" | "bodykit";

interface CustomizationPanelProps {
  customization: CustomizationState;
  setCustomization: React.Dispatch<React.SetStateAction<CustomizationState>>;
  carModel: string;
  onSaveBuild: () => Promise<void>;
  isSavingBuild: boolean;
}

const parts: { id: Part; label: string; description: string }[] = [
  {
    id: "wheels",
    label: "Performance Wheels",
    description: "Lightweight alloy wheels",
  },
  {
    id: "spoiler",
    label: "Carbon Fiber Spoiler",
    description: "Aerodynamic rear wing",
  },
  {
    id: "bodykit",
    label: "Aero Body Kit",
    description: "Side skirts & front splitter",
  },
];

// Preset color palettes
const bodyColors = [
  "#FF0000",
  "#FF4500",
  "#FFD700",
  "#32CD32",
  "#00CED1",
  "#0000FF",
  "#8A2BE2",
  "#FF1493",
  "#000000",
  "#696969",
  "#C0C0C0",
  "#FFFFFF",
];

const wheelColors = [
  "#000000",
  "#C0C0C0",
  "#FFD700",
  "#FF0000",
  "#0000FF",
  "#FFFFFF",
  "#8B4513",
  "#FF4500",
  "#32CD32",
  "#800080",
  "#FFA500",
  "#FF1493",
];

export function CustomizationPanel({
  customization,
  setCustomization,
  carModel,
  onSaveBuild,
  isSavingBuild,
}: CustomizationPanelProps) {
  const handleColorChange = (
    colorType: "color" | "wheelColor",
    value: string
  ) => {
    setCustomization((prev) => ({
      ...prev,
      [colorType]: value,
    }));
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
        {/* Body Color Section */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Body Color</Label>

          {/* Color Palette */}
          <div className="grid grid-cols-6 gap-2">
            {bodyColors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange("color", color)}
                className={cn(
                  "w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 hover:shadow-md",
                  customization.color === color
                    ? "border-primary ring-2 ring-primary/20 scale-110"
                    : "border-gray-300 hover:border-gray-400"
                )}
                style={{ backgroundColor: color }}
                title={color}
              >
                {customization.color === color && (
                  <Check
                    className={cn(
                      "w-4 h-4 mx-auto",
                      color === "#000000" || color === "#696969"
                        ? "text-white"
                        : "text-black"
                    )}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Custom Color Input */}
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={customization.color}
              onChange={(e) => handleColorChange("color", e.target.value)}
              className="p-1 h-10 w-14 cursor-pointer"
            />
            <Input
              type="text"
              value={customization.color}
              onChange={(e) => handleColorChange("color", e.target.value)}
              className="font-mono text-sm"
              placeholder="#FF0000"
            />
          </div>
        </div>

        <Separator />

        {/* Wheel Color Section */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Wheel Color</Label>

          {/* Color Palette */}
          <div className="grid grid-cols-6 gap-2">
            {wheelColors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange("wheelColor", color)}
                className={cn(
                  "w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 hover:shadow-md",
                  customization.wheelColor === color
                    ? "border-primary ring-2 ring-primary/20 scale-110"
                    : "border-gray-300 hover:border-gray-400"
                )}
                style={{ backgroundColor: color }}
                title={color}
              >
                {customization.wheelColor === color && (
                  <Check
                    className={cn(
                      "w-4 h-4 mx-auto",
                      color === "#000000" ||
                        color === "#696969" ||
                        color === "#800080"
                        ? "text-white"
                        : "text-black"
                    )}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Custom Color Input */}
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={customization.wheelColor}
              onChange={(e) => handleColorChange("wheelColor", e.target.value)}
              className="p-1 h-10 w-14 cursor-pointer"
            />
            <Input
              type="text"
              value={customization.wheelColor}
              onChange={(e) => handleColorChange("wheelColor", e.target.value)}
              className="font-mono text-sm"
              placeholder="#000000"
            />
          </div>
        </div>

        <Separator />

        {/* Modifications Section */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Modifications</Label>
          <div className="grid grid-cols-1 gap-3">
            {parts.map((part) => {
              const isSelected = customization.selectedParts.includes(part.id);
              return (
                <button
                  key={part.id}
                  onClick={() => handlePartToggle(part.id)}
                  className={cn(
                    "p-4 rounded-lg border-2 text-left transition-all hover:shadow-md",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 bg-background"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{part.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {part.description}
                      </div>
                    </div>
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-gray-300"
                      )}
                    >
                      {isSelected && (
                        <Check className="w-3 h-3 text-primary-foreground" />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selection Summary */}
        <div className="pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">
              {customization.selectedParts.length}
            </span>{" "}
            modifications selected
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
