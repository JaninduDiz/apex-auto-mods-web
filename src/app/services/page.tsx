
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Car, Clock, ShieldCheck, ArrowRight, Loader2, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from '@/components/ui/progress';
// MOCK DATA: Import mock data. Replace with your actual data fetching logic.
import { staticServices, activeServices as mockActiveServices } from "@/lib/constants";


interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: React.ElementType;
}

interface ActiveService extends Service {
    carModel: string;
    status: "In Progress" | "Completed";
    progress: number;
}


function ServicesComponent() {
  const searchParams = useSearchParams();
  const [services, setServices] = useState<Omit<Service, 'id'>[]>([]);
  // MOCK DATA: Using mock active services. Replace with state from an API call.
  const [activeServices, setActiveServices] = useState<ActiveService[]>(mockActiveServices);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedService, setSelectedService] = useState<Omit<Service, 'id'> | null>(null);
  const [selectedActiveService, setSelectedActiveService] = useState<ActiveService | null>(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("available");
  const { toast } = useToast();

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoadingServices(true);
      try {
        // TODO: Replace this with an actual API call to your backend
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/services`);
        // if (!response.ok) {
        //   throw new Error("Failed to fetch services");
        // }
        // const data = await response.json();
        // setServices(data);

        // Using static data for now
        setServices(staticServices);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not fetch services. Displaying static data."
        })
        setServices(staticServices);
      } finally {
        setIsLoadingServices(false);
      }
    };

    // TODO: Fetch active services for the logged-in user
    // This would typically involve getting the user's ID from an auth context
    // and making a call like:
    // const fetchActiveServices = async (userId) => {
    //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/services/active/${userId}`);
    //   ...
    // }

    fetchServices();
  }, [toast]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    const serviceId = searchParams.get('serviceId');

    if (tab === 'active') {
      setActiveTab('active');
    }

    if (serviceId) {
      // Using mock data. In a real app, you would have already fetched this.
      const serviceToView = activeServices.find(s => s.id === serviceId);
      if (serviceToView) {
        setSelectedActiveService(serviceToView);
        setIsViewingDetails(true);
      }
    }
  }, [searchParams, activeServices]);

  const handleBookClick = (service: Omit<Service, 'id'>) => {
    setSelectedService(service);
    setIsBooking(true);
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add logic here to submit the booking to your backend API
    // For example:
    // await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/services/book`, {
    //   method: 'POST',
    //   body: JSON.stringify({ serviceName: selectedService.name, ... }),
    // });
    setIsBooking(false);
    toast({
      title: "Booking Confirmed!",
      description: `Your appointment for ${selectedService?.name} has been scheduled.`,
    })
  }
  
  const handleViewDetailsClick = (service: ActiveService) => {
    setSelectedActiveService(service);
    setIsViewingDetails(true);
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Our Services</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          World-class modifications for your performance vehicle.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="available">Available Services</TabsTrigger>
          <TabsTrigger value="active">Your Active Services</TabsTrigger>
        </TabsList>
        <TabsContent value="available" className="mt-8">
            {isLoadingServices ? (
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
                <Card key={service.name} className="flex flex-col">
                  <CardHeader className="flex flex-row items-start gap-4 pb-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{service.name}</CardTitle>
                      <CardDescription className="mt-1">{service.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-end">
                    <div className="flex justify-between items-center mt-4">
                      <p className="font-semibold text-primary">{service.price}</p>
                      <Button onClick={() => handleBookClick(service)}>Book Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="active" className="mt-8">
            <div className="space-y-6 max-w-4xl mx-auto">
                {activeServices.map(service => (
                    <Card key={service.id} className="p-6 flex items-center gap-6 cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => handleViewDetailsClick(service)}>
                        <div className="bg-secondary p-4 rounded-full">
                            {service.status === 'Completed' ? <ShieldCheck className="w-8 h-8 text-green-500"/> : <Clock className="w-8 h-8 text-primary"/>}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <p className="font-bold text-lg">{service.carModel}</p>
                                <span className={`px-3 py-1 text-sm rounded-full font-medium ${service.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{service.status}</span>
                            </div>
                            <p className="text-muted-foreground">{service.name}</p>
                        </div>
                        <Button variant="outline" size="icon">
                            <Info className="h-5 w-5"/>
                        </Button>
                    </Card>
                ))}
            </div>
        </TabsContent>
      </Tabs>


      <Dialog open={isBooking} onOpenChange={setIsBooking}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Book: {selectedService?.name}</DialogTitle>
                <DialogDescription>
                    Fill in your vehicle details to schedule your service.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleBookingSubmit}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="vehicle-model" className="text-right">Vehicle Model</Label>
                        <Input id="vehicle-model" required placeholder="e.g., Toyota Supra GR" className="col-span-3"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="notes" className="text-right">Notes</Label>
                        <Textarea id="notes" placeholder="Any specific requests or issues..." className="col-span-3"/>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Confirm Booking</Button>
                </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isViewingDetails} onOpenChange={setIsViewingDetails}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{selectedActiveService?.name}</DialogTitle>
                <DialogDescription>
                    Details for service ID: {selectedActiveService?.id} on your {selectedActiveService?.carModel}
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p><strong className="font-medium">Description:</strong> {selectedActiveService?.description}</p>
              <p><strong className="font-medium">Price:</strong> <span className="text-primary font-semibold">{selectedActiveService?.price}</span></p>
              <div>
                <strong className="font-medium">Status:</strong>
                <div className="mt-2">
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 text-sm rounded-full font-medium ${selectedActiveService?.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{selectedActiveService?.status}</span>
                    <span className="text-sm text-muted-foreground">{selectedActiveService?.progress}% Complete</span>
                  </div>
                  <Progress value={selectedActiveService?.progress} className="mt-2 h-2"/>
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
        <Suspense fallback={<div>Loading...</div>}>
            <ServicesComponent />
        </Suspense>
    )
}
