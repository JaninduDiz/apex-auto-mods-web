
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
import { type Build } from "@/lib/constants";
// MOCK DATA: Import mock data. Replace with your actual data fetching logic.
import { user as mockUser, mockBuilds } from "@/lib/constants";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [builds, setBuilds] = useState<Build[]>([]);
  const [isLoadingBuilds, setIsLoadingBuilds] = useState(true);
  
  // MOCK DATA: Using mock user data. In a real app, this would come from an auth context/hook.
  const user = mockUser;

  useEffect(() => {
    const fetchBuilds = async () => {
      setIsLoadingBuilds(true);
      try {
        // TODO: Replace this with an actual API call to your backend.
        // In a real app, you'd get the user ID from your auth context.
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/builds/${user._id}`);
        // if (!response.ok) {
        //   throw new Error("Failed to fetch builds.");
        // }
        // const data = await response.json();
        // setBuilds(data);
        
        // Using mock data for demonstration.
        // The API call was commented out, so we use mockBuilds directly.
        // When you implement the backend, you can remove the line below.
        if (true) { // This is just to simulate a successful fetch for now
           setBuilds(mockBuilds);
        } else {
           throw new Error("Failed to fetch builds. Displaying mock data.");
        }

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
    
    // We check for user._id before fetching, as it would be needed for the API call
    if(user._id) {
      fetchBuilds();
    }
  }, [toast, user._id]);


  return (
    <div className="container mx-auto py-12 px-4 md:px-6 pb-20 md:pb-12">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="relative h-36 md:h-48 bg-gray-200 rounded-t-lg">
            <Image 
                src="https://placehold.co/1024x300.png"
                data-ai-hint="automotive garage background"
                alt="Cover photo"
                fill
                className="object-cover rounded-t-lg"
            />
            <div className="absolute bottom-0 left-4 md:left-6 translate-y-1/2">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background">
                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="man avatar"/>
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
            </div>
        </CardHeader>
        <CardContent className="pt-16 md:pt-20">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <CardTitle className="text-2xl md:text-3xl">{user.name}</CardTitle>
              <CardDescription className="text-muted-foreground">{user.email}</CardDescription>
            </div>
            <Button variant="outline" className="w-full md:w-auto">
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
                      <p className="text-sm text-muted-foreground capitalize">
                        {Object.entries(build.parts).filter(([,v]) => v).map(([k]) => k).join(', ') || "No extra parts"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Saved on {new Date(build.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => router.push(`/customize/${build._id}`)}>View</Button>
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
