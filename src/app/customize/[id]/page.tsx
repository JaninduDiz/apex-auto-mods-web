
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { CarPreview } from "@/components/customization/CarPreview";
import { CustomizationPanel } from "@/components/customization/CustomizationPanel";
import { useToast } from "@/hooks/use-toast";
import { mockBuilds } from "@/lib/constants";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export type Part = "wheels" | "spoiler" | "bodykit" | "exhaust";

export interface CustomizationState {
  color: string;
  parts: Record<Part, boolean>;
}

export default function CustomizationWorkspacePage() {
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  const buildId = params.id;

  const [customization, setCustomization] = useState<CustomizationState>({
    color: "#3F51B5",
    parts: {
      wheels: false,
      spoiler: false,
      bodykit: false,
      exhaust: false,
    },
  });
  
  const [carModel, setCarModel] = useState("Toyota Supra GR"); // Default model
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If it's not a new build, try to load it.
    if (buildId && buildId !== 'new') {
        // TODO: In a real app, you would fetch this build from your API
        const build = mockBuilds.find(b => b._id === buildId);
        if (build) {
            setCustomization({
                color: build.color,
                parts: build.parts,
            });
            setCarModel(build.carModel);
        } else {
            // Handle case where build is not found
            toast({
                variant: "destructive",
                title: "Build not found",
                description: "Redirecting to create a new build.",
            });
            router.push('/customize/new');
        }
    }
    // For 'new' builds, we just use the default state.
    // In a real app, you might let the user select a car first.
    setIsLoading(false);
  }, [buildId, router, toast]);

  const [isSavingBuild, setIsSavingBuild] = useState(false);

  const handleSaveBuild = async () => {
    setIsSavingBuild(true);
    try {
      // TODO: Replace this with your actual API call.
      // This would be a POST to create a new build or a PUT to update an existing one.
      // const token = localStorage.getItem('token'); 
      // const url = buildId === 'new' ? '/builds' : `/builds/${buildId}`;
      // const method = buildId === 'new' ? 'POST' : 'PUT';
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
      //   method,
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}` 
      //   },
      //   body: JSON.stringify({
      //     carModel,
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
      
      // After saving, redirect back to the customization gallery
      router.push('/customize');

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
  
  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href="/customize" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Builds
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <CarPreview customization={customization} />
        </div>
        <div>
          <CustomizationPanel
            customization={customization}
            setCustomization={setCustomization}
            carModel={carModel}
            onSaveBuild={handleSaveBuild}
            isSavingBuild={isSavingBuild}
          />
        </div>
      </div>
    </div>
  );
}
