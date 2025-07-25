
import { Wrench, Car, ShieldCheck } from "lucide-react";
import { CustomizationState } from "@/components/customization/CustomizationWorkspace";

// --- TYPES ---

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: React.ElementType;
}

interface ActiveService extends Service {
    carModel: string;
    status: "In Progress" | "Completed";
    progress: number;
}

interface Build extends CustomizationState {
  _id: string;
  carModel: string;
  createdAt: string;
}

// --- DASHBOARD MOCK DATA ---

export const hotCollections = [
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

export const regularCollections = [
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

export const ongoingService = {
  isSerivceInProgress: true, // set to false to hide the section
  id: "SRV003",
  carModel: "Toyota Supra GR",
  service: "ECU Tunning",
  progress: 65,
  image: "https://placehold.co/150x100.png",
  dataAiHint: "white toyota supra"
};


// --- SERVICES MOCK DATA ---

export const staticServices: Omit<Service, 'id'>[] = [
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
    icon: Car,
  },
  {
    name: "Vinyl Wraps & Paint Protection",
    description: "Change your car's color with a custom vinyl wrap or protect your paint with our PPF services.",
    price: "Starting from $2000",
    icon: ShieldCheck,
  },
  {
    name: "Wheel & Tire Packages",
    description: "A wide selection of wheels and tires to fit any style and budget. Mounting and balancing included.",
    price: "Starting from $1500",
    icon: Wrench,
  },
];


export const activeServices: ActiveService[] = [
    {
        id: "SRV001",
        carModel: "Nissan GTR R35",
        name: "Suspension Upgrades",
        description: "Improve handling and get the perfect stance with coilovers, lowering springs, and sway bars.",
        price: "$1,450",
        status: "In Progress",
        progress: 45,
        icon: Wrench,
    },
    {
        id: "SRV002",
        carModel: "Range Rover Evoque",
        name: "Wheel & Tire Packages",
        description: "A wide selection of wheels and tires to fit any style and budget. Mounting and balancing included.",
        price: "$2,100",
        status: "Completed",
        progress: 100,
        icon: Wrench,
    },
    {
        id: "SRV003",
        carModel: "Toyota Supra GR",
        name: "ECU Tunning",
        description: "Unlock your car's true potential with our custom ECU tunes. More power, better fuel economy.",
        price: "$750",
        status: "In Progress",
        progress: 65,
        icon: Wrench,
    }
];

// --- PROFILE MOCK DATA ---

export const user = {
    _id: "user123", // This would come from your authentication context
    name: "Jeff Reeves",
    email: "jeff.reeves@example.com",
    phone: "+1 234 567 890",
    location: "San Francisco, CA",
    avatarUrl: "https://placehold.co/128x128.png",
    bio: "Car enthusiast and professional modifier. Passionate about creating unique and high-performance vehicles.",
    followers: 1250,
    following: 340,
};

export const mockBuilds: Build[] = [
    { _id: '1', carModel: 'Toyota Supra GR', color: '#FF0000', parts: { wheels: true, spoiler: true, bodykit: false, exhaust: true }, createdAt: new Date().toISOString() },
    { _id: '2', carModel: 'Toyota Supra GR', color: '#0000FF', parts: { wheels: true, spoiler: false, bodykit: true, exhaust: false }, createdAt: new Date().toISOString() },
];
