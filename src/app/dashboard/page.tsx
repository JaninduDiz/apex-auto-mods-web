"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Search,
  Flame,
  ArrowRight,
  Wrench,
  Droplets,
  GitBranch,
  Settings,
  Database,
  Gauge,
  Zap,
  ArrowUpNarrowWide,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user-store";
import { useDataStore } from "@/store/data-store";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: { [key: string]: React.ElementType } = {
  CC: Zap,
  BHP: ArrowUpNarrowWide,
  Speed: GitBranch,
  Cylinder: Droplets,
  TotalRun: Gauge,
};

export default function DashboardPage() {
  const user = useUserStore((state) => state.user);
  const { hotCollections, regularCollections, isLoading, fetchDashboardData } =
    useDataStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const detailColors = [
    "bg-orange-100",
    "bg-blue-100",
    "bg-yellow-100",
    "bg-violet-100",
  ];

  return (
    <div className="bg-background text-foreground min-h-screen p-4 md:p-8 pb-20 md:pb-8">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-bold">
            Good morning{user ? `, ${user.name.split(" ")[0]}` : ""}!
          </h1>
          <p className="text-muted-foreground">
            {user
              ? "Welcome back to your garage."
              : "Your premier destination for car modifications."}
          </p>
        </div>
        <div className="relative w-1/3 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input placeholder="Search here" className="pl-10 rounded-full" />
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Flame className="mr-2 text-primary" /> Hot Collections
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-64 w-full rounded-3xl" />
            <Skeleton className="h-64 w-full rounded-3xl" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hotCollections.map((car, index) => (
              <Card
                key={index}
                className={cn("rounded-3xl shadow-lg overflow-hidden border")}
              >
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <Image
                          src={car.logo}
                          width={40}
                          height={40}
                          alt="Car Logo"
                        />
                        <div>
                          <h3 className="text-xl font-bold">{car.brand}</h3>
                          <p className="text-sm text-muted-foreground">
                            {car.model}
                          </p>
                        </div>
                      </div>
                      <Image
                        src={car.image}
                        width={300}
                        height={200}
                        alt={car.name}
                        className="rounded-2xl object-cover w-full"
                      />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          ASKING PRICE
                        </p>
                        <p className="text-2xl font-bold">
                          {car.price}{" "}
                          <span className="text-sm font-normal text-muted-foreground">
                            USD
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {car.details.map((detail, detailIdx) => {
                          const Icon = iconMap[detail.type];
                          return (
                            <div
                              key={detail.value}
                              className={cn(
                                "rounded-2xl p-4 flex flex-col items-center justify-center text-center",
                                detailColors[detailIdx % detailColors.length]
                              )}
                            >
                              {Icon && (
                                <Icon className="h-6 w-6 mb-2 text-muted-foreground" />
                              )}
                              <p className="text-sm font-semibold">
                                {detail.value}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                      <div className="rounded-2xl p-4 flex items-center justify-center text-center gap-2 bg-green-200">
                        <Gauge className="h-6 w-6" />
                        <p className="text-sm font-semibold">
                          Total Run: {car.totalRun}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Regular Collections</h2>
        <Card className="rounded-3xl shadow-lg">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="hidden md:table-header-group">
                    <tr className="text-left text-muted-foreground">
                      <th className="p-6 font-semibold">CAR MODEL</th>
                      <th className="p-6 font-semibold">TOTAL RUN</th>
                      <th className="p-6 font-semibold">CONDITION</th>
                      <th className="p-6 font-semibold">ASKING PRICE</th>
                      <th className="p-6 font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y md:divide-none">
                    {regularCollections.map((car) => (
                      <tr key={car.id} className="block md:table-row">
                        <td
                          className="p-4 md:p-6 whitespace-nowrap block md:table-cell"
                          data-label="Car Model"
                        >
                          <div className="flex items-center gap-4">
                            <Image
                              src={car.image}
                              width={80}
                              height={50}
                              alt={car.model}
                              className="rounded-lg object-cover"
                            />
                            <span className="font-semibold">{car.model}</span>
                          </div>
                        </td>
                        <td
                          className="p-4 md:p-6 text-muted-foreground whitespace-nowrap block md:table-cell"
                          data-label="Total Run"
                        >
                          {car.totalRun}
                        </td>
                        <td
                          className="p-4 md:p-6 text-muted-foreground whitespace-nowrap block md:table-cell"
                          data-label="Condition"
                        >
                          {car.condition}
                        </td>
                        <td
                          className="p-4 md:p-6 font-semibold whitespace-nowrap block md:table-cell"
                          data-label="Asking Price"
                        >
                          {car.price}
                        </td>
                        <td className="p-4 md:p-6 whitespace-nowrap block md:table-cell">
                          <Button
                            variant="outline"
                            className={`rounded-full w-full md:w-auto ${
                              car.condition === "Great"
                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                : ""
                            }`}
                            asChild
                          >
                            <Link href={`/cars/${car.id}`}>
                              See details{" "}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
