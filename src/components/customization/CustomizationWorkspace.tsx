"use client";

import { useState } from "react";
import { CarPreview } from "@/components/customization/CarPreview";
import { CustomizationPanel } from "@/components/customization/CustomizationPanel";
import { type ModificationSuggestionsOutput } from "@/ai/flows/modification-suggestions";
import { getModificationSuggestions } from "@/ai/flows/modification-suggestions";
import { useToast } from "@/hooks/use-toast";

export type Part = "wheels" | "spoiler" | "bodykit" | "exhaust";

export interface CustomizationState {
  color: string;
  parts: Record<Part, boolean>;
}

export function CustomizationWorkspace() {
  const { toast } = useToast();
  const [customization, setCustomization] = useState<CustomizationState>({
    color: "#3F51B5",
    parts: {
      wheels: false,
      spoiler: false,
      bodykit: false,
      exhaust: false,
    },
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const handleSuggestionFetch = async () => {
    setIsLoadingSuggestions(true);
    const selectedParts = Object.entries(customization.parts)
      .filter(([, value]) => value)
      .map(([key]) => key);
    
    try {
      const result: ModificationSuggestionsOutput = await getModificationSuggestions({
        carModel: 'Toyota Supra GR',
        selectedParts,
      });
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error("Failed to get suggestions:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch AI suggestions. Please try again later.",
      })
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <CarPreview customization={customization} />
        </div>
        <div>
          <CustomizationPanel
            customization={customization}
            setCustomization={setCustomization}
            onGetSuggestions={handleSuggestionFetch}
            suggestions={suggestions}
            isLoadingSuggestions={isLoadingSuggestions}
          />
        </div>
      </div>
    </div>
  );
}
