"use client";

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { regularCollections } from '@/lib/constants';
import { ArrowLeft, CheckCircle, Droplets, Gauge, GitBranch, Settings, Tag } from 'lucide-react';
import Link from 'next/link';

export default function CarDetailsPage() {
  const params = useParams();
  const carId = params.id;

  // In a real app, you would fetch this data from your backend using the carId
  const car = regularCollections.find(c => c.id === carId);

  if (!car) {
    return <div className="container mx-auto py-12 px-4 md:px-6 text-center">Car not found.</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
        </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card className="overflow-hidden">
                <div className="relative h-[450px]">
                    <Image
                        src={car.image}
                        alt={car.model}
                        fill
                        className="object-cover"
                    />
                </div>
            </Card>
            <div className="mt-4 grid grid-cols-3 gap-4">
                {car.gallery?.map((img, index) => (
                    <Card key={index} className="overflow-hidden">
                        <div className="relative h-40">
                             <Image
                                src={img}
                                alt={`${car.model} gallery image ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </Card>
                ))}
            </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{car.model}</CardTitle>
              <p className="text-muted-foreground">{car.year}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <p className="text-3xl font-bold text-primary">{car.price}</p>
                <Badge variant={car.condition === 'Excellent' || car.condition === 'Great' ? 'default' : 'destructive'}>
                  {car.condition}
                </Badge>
              </div>
              <Separator className="my-6" />
              <h3 className="text-lg font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-muted-foreground" />
                    <span>{car.totalRun}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-muted-foreground" />
                    <span>{car.details?.engine}</span>
                </div>
                <div className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5 text-muted-foreground" />
                    <span>{car.details?.transmission}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    <span>{car.details?.bhp}</span>
                </div>
              </div>
              <Separator className="my-6" />
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <div className="space-y-3">
                {car.features?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
                <Separator className="my-6" />
                <Button size="lg" className="w-full">
                    <Tag className="mr-2"/> Contact Seller
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
