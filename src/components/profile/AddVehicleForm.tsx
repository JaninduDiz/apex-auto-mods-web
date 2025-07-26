"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { useDataStore, type NewVehicle } from '@/store/data-store';

interface AddVehicleFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export function AddVehicleForm({ isOpen, setIsOpen }: AddVehicleFormProps) {
    const { toast } = useToast();
    const { addVehicle } = useDataStore();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        make: '',
        carModel: '',
        color: '',
        year: '',
        odoRead: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const vehicleData: NewVehicle = {
                make: formData.make,
                carModel: formData.carModel,
                color: formData.color,
                year: parseInt(formData.year, 10),
                odoRead: formData.odoRead,
            };
            
            if (isNaN(vehicleData.year)) {
                throw new Error("Year must be a valid number.");
            }

            await addVehicle(vehicleData);

            toast({
                title: "Vehicle Added!",
                description: "Your new vehicle has been added to your profile.",
            });
            setIsOpen(false);
            setFormData({ make: '', carModel: '', color: '', year: '', odoRead: '' });

        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Failed to add vehicle",
                description: error.response?.data?.message || "An unexpected error occurred.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Vehicle</DialogTitle>
                    <DialogDescription>
                        Enter the details of your vehicle below. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="make" className="text-right">Make</Label>
                            <Input id="make" value={formData.make} onChange={handleChange} required className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="carModel" className="text-right">Model</Label>
                            <Input id="carModel" value={formData.carModel} onChange={handleChange} required className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="color" className="text-right">Color</Label>
                            <Input id="color" value={formData.color} onChange={handleChange} required className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="year" className="text-right">Year</Label>
                            <Input id="year" type="number" value={formData.year} onChange={handleChange} required className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="odoRead" className="text-right">Odometer</Label>
                            <Input id="odoRead" placeholder="e.g., 15,000 Km" value={formData.odoRead} onChange={handleChange} required className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Vehicle
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
