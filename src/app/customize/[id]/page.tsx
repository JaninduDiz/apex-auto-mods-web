"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { CarPreview } from "@/components/customization/CarPreview";
import { CustomizationPanel } from "@/components/customization/CustomizationPanel";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useDataStore } from "@/store/data-store";

export interface CustomizationState {
  color: string;
  selectedParts: string[];
}

function CustomizationWorkspace() {
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const buildId = params.id as string;

  const { getBuildById, saveBuild, isLoadingBuilds, fetchBuilds } =
    useDataStore();

  const [customization, setCustomization] = useState<CustomizationState>({
    color: "#3F51B5",
    selectedParts: [],
  });

  const [carModel, setCarModel] = useState("Default Model");
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    fetchBuilds();
  }, [fetchBuilds]);

  useEffect(() => {
    if (buildId === "new") {
      const modelFromQuery = searchParams.get("carModel");
      if (modelFromQuery) {
        setCarModel(decodeURIComponent(modelFromQuery));
      } else {
        toast({
          variant: "destructive",
          title: "No Vehicle Selected",
          description: "Redirecting to the build selection page.",
        });
        router.push("/customize");
      }
    }
  }, [buildId, searchParams, router, toast]);

  useEffect(() => {
    if (buildId && buildId !== "new" && !isLoadingBuilds) {
      const build = getBuildById(buildId);
      if (build) {
        setCustomization({
          color: build.color,
          selectedParts: build.selectedParts || [],
        });
        setCarModel(build.carModel);
      } else {
        toast({
          variant: "destructive",
          title: "Build not found",
          description: "Redirecting to create a new build.",
        });
        router.push("/customize");
      }
    }
    if (!isLoadingBuilds) {
      setIsPageLoading(false);
    }
  }, [buildId, router, toast, getBuildById, isLoadingBuilds]);

  const [isSavingBuild, setIsSavingBuild] = useState(false);

  const handleSaveBuild = async () => {
    setIsSavingBuild(true);
    try {
      await saveBuild(
        {
          carModel,
          ...customization,
        },
        buildId
      );

      toast({
        title: "Build Saved!",
        description: "Your custom configuration has been saved.",
      });

      router.push("/customize");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description:
          error.response?.data?.message || "Could not save your build.",
      });
    } finally {
      setIsSavingBuild(false);
    }
  };

  if (isPageLoading || isLoadingBuilds) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link
          href="/customize"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
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

export default function CustomizationWorkspacePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <CustomizationWorkspace />
    </Suspense>
  );
}
