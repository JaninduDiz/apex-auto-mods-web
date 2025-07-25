import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Edit } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const user = {
    name: "Jeff Reeves",
    email: "jeff.reeves@example.com",
    phone: "+1 234 567 890",
    location: "San Francisco, CA",
    avatarUrl: "https://placehold.co/128x128.png",
    bio: "Car enthusiast and professional modifier. Passionate about creating unique and high-performance vehicles.",
    builds: 5,
    followers: 1250,
    following: 340,
  };

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
              <p className="text-2xl font-bold">{user.builds}</p>
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

          <div>
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
        </CardContent>
      </Card>
    </div>
  );
}
