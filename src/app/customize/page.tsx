
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Paintbrush, PlusCircle } from "lucide-react";
import { mockBuilds } from "@/lib/constants"; // Using mock data for now
import { useRouter } from "next/navigation";


export default function CustomizePage() {
    const router = useRouter();
    // In a real app, you would fetch the user's builds here
    const builds = mockBuilds;

    const handleCreateNew = () => {
        // We can use a special ID like 'new' to signify a new build
        router.push('/customize/new');
    }

    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Your Builds</h1>
                    <p className="text-muted-foreground">
                        Manage your saved customizations or start a new project.
                    </p>
                </div>
                <Button onClick={handleCreateNew}>
                    <PlusCircle className="mr-2" />
                    Create New Build
                </Button>
            </div>

            {builds.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {builds.map((build) => (
                        <Card key={build._id} className="flex flex-col">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                     <div style={{ backgroundColor: build.color }} className="w-12 h-12 rounded-lg flex items-center justify-center">
                                        <Paintbrush className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle>{build.carModel}</CardTitle>
                                        <CardDescription>Saved on {new Date(build.createdAt).toLocaleDateString()}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-muted-foreground font-medium">MODIFICATIONS</p>
                                <p className="text-sm capitalize">
                                    {Object.entries(build.parts).filter(([,v]) => v).map(([k]) => k).join(', ') || "Stock"}
                                </p>
                            </CardContent>
                            <div className="p-6 pt-0">
                                <Button asChild variant="outline" className="w-full">
                                    <Link href={`/customize/${build._id}`}>Edit Build</Link>
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 border-dashed border-2 rounded-lg">
                    <h2 className="text-xl font-semibold">No Builds Yet</h2>
                    <p className="text-muted-foreground mt-2">Start by creating a new build.</p>
                    <Button className="mt-4" onClick={handleCreateNew}>
                        <PlusCircle className="mr-2" />
                        Create New Build
                    </Button>
                </div>
            )}
        </div>
    );
}
