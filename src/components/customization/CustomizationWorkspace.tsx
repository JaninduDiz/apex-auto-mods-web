
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
  const [isSavingBuild, setIsSavingBuild] = useState(false);

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

  const handleSaveBuild = async () => {
    setIsSavingBuild(true);
    try {
      // TODO: Replace this with your actual API call.
      // In a real app, you'd get the token from your auth context.
      // const token = localStorage.getItem('token'); 
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/builds`, {
      //   method: 'POST',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}` 
      //   },
      //   body: JSON.stringify({
      //     carModel: 'Toyota Supra GR',
      //     ...customization
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to save build.");
      // }
      
      // Simulating a successful API call for now.
      console.log("Dummy save successful", { customization });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

      toast({
        title: "Build Saved!",
        description: "Your custom configuration has been saved to your profile.",
      });

    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Save Failed",
        description: error.message || "Could not save your build.",
      })
    } finally {
      setIsSavingBuild(false);
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
            onSaveBuild={handleSaveBuild}
            isSavingBuild={isSavingBuild}
          />
        </div>
      </div>
    </div>
  );
}
