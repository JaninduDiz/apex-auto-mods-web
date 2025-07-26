"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wrench,
  Car,
  Clock,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Info,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useDataStore } from "@/store/data-store";
import { useUserStore } from "@/store/user-store";
import { type Service, type ActiveService } from "@/lib/constants";
import { LoginPromptDialog } from "@/components/layout/LoginPromptDialog";
import Image from "next/image";
import Link from "next/link";

function ServicesComponent() {
  const searchParams = useSearchParams();
  const {
    services,
    activeServices,
    ongoingService,
    isLoading,
    fetchServices,
    getActiveServiceById,
    userVehicles,
    fetchUserVehicles,
    isLoadingVehicles,
    addServiceBooking,
  } = useDataStore();
  const { isAuthenticated, checkAuth } = useUserStore();

  const [isBooking, setIsBooking] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedActiveService, setSelectedActiveService] =
    useState<ActiveService | null>(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("available");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("");
  const [serviceNotes, setServiceNotes] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserVehicles();
    }
  }, [isAuthenticated, fetchUserVehicles]);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setIsCheckingAuth(false);
    };
    verifyAuth();
  }, [checkAuth]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    const serviceId = searchParams.get("serviceId");

    if (tab === "active") {
      if (!isCheckingAuth) {
        if (isAuthenticated) {
          setActiveTab("active");
        } else {
          setShowLoginPrompt(true);
          setActiveTab("available");
        }
      }
    }

    if (serviceId && !isLoading && isAuthenticated) {
      const serviceToView = getActiveServiceById(serviceId);
      if (serviceToView) {
        setSelectedActiveService(serviceToView);
        setIsViewingDetails(true);
      }
    }
  }, [
    searchParams,
    isLoading,
    getActiveServiceById,
    isAuthenticated,
    isCheckingAuth,
  ]);

  const handleBookClick = (service: Service) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    setSelectedService(service);
    setSelectedVehicleId("");
    setServiceNotes("");
    setIsBooking(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedVehicleId) {
      toast({
        title: "Vehicle Required",
        description: "Please select a vehicle for this service.",
        variant: "destructive",
      });
      return;
    }

    const selectedVehicle = userVehicles.find(
      (v) => v.id === selectedVehicleId
    );

    // Create booking object
    const booking = {
      id: `booking_${Date.now()}`,
      serviceId: selectedService?.id,
      serviceName: selectedService?.name,
      vehicleId: selectedVehicleId,
      vehicleInfo: `${selectedVehicle?.year} ${selectedVehicle?.make} ${selectedVehicle?.carModel}`,
      notes: serviceNotes,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    // Store booking using data store (includes localStorage backup)
    addServiceBooking(booking);

    // TODO: When backend is ready, replace above with:
    // await api.post('/bookings', booking);

    setIsBooking(false);
    toast({
      title: "Booking Confirmed!",
      description: `Your appointment for ${selectedService?.name} has been scheduled for your ${selectedVehicle?.year} ${selectedVehicle?.make} ${selectedVehicle?.carModel}.`,
    });
  };

  const handleViewDetailsClick = (service: ActiveService) => {
    setSelectedActiveService(service);
    setIsViewingDetails(true);
  };

  const handleTabChange = (value: string) => {
    if (value === "active") {
      if (!isAuthenticated) {
        setShowLoginPrompt(true);
        return;
      }
    }
    setActiveTab(value);
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 pb-20 md:pb-12">
      <LoginPromptDialog
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Our Services</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          World-class modifications for your performance vehicle.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="available">Available Services</TabsTrigger>
          <TabsTrigger value="active">Your Active Services</TabsTrigger>
        </TabsList>
        <TabsContent value="available" className="mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-start gap-4 pb-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-10 w-1/2 ml-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="flex flex-col">
                  <CardHeader className="flex flex-row items-start gap-4 pb-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{service.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {service.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-end">
                    <div className="flex justify-between items-center mt-4">
                      <p className="font-semibold text-primary">
                        {service.price}
                      </p>
                      <Button onClick={() => handleBookClick(service)}>
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="active" className="mt-8">
          {isCheckingAuth || isLoading ? (
            <div className="space-y-6 max-w-4xl mx-auto">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : !isAuthenticated ? (
            <div className="text-center py-16 border-dashed border-2 border-muted-foreground/30 rounded-xl bg-muted/10 shadow-sm max-w-md mx-auto">
              <ShieldCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Please Log In</h2>
              <p className="text-muted-foreground mb-4">
                Log in to view your active services and track service progress.
              </p>
              <Button onClick={() => setShowLoginPrompt(true)}>
                Log In to Continue
              </Button>
            </div>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              {ongoingService.isSerivceInProgress && (
                <Card className="rounded-3xl shadow-lg bg-blue-50 border-blue-200">
                  <CardContent className="p-4 md:p-6 flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                    <Image
                      src={ongoingService.image}
                      width={150}
                      height={100}
                      alt={ongoingService.carModel}
                      className="rounded-2xl object-cover w-full sm:w-[120px] md:w-[150px]"
                    />
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                        <h3 className="font-bold text-lg mb-1 sm:mb-0">
                          {ongoingService.carModel}
                        </h3>
                        <span className="text-sm text-muted-foreground font-medium">
                          {ongoingService.service}
                        </span>
                      </div>
                      <Progress
                        value={ongoingService.progress}
                        className="h-2"
                      />
                      <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                        <span>In Progress...</span>
                        <span>{ongoingService.progress}% Complete</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="rounded-full w-full sm:w-auto sm:self-start mt-4 sm:mt-0"
                      onClick={() =>
                        handleViewDetailsClick(
                          getActiveServiceById(ongoingService.id)!
                        )
                      }
                    >
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              )}
              {activeServices
                .sort((a, b) => {
                  // Sort by status: "In Progress" first, then "Completed"
                  if (a.status === "In Progress" && b.status === "Completed")
                    return -1;
                  if (a.status === "Completed" && b.status === "In Progress")
                    return 1;
                  return 0;
                })
                .map((service) => (
                  <Card
                    key={service.id}
                    className="p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleViewDetailsClick(service)}
                  >
                    <div className="bg-secondary p-4 rounded-full self-center sm:self-auto">
                      {service.status === "Completed" ? (
                        <ShieldCheck className="w-8 h-8 text-green-500" />
                      ) : (
                        <Clock className="w-8 h-8 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <p className="font-bold text-lg text-center sm:text-left">
                          {service.carModel}
                        </p>
                        <span
                          className={`px-3 py-1 text-sm rounded-full font-medium self-center sm:self-auto ${
                            service.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {service.status}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{service.name}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="hidden md:flex"
                    >
                      <Info className="h-5 w-5" />
                    </Button>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isBooking} onOpenChange={setIsBooking}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book: {selectedService?.name}</DialogTitle>
            <DialogDescription>
              Select your vehicle and provide any additional details for your
              service.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBookingSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vehicle-select" className="text-right">
                  Vehicle
                </Label>
                <div className="col-span-3">
                  {isLoadingVehicles ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">
                        Loading vehicles...
                      </span>
                    </div>
                  ) : userVehicles.length === 0 ? (
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-2">
                        No vehicles found. Please add a vehicle in your profile
                        first.
                      </p>
                      <Link href="/profile">
                        <Button variant="outline" size="sm">
                          Go to Profile
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          {selectedVehicleId
                            ? (() => {
                                const vehicle = userVehicles.find(
                                  (v) => v.id === selectedVehicleId
                                );
                                return `${vehicle?.year} ${vehicle?.make} ${vehicle?.carModel}`;
                              })()
                            : "Select a vehicle"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full">
                        {userVehicles.map((vehicle) => (
                          <DropdownMenuItem
                            key={vehicle.id}
                            onClick={() => setSelectedVehicleId(vehicle.id)}
                          >
                            {vehicle.year} {vehicle.make} {vehicle.carModel}
                            <span className="ml-2 text-xs text-muted-foreground">
                              ({vehicle.color})
                            </span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  value={serviceNotes}
                  onChange={(e) => setServiceNotes(e.target.value)}
                  placeholder="Any specific requests or issues..."
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={!selectedVehicleId || userVehicles.length === 0}
              >
                Confirm Booking
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewingDetails} onOpenChange={setIsViewingDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedActiveService?.name}</DialogTitle>
            <DialogDescription>
              Details for service ID: {selectedActiveService?.id} on your{" "}
              {selectedActiveService?.carModel}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>
              <strong className="font-medium">Description:</strong>{" "}
              {selectedActiveService?.description}
            </p>
            <p>
              <strong className="font-medium">Price:</strong>{" "}
              <span className="text-primary font-semibold">
                {selectedActiveService?.price}
              </span>
            </p>
            <div>
              <strong className="font-medium">Status:</strong>
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      selectedActiveService?.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {selectedActiveService?.status}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {selectedActiveService?.progress}% Complete
                  </span>
                </div>
                <Progress
                  value={selectedActiveService?.progress}
                  className="mt-2 h-2"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-full">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <ServicesComponent />
    </Suspense>
  );
}
