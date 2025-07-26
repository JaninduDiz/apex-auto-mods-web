"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Car, Palette, Calendar, Gauge, Trash2, Loader2 } from "lucide-react";
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
import { useDataStore } from "@/store/data-store";
import { useState } from "react";
import type { Vehicle } from "@/types/api";

interface VehicleListProps {
  vehicles: Vehicle[];
  isLoading: boolean;
}

export function VehicleList({ vehicles, isLoading }: VehicleListProps) {
  const { deleteVehicle } = useDataStore();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDeleteVehicle = async (
    vehicleId: string,
    vehicleName: string
  ) => {
    setIsDeleting(vehicleId);
    try {
      await deleteVehicle(vehicleId);
      toast({
        title: "Vehicle Deleted",
        description: `${vehicleName} has been successfully removed from your garage.`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Deletion Failed",
        description:
          error.response?.data?.message || "Could not delete the vehicle.",
      });
    } finally {
      setIsDeleting(null);
    }
  };
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
      <div className="text-center text-muted-foreground border-dashed border-2 border-muted-foreground/30 p-8 rounded-xl bg-muted/10 shadow-sm">
        <p>You haven't added any vehicles yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {vehicleArray.map((vehicle) => (
        <Card key={vehicle.id} className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-bold text-lg flex items-center gap-2">
                <Car className="w-5 h-5 text-primary" />
                {vehicle.make} {vehicle.carModel}
              </h4>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Palette
                    className="w-4 h-4"
                    style={{ color: vehicle.color }}
                  />
                  <span>{vehicle.color}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{vehicle.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4" />
                  <span>{vehicle.odoRead}km</span>
                </div>
              </div>
            </div>
            <div className="ml-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={isDeleting === vehicle.id}
                  >
                    {isDeleting === vehicle.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Vehicle</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete your {vehicle.make}{" "}
                      {vehicle.carModel}? This action cannot be undone and will
                      permanently remove this vehicle from your garage.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        handleDeleteVehicle(
                          vehicle.id,
                          `${vehicle.make} ${vehicle.carModel}`
                        )
                      }
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete Vehicle
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
