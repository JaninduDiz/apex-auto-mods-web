import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wrench } from "lucide-react";

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

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Our Services</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          World-class modifications for your performance vehicle.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card key={service.name} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{service.description}</CardDescription>
              <p className="font-semibold text-primary mt-4">{service.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
