"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Car, Palette, Calendar, Gauge } from "lucide-react";
import type { Vehicle } from "@/types/api";

interface VehicleListProps {
  vehicles: Vehicle[];
  isLoading: boolean;
}

export function VehicleList({ vehicles, isLoading }: VehicleListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  // Ensure vehicles is an array
  const vehicleArray = Array.isArray(vehicles) ? vehicles : [];

  if (vehicleArray.length === 0) {
    return (
      <div className="text-center text-muted-foreground border-dashed border-2 p-8 rounded-lg">
        <p>You haven't added any vehicles yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {vehicleArray.map((vehicle) => (
        <Card key={vehicle.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-lg flex items-center gap-2">
                <Car className="w-5 h-5 text-primary" />
                {vehicle.make} {vehicle.carModel}
              </h4>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  <span>{vehicle.color}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{vehicle.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4" />
                  <span>{vehicle.odoRead}</span>
                </div>
              </div>
            </div>
            {/* Future buttons for edit/delete can go here */}
          </div>
        </Card>
      ))}
    </div>
  );
}
