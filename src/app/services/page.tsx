
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Car, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const services = [
  {
    name: "ECU Tunning",
    description: "Unlock your car's true potential with our custom ECU tunes. More power, better fuel economy.",
    price: "Starting from $500",
    icon: Wrench,
  },
  {
    name: "Performance Exhaust Systems",
    description: "Upgrade your car's sound and performance with a high-flow exhaust system from top brands.",
    price: "Starting from $800",
    icon: Wrench,
  },
  {
    name: "Suspension Upgrades",
    description: "Improve handling and get the perfect stance with coilovers, lowering springs, and sway bars.",
    price: "Starting from $1200",
    icon: Wrench,
  },
  {
    name: "Custom Body Kits",
    description: "Transform the look of your car with our wide selection of body kits. Professional installation.",
    price: "Contact for quote",
    icon: Wrench,
  },
  {
    name: "Vinyl Wraps & Paint Protection",
    description: "Change your car's color with a custom vinyl wrap or protect your paint with our PPF services.",
    price: "Starting from $2000",
    icon: Wrench,
  },
  {
    name: "Wheel & Tire Packages",
    description: "A wide selection of wheels and tires to fit any style and budget. Mounting and balancing included.",
    price: "Starting from $1500",
    icon: Wrench,
  },
];

const activeServices = [
    {
        id: "SRV001",
        carModel: "Nissan GTR R35",
        serviceName: "Suspension Upgrades",
        status: "In Progress",
        progress: 45
    },
    {
        id: "SRV002",
        carModel: "Range Rover Evoque",
        serviceName: "Wheel & Tire Packages",
        status: "Completed",
        progress: 100
    }
]

export default function ServicesPage() {
  const [isBooking, setIsBooking] = useState(false);
  const [selectedService, setSelectedService] = useState<{name: string, price: string} | null>(null);
  const { toast } = useToast();

  const handleBookClick = (service: {name: string, price: string}) => {
    setSelectedService(service);
    setIsBooking(true);
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(false);
    toast({
      title: "Booking Confirmed!",
      description: `Your appointment for ${selectedService?.name} has been scheduled.`,
    })
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Our Services</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          World-class modifications for your performance vehicle.
        </p>
      </div>

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

      <section className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">Your Active Services</h2>
        <div className="space-y-6 max-w-4xl mx-auto">
            {activeServices.map(service => (
                 <Card key={service.id} className="p-6 flex items-center gap-6">
                    <div className="bg-secondary p-4 rounded-full">
                        {service.status === 'Completed' ? <ShieldCheck className="w-8 h-8 text-green-500"/> : <Clock className="w-8 h-8 text-primary"/>}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-lg">{service.carModel}</p>
                            <span className={`px-3 py-1 text-sm rounded-full font-medium ${service.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{service.status}</span>
                        </div>
                        <p className="text-muted-foreground">{service.serviceName}</p>
                    </div>
                    <Button variant="outline" size="icon">
                        <ArrowRight className="h-5 w-5"/>
                    </Button>
                 </Card>
            ))}
        </div>
      </section>

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
    </div>
  );
}
