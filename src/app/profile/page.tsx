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

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-primary">{builds.length}</p>
              <p className="text-sm text-muted-foreground font-medium">
                Builds
              </p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-primary">
                {userVehicles.length}
              </p>
              <p className="text-sm text-muted-foreground font-medium">
                Vehicles
              </p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-primary">
                {user.followers?.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground font-medium">
                Followers
              </p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-primary">
                {user.following}
              </p>
              <p className="text-sm text-muted-foreground font-medium">
                Following
              </p>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold">My Vehicles</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your vehicle collection
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddVehicleOpen(true)}
                className="w-full sm:w-auto"
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
              <Card className="border-dashed border-2 border-muted-foreground/30 bg-muted/10">
                <CardContent className="text-center p-8">
                  <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2">
                    No vehicles added yet
                  </h4>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Start by adding your first vehicle to track modifications
                    and builds.
                  </p>
                  <Button
                    onClick={() => setIsAddVehicleOpen(true)}
                    className="w-full sm:w-auto"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Your First Vehicle
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <Separator className="my-8" />

          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold">My Builds</h3>
                <p className="text-sm text-muted-foreground">
                  Your custom vehicle builds and modifications
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/customize")}
                className="w-full sm:w-auto"
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
              <div className="grid grid-cols-1 gap-4">
                {builds.map((build) => (
                  <Card
                    key={build._id}
                    className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/20"
                  >
                    <div
                      style={{ backgroundColor: build.color }}
                      className="w-16 h-16 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
                    >
                      <Paintbrush className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-lg mb-1">
                        {build.carModel}
                      </h4>
                      <p className="text-sm text-muted-foreground capitalize mb-2">
                        {build.selectedParts?.length > 0
                          ? `${
                              build.selectedParts.length
                            } modifications: ${build.selectedParts.join(", ")}`
                          : "Base configuration"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Created on{" "}
                        {new Date(build.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/customize/${build._id}`)}
                      className="w-full sm:w-auto flex-shrink-0"
                    >
                      Edit Build
                    </Button>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed border-2 border-muted-foreground/30 bg-muted/10">
                <CardContent className="text-center p-8">
                  <Wrench className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2">
                    No builds created yet
                  </h4>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Create your first custom build to showcase your
                    modifications and designs.
                  </p>
                  <Button
                    onClick={() => router.push("/customize")}
                    className="w-full sm:w-auto"
                  >
                    <Wrench className="mr-2 h-4 w-4" />
                    Start Your First Build
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
