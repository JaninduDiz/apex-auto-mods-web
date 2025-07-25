
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Search, Flame, ArrowRight, Wrench } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import React from "react";

const hotCollections = [
  {
    name: "Range Rover Evoque",
    image: "https://placehold.co/300x200.png",
    price: "$38,700",
    dataAiHint: "orange range rover evoque",
    details: [
      { value: "3997 CC" },
      { value: "246.74 BHP" },
      { value: "5 Speed" },
      { value: "4 Cylinder" },
    ],
    totalRun: "12,500 Km"
  },
  {
    name: "Nissan GTR R35 Nismo",
    image: "https://placehold.co/300x200.png",
    price: "$187,900",
    dataAiHint: "white nissan gtr",
    details: [
      { value: "3799 CC" },
      { value: "591.4 BHP" },
      { value: "6 Speed" },
      { value: "6 Cylinder" },
    ],
    totalRun: "17,754 Km"
  }
];

const regularCollections = [
  {
    model: "Honda Cr-V 2021",
    totalRun: "22,409 Km",
    condition: "Great",
    price: "$30,450",
    image: "https://placehold.co/80x40.png",
    dataAiHint: "honda cr-v"
  },
  {
    model: "Audi A6 2021",
    totalRun: "18,647 Km",
    condition: "Need Servicing",
    price: "$54,900",
    image: "https://placehold.co/80x40.png",
    dataAiHint: "audi a6"
  },
  {
    model: "Audi Q3 2019",
    totalRun: "35,000 Km",
    condition: "Great",
    price: "$35,695",
    image: "https://placehold.co/80x40.png",
    dataAiHint: "audi q3"
  },
  {
    model: "Mercedes-Benz C-Class 2019",
    totalRun: "12,520 Km",
    condition: "Excellent",
    price: "$52,000",
    image: "https://placehold.co/80x40.png",
    dataAiHint: "mercedes c-class"
  },
];

const ongoingService = {
  isSerivceInProgress: true, // set to false to hide the section
  id: "SRV001",
  carModel: "Toyota Supra GR",
  service: "ECU Tunning",
  progress: 65,
  image: "https://placehold.co/150x100.png",
  dataAiHint: "white toyota supra"
};


export default function DashboardPage() {
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
            <Card key={index} className={`rounded-3xl shadow-lg overflow-hidden ${index === 0 ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'}`}>
              <CardHeader className="p-6">
                <CardTitle className="flex items-center gap-4">
                  <Image src="https://placehold.co/40x40.png" data-ai-hint="car logo" width={40} height={40} alt="Car Logo" />
                  <div>
                    <h3 className="text-xl font-bold">{car.name}</h3>
                    <p className="text-sm text-muted-foreground">{car.name.split(" ")[0]}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="flex gap-6">
                  <div className="w-1/2">
                    <Image src={car.image} width={300} height={200} alt={car.name} data-ai-hint={car.dataAiHint} className="rounded-2xl object-cover w-full"/>
                    <p className="text-2xl font-bold mt-4">{car.price} <span className="text-sm font-normal text-muted-foreground">USD</span></p>
                  </div>
                  <div className="w-1/2 grid grid-cols-2 gap-4">
                    {car.details.map(detail => (
                      <div key={detail.value} className="bg-background rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                          <p className="text-sm font-semibold">{detail.value}</p>
                      </div>
                    ))}
                     <div className="bg-green-100 text-green-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center col-span-2">
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
                    {regularCollections.map((car, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-6 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <Image src={car.image} width={80} height={40} alt={car.model} data-ai-hint={car.dataAiHint} className="rounded-lg"/>
                            <span className="font-semibold">{car.model}</span>
                          </div>
                        </td>
                        <td className="p-6 text-muted-foreground whitespace-nowrap">{car.totalRun}</td>
                        <td className="p-6 text-muted-foreground whitespace-nowrap">{car.condition}</td>
                        <td className="p-6 font-semibold whitespace-nowrap">{car.price}</td>
                        <td className="p-6 whitespace-nowrap">
                          <Button variant="outline" className={`rounded-full ${car.condition === 'Great' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}`}>
                            See details <ArrowRight className="ml-2 h-4 w-4"/>
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
