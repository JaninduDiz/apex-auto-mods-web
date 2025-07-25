
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Search, Flame, ArrowRight, Wrench, Droplets, GitBranch, Settings, Database, Gauge, Zap, ArrowUpNarrowWide } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import React from "react";
// MOCK DATA: Import mock data. Replace with your actual data fetching logic.
import { hotCollections, regularCollections, ongoingService } from "@/lib/constants";
import { cn } from "@/lib/utils";


const iconMap: { [key: string]: React.ElementType } = {
    'CC': Zap,
    'BHP': ArrowUpNarrowWide,
    'Speed': GitBranch,
    'Cylinder': Droplets,
    'TotalRun': Gauge
}


export default function DashboardPage() {
  // TODO: In a real application, you would fetch this data from your backend.
  // For example:
  // const [hotCollections, setHotCollections] = useState([]);
  // useEffect(() => {
  //   fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cars/hot`)
  //     .then(res => res.json())
  //     .then(data => setHotCollections(data));
  // }, []);

  return (
    <div className="bg-background text-foreground min-h-screen p-8">
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
                <Wrench className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Apex Auto Mods</span>
            </Link>
        </div>
        <div className="relative w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input placeholder="Search here" className="pl-10 rounded-full" />
        </div>
      </header>

      {/* 
        This section should only be visible if there is an ongoing service.
        You will need to fetch the user's active services from your backend.
      */}
      {ongoingService.isSerivceInProgress && (
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Ongoing Service</h2>
            <Card className="rounded-3xl shadow-lg bg-blue-50 border-blue-200">
                <CardContent className="p-6 flex items-center gap-6">
                    <Image src={ongoingService.image} width={150} height={100} alt={ongoingService.carModel} data-ai-hint={ongoingService.dataAiHint} className="rounded-2xl object-cover"/>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-lg">{ongoingService.carModel}</h3>
                            <span className="text-sm text-muted-foreground font-medium">{ongoingService.service}</span>
                        </div>
                        <Progress value={ongoingService.progress} className="h-2"/>
                        <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                            <span>In Progress...</span>
                            <span>{ongoingService.progress}% Complete</span>
                        </div>
                    </div>
                     {/* This link navigates to the services page and passes parameters to show the specific service details */}
                     <Button variant="outline" className="rounded-full self-start" asChild>
                        <Link href={`/services?tab=active&serviceId=${ongoingService.id}`}>
                            View Details <ArrowRight className="ml-2 h-4 w-4"/>
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center"><Flame className="mr-2 text-primary"/> Hot Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hotCollections.map((car, index) => (
            <Card key={index} className={cn('rounded-3xl shadow-lg overflow-hidden border', car.bgColorClass, car.borderColorClass)}>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6 items-center">
                  <div className="flex flex-col gap-4">
                     <div className="flex items-center gap-4">
                        <Image src={car.logo} data-ai-hint="car logo" width={40} height={40} alt="Car Logo" />
                        <div>
                            <h3 className="text-xl font-bold">{car.brand}</h3>
                            <p className="text-sm text-muted-foreground">{car.model}</p>
                        </div>
                    </div>
                    <Image src={car.image} width={300} height={200} alt={car.name} data-ai-hint={car.dataAiHint} className="rounded-2xl object-cover w-full"/>
                    <div>
                        <p className="text-xs text-muted-foreground">ASKING PRICE</p>
                        <p className="text-2xl font-bold">{car.price} <span className="text-sm font-normal text-muted-foreground">USD</span></p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {car.details.map((detail, detailIdx) => {
                        const Icon = iconMap[detail.type];
                        return (
                            <div key={detail.value} className={cn("rounded-2xl p-4 flex flex-col items-center justify-center text-center", detail.bgColorClass)}>
                                {Icon && <Icon className="h-6 w-6 mb-2 text-muted-foreground" />}
                                <p className="text-sm font-semibold">{detail.value}</p>
                            </div>
                        )
                        })}
                    </div>
                     <div className={cn("rounded-2xl p-4 flex items-center justify-center text-center gap-2", car.totalRunBgColorClass)}>
                        <Gauge className="h-6 w-6"/>
                        <p className="text-sm font-semibold">Total Run: {car.totalRun}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Regular Collections</h2>
        <Card className="rounded-3xl shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="p-6 font-semibold">CAR MODEL</th>
                      <th className="p-6 font-semibold">TOTAL RUN</th>
                      <th className="p-6 font-semibold">CONDITION</th>
                      <th className="p-6 font-semibold">ASKING PRICE</th>
                      <th className="p-6 font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {regularCollections.map((car) => (
                      <tr key={car.id} className="border-t">
                        <td className="p-6 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <Image src={car.image} width={80} height={50} alt={car.model} data-ai-hint={car.dataAiHint} className="rounded-lg object-cover"/>
                            <span className="font-semibold">{car.model}</span>
                          </div>
                        </td>
                        <td className="p-6 text-muted-foreground whitespace-nowrap">{car.totalRun}</td>
                        <td className="p-6 text-muted-foreground whitespace-nowrap">{car.condition}</td>
                        <td className="p-6 font-semibold whitespace-nowrap">{car.price}</td>
                        <td className="p-6 whitespace-nowrap">
                          <Button variant="outline" className={`rounded-full ${car.condition === 'Great' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}`} asChild>
                            <Link href={`/cars/${car.id}`}>
                                See details <ArrowRight className="ml-2 h-4 w-4"/>
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}

    