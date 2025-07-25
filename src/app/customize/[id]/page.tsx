
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { CarPreview } from "@/components/customization/CarPreview";
import { CustomizationPanel } from "@/components/customization/CustomizationPanel";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useDataStore } from "@/store/data-store";

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
  
  const { getBuildById, saveBuild, isLoading: isStoreLoading } = useDataStore();

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
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    // If it's not a new build, try to load it.
    if (buildId && buildId !== 'new') {
        const build = getBuildById(buildId as string);
        if (build) {
            setCustomization({
                color: build.color,
                parts: build.parts,
            });
            setCarModel(build.carModel);
        } else if (!isStoreLoading) {
            // Handle case where build is not found and the store has finished loading
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
    if(!isStoreLoading) {
      setIsPageLoading(false);
    }
  }, [buildId, router, toast, getBuildById, isStoreLoading]);

  const [isSavingBuild, setIsSavingBuild] = useState(false);

  const handleSaveBuild = async () => {
    setIsSavingBuild(true);
    try {
      await saveBuild({
        _id: buildId === 'new' ? `build-${Date.now()}` : buildId as string,
        carModel,
        ...customization,
        createdAt: new Date().toISOString()
      });

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
  
  if (isPageLoading) {
    return (
        <div className="flex items-center justify-center h-screen">
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
