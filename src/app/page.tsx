import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const savedBuilds = [
  {
    carModel: "Toyota Supra GR",
    color: "#e53e3e", // Red
    parts: ["Performance Wheels", "Carbon Fiber Spoiler"],
    createdAt: "2 days ago",
  },
  {
    carModel: "Toyota Supra GR",
    color: "#3b82f6", // Blue
    parts: ["Aero Body Kit", "Titanium Sport Exhaust", "Performance Wheels"],
    createdAt: "1 week ago",
  },
  {
    carModel: "Toyota Supra GR",
    color: "#ffffff", // White
    parts: ["Performance Wheels"],
    createdAt: "3 weeks ago",
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Your Dashboard</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Manage your saved configurations.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Saved Builds</h2>
        {savedBuilds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedBuilds.map((build, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{build.carModel}</CardTitle>
                  <CardDescription>Saved {build.createdAt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-medium">Color:</span>
                    <div
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: build.color }}
                      title={build.color}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Installed Parts:</h4>
                    <div className="flex flex-wrap gap-2">
                      {build.parts.map((part) => (
                        <Badge key={part} variant="secondary">{part}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h3 className="text-xl font-medium">No Saved Builds Yet</h3>
            <p className="text-muted-foreground mt-2">Go to the <Link href="/customize" className="text-primary underline">customization page</Link> to create your first build!</p>
          </div>
        )}
      </div>
    </div>
  );
}
