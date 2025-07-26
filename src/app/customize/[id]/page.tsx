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
  parts: Part[];
}

export default function CustomizationWorkspacePage() {
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  const buildId = params.id as string;
  
  const { getBuildById, saveBuild, isLoadingBuilds, fetchBuilds } = useDataStore();

  const [customization, setCustomization] = useState<CustomizationState>({
    color: "#3F51B5",
    parts: [],
  });
  
  const [carModel, setCarModel] = useState("Toyota Supra GR"); // Default model
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    fetchBuilds();
  }, [fetchBuilds]);

  useEffect(() => {
    if (buildId && buildId !== 'new' && !isLoadingBuilds) {
        const build = getBuildById(buildId);
        if (build) {
            setCustomization({
                color: build.color,
                parts: build.parts,
            });
            setCarModel(build.carModel);
        } else {
            toast({
                variant: "destructive",
                title: "Build not found",
                description: "Redirecting to create a new build.",
            });
            router.push('/customize/new');
        }
    }
    if(!isLoadingBuilds) {
      setIsPageLoading(false);
    }
  }, [buildId, router, toast, getBuildById, isLoadingBuilds]);

  const [isSavingBuild, setIsSavingBuild] = useState(false);

  const handleSaveBuild = async () => {
    setIsSavingBuild(true);
    try {
      await saveBuild({
        carModel,
        ...customization,
      }, buildId);

      toast({
        title: "Build Saved!",
        description: "Your custom configuration has been saved.",
      });
      
      router.push('/customize');

    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Save Failed",
        description: error.response?.data?.message || "Could not save your build.",
      })
    } finally {
      setIsSavingBuild(false);
    }
  };
  
  if (isPageLoading || isLoadingBuilds) {
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
