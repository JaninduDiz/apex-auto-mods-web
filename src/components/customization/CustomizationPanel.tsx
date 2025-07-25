import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2, Save } from "lucide-react";
import { type CustomizationState, type Part } from "./CustomizationWorkspace";
import React from "react";
import { Separator } from "@/components/ui/separator";

interface CustomizationPanelProps {
  customization: CustomizationState;
  setCustomization: React.Dispatch<React.SetStateAction<CustomizationState>>;
  onGetSuggestions: () => Promise<void>;
  suggestions: string[];
  isLoadingSuggestions: boolean;
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
  onGetSuggestions,
  suggestions,
  isLoadingSuggestions,
  onSaveBuild,
  isSavingBuild,
}: CustomizationPanelProps) {
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomization(prev => ({ ...prev, color: e.target.value }));
  };

  const handlePartToggle = (part: Part) => {
    setCustomization(prev => ({
      ...prev,
      parts: { ...prev.parts, [part]: !prev.parts[part] },
    }));
  };

  return (
    <Card className="h-full shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Customize Your Ride</CardTitle>
            <CardDescription>Toyota Supra GR</CardDescription>
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
          <Label htmlFor="color-picker" className="mb-2 block font-medium">Body Color</Label>
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
                  checked={customization.parts[part.id]}
                  onCheckedChange={() => handlePartToggle(part.id)}
                />
                <Label htmlFor={part.id} className="cursor-pointer">{part.label}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
            <h3 className="mb-2 font-medium">AI Suggestions</h3>
            <Button onClick={onGetSuggestions} disabled={isLoadingSuggestions} className="w-full bg-accent hover:bg-accent/90">
                {isLoadingSuggestions ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                )}
                Get Modification Ideas
            </Button>
            {suggestions.length > 0 && (
                <div className="mt-4 space-y-2">
                    <p className="text-sm text-muted-foreground">Popular additions with your selection:</p>
                    <ul className="list-disc list-inside bg-secondary p-3 rounded-md text-sm space-y-1">
                        {suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
