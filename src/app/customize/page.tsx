"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Paintbrush, PlusCircle, Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDataStore } from "@/store/data-store";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/user-store";
import { SelectVehicleDialog } from "@/components/customize/SelectVehicleDialog";
import { LoginPromptDialog } from "@/components/layout/LoginPromptDialog";

export default function CustomizePage() {
  const router = useRouter();
  const {
    builds,
    isLoading,
    fetchBuilds,
    deleteBuild,
    userVehicles,
    fetchUserVehicles,
    isLoadingVehicles,
  } = useDataStore();
  const { isAuthenticated, checkAuth } = useUserStore();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isSelectVehicleOpen, setIsSelectVehicleOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setIsCheckingAuth(false);
    };
    verifyAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isCheckingAuth) {
      if (isAuthenticated) {
        fetchBuilds();
        fetchUserVehicles();
      } else {
        setShowLoginPrompt(true);
      }
    }
  }, [fetchBuilds, fetchUserVehicles, isAuthenticated, isCheckingAuth]);

  const handleCreateNew = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    setIsSelectVehicleOpen(true);
  };

  const handleDeleteBuild = async (buildId: string) => {
    setIsDeleting(buildId);
    try {
      await deleteBuild(buildId);
      toast({
        title: "Build Deleted",
        description: "The build has been successfully removed.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Deletion Failed",
        description:
          error.response?.data?.message || "Could not delete the build.",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const isPageLoading = isLoading || isCheckingAuth;

  return (
    <>
      <LoginPromptDialog
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
      />
      <SelectVehicleDialog
        isOpen={isSelectVehicleOpen}
        setIsOpen={setIsSelectVehicleOpen}
        vehicles={userVehicles}
        isLoading={isLoadingVehicles}
      />
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Builds</h1>
            <p className="text-muted-foreground">
              Manage your saved customizations or start a new project.
            </p>
          </div>
          <Button onClick={handleCreateNew}>
            <PlusCircle className="mr-2" />
            Create New Build
          </Button>
        </div>

        {isPageLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        ) : isAuthenticated && builds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {builds.map((build) => (
              <Card key={build._id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        style={{ backgroundColor: build.color }}
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                      >
                        <Paintbrush className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle>{build.carModel}</CardTitle>
                        <CardDescription>
                          Saved on{" "}
                          {new Date(build.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground font-medium">
                    MODIFICATIONS
                  </p>
                  <p className="text-sm capitalize">
                    {build.selectedParts?.join(", ") || "Stock"}
                  </p>
                </CardContent>
                <div className="p-6 pt-0 flex gap-2">
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/customize/${build._id}`}>Edit Build</Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="w-1/3"
                        disabled={isDeleting === build._id}
                      >
                        {isDeleting === build._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your build for the {build.carModel}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteBuild(build._id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-dashed border-2 border-muted-foreground/30 rounded-xl bg-muted/10 shadow-sm">
            <h2 className="text-xl font-semibold">
              {isAuthenticated ? "No Builds Yet" : "Please Log In"}
            </h2>
            <p className="text-muted-foreground mt-2">
              {isAuthenticated
                ? "Start by creating a new build."
                : "Log in to see your saved builds and create new ones."}
            </p>
            <Button className="mt-4" onClick={handleCreateNew}>
              <PlusCircle className="mr-2" />
              {isAuthenticated ? "Create New Build" : "Go to Login"}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
