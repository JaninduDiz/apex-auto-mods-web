"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Loader2,
  LogOut,
  PlusCircle,
  Paintbrush,
  Car,
  Wrench,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import { useDataStore } from "@/store/data-store";
import { AddVehicleForm } from "@/components/profile/AddVehicleForm";
import { VehicleList } from "@/components/profile/VehicleList";

export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();

  const { user, logout, isAuthenticated, checkAuth } = useUserStore();
  const {
    builds,
    isLoadingBuilds,
    fetchBuilds,
    userVehicles,
    fetchUserVehicles,
    isLoadingVehicles,
  } = useDataStore();

  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBuilds();
      fetchUserVehicles();
    }
  }, [fetchBuilds, fetchUserVehicles, isAuthenticated]);

  const handleLogout = () => {
    logout();
    router.push("/login");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      await checkAuth();
      setIsCheckingAuth(false);
    };
    checkUser();
  }, [checkAuth]);

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      router.push("/login");
    }
  }, [isCheckingAuth, isAuthenticated, router]);

  if (isCheckingAuth || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="ml-4">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 pb-20 md:pb-12">
      <AddVehicleForm
        isOpen={isAddVehicleOpen}
        setIsOpen={setIsAddVehicleOpen}
      />
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="relative h-36 md:h-48 bg-gray-200 rounded-t-lg">
          <div className="absolute bottom-0 left-4 md:left-6 translate-y-1/2">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="pt-16 md:pt-20">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <CardTitle className="text-2xl md:text-3xl">
                {user.name}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {user.email}
              </CardDescription>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" className="flex-1 md:flex-none">
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="flex-1 md:flex-none"
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </div>

          <p className="mt-4 text-foreground/90">{user.bio}</p>

          <div className="mt-6 flex gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold">{builds.length}</p>
              <p className="text-sm text-muted-foreground">Builds</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{userVehicles.length}</p>
              <p className="text-sm text-muted-foreground">Vehicles</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {user.followers?.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{user.following}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">My Vehicles</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddVehicleOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Vehicle
              </Button>
            </div>
            {isLoadingVehicles ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : userVehicles.length > 0 ? (
              <VehicleList
                vehicles={userVehicles}
                isLoading={isLoadingVehicles}
              />
            ) : (
              <div className="text-center border-dashed border-2 border-muted-foreground/30 p-8 rounded-xl bg-muted/10 shadow-sm">
                <Car className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">
                  No vehicles added yet
                </h4>
                <p className="text-muted-foreground mb-4">
                  Start by adding your first vehicle to track modifications and
                  builds.
                </p>
                <Button onClick={() => setIsAddVehicleOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Your First Vehicle
                </Button>
              </div>
            )}
          </div>

          <Separator className="my-8" />

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">My Builds</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/customize")}
              >
                <Wrench className="mr-2 h-4 w-4" />
                Create Build
              </Button>
            </div>
            {isLoadingBuilds ? (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : builds.length > 0 ? (
              <div className="space-y-4">
                {builds.map((build) => (
                  <Card
                    key={build._id}
                    className="p-4 flex items-center gap-4 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div
                      style={{ backgroundColor: build.color }}
                      className="w-16 h-16 rounded-lg flex items-center justify-center shadow-md"
                    >
                      <Paintbrush className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold">{build.carModel}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {build.selectedParts?.join(", ") || "No extra parts"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Saved on{" "}
                        {new Date(build.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/customize/${build._id}`)}
                    >
                      View
                    </Button>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center border-dashed border-2 border-muted-foreground/30 p-8 rounded-xl bg-muted/10 shadow-sm">
                <Wrench className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">
                  No builds created yet
                </h4>
                <p className="text-muted-foreground mb-4">
                  Create your first custom build to showcase your modifications
                  and designs.
                </p>
                <Button onClick={() => router.push("/customize")}>
                  <Wrench className="mr-2 h-4 w-4" />
                  Start Your First Build
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
