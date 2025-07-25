"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Edit, Paintbrush, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { CustomizationState } from "@/components/customization/CustomizationWorkspace";


interface Build extends CustomizationState {
  _id: string;
  carModel: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { toast } = useToast();
  const [builds, setBuilds] = useState<Build[]>([]);
  const [isLoadingBuilds, setIsLoadingBuilds] = useState(true);

  const user = {
    _id: "user123", // Dummy user ID
    name: "Jeff Reeves",
    email: "jeff.reeves@example.com",
    phone: "+1 234 567 890",
    location: "San Francisco, CA",
    avatarUrl: "https://placehold.co/128x128.png",
    bio: "Car enthusiast and professional modifier. Passionate about creating unique and high-performance vehicles.",
    buildsCount: 5,
    followers: 1250,
    following: 340,
  };

  useEffect(() => {
    const fetchBuilds = async () => {
      setIsLoadingBuilds(true);
      try {
        // In a real app, you'd get the user ID from your auth context
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/builds/${user._id}`);
        
        if (!response.ok) {
          // Mock data for demonstration since the endpoint doesn't exist
           const mockBuilds: Build[] = [
            { _id: '1', carModel: 'Toyota Supra GR', color: '#FF0000', parts: { wheels: true, spoiler: true, bodykit: false, exhaust: true }, createdAt: new Date().toISOString() },
            { _id: '2', carModel: 'Toyota Supra GR', color: '#0000FF', parts: { wheels: true, spoiler: false, bodykit: true, exhaust: false }, createdAt: new Date().toISOString() },
           ];
           setBuilds(mockBuilds);
           throw new Error("Failed to fetch builds. Displaying mock data.");
        }

        const data = await response.json();
        setBuilds(data);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Could not fetch your saved builds."
        })
      } finally {
        setIsLoadingBuilds(false);
      }
    };
    fetchBuilds();
  }, [toast, user._id]);


  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="relative h-48 bg-gray-200 rounded-t-lg">
            <Image 
                src="https://placehold.co/1024x300.png"
                data-ai-hint="automotive garage background"
                alt="Cover photo"
                fill
                className="object-cover rounded-t-lg"
            />
            <div className="absolute bottom-0 left-6 translate-y-1/2">
                <Avatar className="w-32 h-32 border-4 border-background">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="man avatar"/>
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
            </div>
        </CardHeader>
        <CardContent className="pt-20">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">{user.name}</CardTitle>
              <CardDescription className="text-muted-foreground">{user.email}</CardDescription>
            </div>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>

          <p className="mt-4 text-foreground/90">{user.bio}</p>

          <div className="mt-6 flex gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold">{builds.length}</p>
              <p className="text-sm text-muted-foreground">Builds</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{user.followers.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{user.following}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>
        
          <Separator className="my-8" />

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span>{user.name}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <span>{user.location}</span>
                </div>
            </div>
          </div>

          <Separator className="my-8" />

           <div>
            <h3 className="text-lg font-semibold mb-4">My Builds</h3>
            {isLoadingBuilds ? (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : builds.length > 0 ? (
              <div className="space-y-4">
                {builds.map((build) => (
                  <Card key={build._id} className="p-4 flex items-center gap-4">
                    <div style={{ backgroundColor: build.color }} className="w-16 h-16 rounded-md flex items-center justify-center">
                        <Paintbrush className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold">{build.carModel}</p>
                      <p className="text-sm text-muted-foreground">
                        {Object.entries(build.parts).filter(([,v]) => v).map(([k]) => k).join(', ') || "No extra parts"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Saved on {new Date(build.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center">You haven't saved any builds yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
