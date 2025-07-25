
import { Wrench, Car, ShieldCheck } from "lucide-react";
import { CustomizationState } from "@/app/customize/[id]/page";

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

export interface Build extends CustomizationState {
  _id: string;
  carModel: string;
  createdAt: string;
}

// --- DASHBOARD MOCK DATA ---

export const hotCollections = [
  {
    name: "Range Rover Evoque",
    brand: "Range Rover",
    model: "Evoque",
    logo: "https://placehold.co/40x40.png",
    image: "https://placehold.co/300x200.png",
    price: "$38,700",
    dataAiHint: "orange range rover evoque convertible",
    bgColorClass: "bg-orange-50",
    borderColorClass: "border-orange-200",
    details: [
      { type: "CC", value: "1997 CC", label: "Engine" },
      { type: "BHP", value: "246.74 BHP", label: "Horsepower" },
      { type: "Speed", value: "6 Speed", label: "Transmission" },
      { type: "Cylinder", value: "4 Cylinder", label: "Cylinders" },
    ],
    totalRun: "12,500 Km"
  },
  {
    name: "Nissan GTR R35 Nismo",
    brand: "Nissan GTR",
    model: "R35 Nismo",
    logo: "https://placehold.co/40x40.png",
    image: "https://placehold.co/300x200.png",
    price: "$187,900",
    dataAiHint: "white nissan gtr",
    bgColorClass: "bg-slate-50",
    borderColorClass: "border-slate-200",
    details: [
      { type: "CC", value: "3799 CC", label: "Engine" },
      { type: "BHP", value: "591.4 BHP", label: "Horsepower" },
      { type: "Speed", value: "6 Speed", label: "Transmission" },
      { type: "Cylinder", value: "6 Cylinder", label: "Cylinders" },
    ],
    totalRun: "9,254 Km"
  }
];

export const regularCollections = [
  {
    id: "honda-crv-2021",
    model: "Honda Cr-V 2021",
    totalRun: "22,409 Km",
    condition: "Great",
    price: "$30,450",
    image: "https://placehold.co/800x600.png",
    dataAiHint: "honda cr-v",
    year: 2021,
    details: {
        engine: "1.5L Turbo",
        transmission: "Automatic",
        bhp: "190 BHP"
    },
    features: ["Sunroof", "Leather Seats", "Apple CarPlay", "Lane Assist"],
    gallery: [
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
    ]
  },
  {
    id: "audi-a6-2021",
    model: "Audi A6 2021",
    totalRun: "18,647 Km",
    condition: "Need Servicing",
    price: "$54,900",
    image: "https://placehold.co/800x600.png",
    dataAiHint: "audi a6",
    year: 2021,
    details: {
        engine: "2.0L TFSI",
        transmission: "7-Speed S tronic",
        bhp: "248 BHP"
    },
    features: ["Virtual Cockpit", "MMI Navigation Plus", "Bang & Olufsen Sound"],
    gallery: [
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
    ]
  },
  {
    id: "audi-q3-2019",
    model: "Audi Q3 2019",
    totalRun: "35,000 Km",
    condition: "Great",
    price: "$35,695",
    image: "https://placehold.co/800x600.png",
    dataAiHint: "audi q3",
    year: 2019,
     details: {
        engine: "2.0L TFSI",
        transmission: "8-Speed Tiptronic",
        bhp: "228 BHP"
    },
    features: ["Quattro All-Wheel Drive", "Panoramic Sunroof", "LED Headlights"],
    gallery: [
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
    ]
  },
  {
    id: "mercedes-c-class-2019",
    model: "Mercedes-Benz C-Class 2019",
    totalRun: "12,520 Km",
    condition: "Excellent",
    price: "$52,000",
    image: "https://placehold.co/800x600.png",
    dataAiHint: "mercedes c-class",
    year: 2019,
    details: {
        engine: "2.0L I4 Turbo",
        transmission: "9G-TRONIC Automatic",
        bhp: "255 BHP"
    },
    features: ["12.3-inch Digital Instrument Cluster", "Ambient Lighting", "Burmester Surround Sound"],
     gallery: [
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
        "https://placehold.co/600x400.png",
    ]
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

// --- PROFILE & CUSTOMIZE MOCK DATA ---

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
    { _id: 'build-1', carModel: 'Toyota Supra GR', color: '#FF0000', parts: { wheels: true, spoiler: true, bodykit: false, exhaust: true }, createdAt: '2023-10-26T10:00:00Z' },
    { _id: 'build-2', carModel: 'Nissan GTR R35', color: '#0000FF', parts: { wheels: true, spoiler: false, bodykit: true, exhaust: false }, createdAt: '2023-10-25T14:30:00Z' },
    { _id: 'build-3', carModel: 'Range Rover Evoque', color: '#FFA500', parts: { wheels: true, spoiler: false, bodykit: false, exhaust: true }, createdAt: '2023-09-15T11:00:00Z' },
];
