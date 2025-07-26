"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { type Vehicle } from "@/types/api";
import { Skeleton } from "../ui/skeleton";
import { Car, PlusCircle } from "lucide-react";
import Link from "next/link";

interface SelectVehicleDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  vehicles: Vehicle[];
  isLoading: boolean;
}

export function SelectVehicleDialog({
  isOpen,
  setIsOpen,
  vehicles,
  isLoading,
}: SelectVehicleDialogProps) {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedValue) {
      const selectedVehicle = vehicles.find((v) => v.id === selectedValue);
      if (selectedVehicle) {
        const carModel = encodeURIComponent(
          `${selectedVehicle.make} ${selectedVehicle.carModel}`
        );
        router.push(`/customize/new?carModel=${carModel}`);
        setIsOpen(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select a Vehicle</DialogTitle>
          <DialogDescription>
            Choose one of your vehicles to start customizing.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : vehicles.length > 0 ? (
            <RadioGroup onValueChange={setSelectedValue}>
              <div className="space-y-2">
                {vehicles.map((vehicle) => (
                  <Label
                    key={vehicle.id}
                    htmlFor={vehicle.id}
                    className="flex items-center gap-4 p-4 border rounded-md cursor-pointer hover:bg-muted/50"
                  >
                    <RadioGroupItem value={vehicle.id} id={vehicle.id} />
                    <Car className="w-6 h-6 text-primary" />
                    <span className="font-semibold">
                      {vehicle.make} {vehicle.carModel}
                    </span>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          ) : (
            <div className="text-center text-muted-foreground border-dashed border-2 p-8 rounded-lg">
              <p className="mb-4">You don't have any vehicles yet.</p>
              <Button asChild>
                <Link href="/profile">
                  <PlusCircle className="mr-2" />
                  Add a Vehicle
                </Link>
              </Button>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleContinue} disabled={!selectedValue}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
