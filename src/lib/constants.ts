import { Wrench, Car, ShieldCheck } from "lucide-react";

// --- TYPES ---

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: React.ElementType;
}

export interface ActiveService extends Service {
  carModel: string;
  status: "In Progress" | "Completed";
  progress: number;
}

export interface HotCollection {
  name: string;
  brand: string;
  model: string;
  logo: string;
  image: string;
  price: string;
  details: { type: string; value: string; label: string }[];
  totalRun: string;
}

export interface RegularCollection {
  id: string;
  model: string;
  totalRun: string;
  condition: string;
  price: string;
  image: string;
  year: number;
  details: {
    engine: string;
    transmission: string;
    bhp: string;
  };
  features: string[];
  gallery: string[];
}

// --- DASHBOARD MOCK DATA ---

export const hotCollections: HotCollection[] = [
  {
    name: "Range Rover Evoque",
    brand: "Range Rover",
    model: "Evoque",
    logo: "https://www.nicepng.com/png/detail/130-1300392_land-rover-logo-hd-png-land-rover.png",
    image:
      "https://www.nicepng.com/png/detail/926-9269336_range-rover-evoque-png.png",
    price: "$38,700",
    details: [
      { type: "CC", value: "1997 CC", label: "Engine" },
      { type: "BHP", value: "246.74 BHP", label: "Horsepower" },
      { type: "Speed", value: "6 Speed", label: "Transmission" },
      { type: "Cylinder", value: "4 Cylinder", label: "Cylinders" },
    ],
    totalRun: "12,500 Km",
  },
  {
    name: "Nissan GTR R35 Nismo",
    brand: "Nissan GTR",
    model: "R35 Nismo",
    logo: "https://www.nicepng.com/png/detail/48-481440_nissan-logo.png",
    image:
      "https://www.nicepng.com/png/detail/24-248887_nissan-gt-r-png-photo-nissan-gtr-nismo.png",
    price: "$187,900",
    details: [
      { type: "CC", value: "3799 CC", label: "Engine" },
      { type: "BHP", value: "591.4 BHP", label: "Horsepower" },
      { type: "Speed", value: "6 Speed", label: "Transmission" },
      { type: "Cylinder", value: "6 Cylinder", label: "Cylinders" },
    ],
    totalRun: "9,254 Km",
  },
];

export const regularCollections: RegularCollection[] = [
  {
    id: "honda-crv-2021",
    model: "Honda CR-V 2021",
    totalRun: "22,409 Km",
    condition: "Great",
    price: "$30,450",
    image:
      "https://www.nicepng.com/png/detail/402-4028073_crv-png-honda-crv-2016-full-option.png",
    year: 2021,
    details: {
      engine: "1.5L Turbo",
      transmission: "Automatic",
      bhp: "190 BHP",
    },
    features: ["Sunroof", "Leather Seats", "Apple CarPlay", "Lane Assist"],
    gallery: [
      "https://www.nicepng.com/png/detail/402-4028073_crv-png-honda-crv-2016-full-option.png",
      "https://www.nicepng.com/png/detail/402-4028073_crv-png-honda-crv-2016-full-option.png",
      "https://www.nicepng.com/png/detail/402-4028073_crv-png-honda-crv-2016-full-option.png",
    ],
  },
  {
    id: "audi-a6-2021",
    model: "Audi A6 2021",
    totalRun: "18,647 Km",
    condition: "Need Servicing",
    price: "$54,900",
    image:
      "https://www.nicepng.com/png/detail/692-6929588_new-2019-audi-a6-prestige.png",
    year: 2021,
    details: {
      engine: "2.0L TFSI",
      transmission: "7-Speed S tronic",
      bhp: "248 BHP",
    },
    features: [
      "Virtual Cockpit",
      "MMI Navigation Plus",
      "Bang & Olufsen Sound",
    ],
    gallery: [
      "https://www.nicepng.com/png/detail/692-6929588_new-2019-audi-a6-prestige.png",
      "https://www.nicepng.com/png/detail/692-6929588_new-2019-audi-a6-prestige.png",
      "https://www.nicepng.com/png/detail/692-6929588_new-2019-audi-a6-prestige.png",
    ],
  },
  {
    id: "audi-q3-2019",
    model: "Audi Q3 2019",
    totalRun: "35,000 Km",
    condition: "Great",
    price: "$35,695",
    image: "https://www.nicepng.com/png/detail/416-4160259_audi-q3.png",
    year: 2019,
    details: {
      engine: "2.0L TFSI",
      transmission: "8-Speed Tiptronic",
      bhp: "228 BHP",
    },
    features: [
      "Quattro All-Wheel Drive",
      "Panoramic Sunroof",
      "LED Headlights",
    ],
    gallery: [
      "https://www.nicepng.com/png/detail/416-4160259_audi-q3.png",
      "https://www.nicepng.com/png/detail/416-4160259_audi-q3.png",
      "https://www.nicepng.com/png/detail/416-4160259_audi-q3.png",
    ],
  },
  {
    id: "mercedes-c-class-2019",
    model: "Mercedes-Benz C-Class 2019",
    totalRun: "12,520 Km",
    condition: "Excellent",
    price: "$52,000",
    image:
      "https://www.nicepng.com/png/detail/825-8251432_mercedes-benz-c-class.png",
    year: 2019,
    details: {
      engine: "2.0L I4 Turbo",
      transmission: "9G-TRONIC Automatic",
      bhp: "255 BHP",
    },
    features: [
      "12.3-inch Digital Instrument Cluster",
      "Ambient Lighting",
      "Burmester Surround Sound",
    ],
    gallery: [
      "https://www.nicepng.com/png/detail/825-8251432_mercedes-benz-c-class.png",
      "https://www.nicepng.com/png/detail/825-8251432_mercedes-benz-c-class.png",
      "https://www.nicepng.com/png/detail/825-8251432_mercedes-benz-c-class.png",
    ],
  },
];

// --- SERVICES MOCK DATA ---

export const activeServices: ActiveService[] = [
  {
    id: "SRV001",
    carModel: "Nissan GTR R35",
    name: "Suspension Upgrades",
    description:
      "Improve handling and get the perfect stance with coilovers, lowering springs, and sway bars.",
    price: "$1,450",
    status: "In Progress",
    progress: 45,
    icon: Wrench,
  },
  {
    id: "SRV002",
    carModel: "Range Rover Evoque",
    name: "Wheel & Tire Packages",
    description:
      "A wide selection of wheels and tires to fit any style and budget. Mounting and balancing included.",
    price: "$2,100",
    status: "Completed",
    progress: 100,
    icon: Wrench,
  },
  {
    id: "SRV003",
    carModel: "Toyota Supra GR",
    name: "ECU Tunning",
    description:
      "Unlock your car's true potential with our custom ECU tunes. More power, better fuel economy.",
    price: "$750",
    status: "In Progress",
    progress: 65,
    icon: Wrench,
  },
];

export const ongoingService = {
  isSerivceInProgress: true, // set to false to hide the section
  id: "SRV003",
  carModel: "Toyota Supra GR",
  service: "ECU Tunning",
  progress: 65,
  image:
    "https://www.nicepng.com/png/detail/926-9269336_range-rover-evoque-png.png",
};

// --- PROFILE & CUSTOMIZE MOCK DATA ---

export const user = {
  _id: "user123", // This would come from your authentication context
  name: "Jeff Reeves",
  email: "jeff.reeves@example.com",
  phone: "+1 234 567 890",
  location: "San Francisco, CA",
  avatarUrl:
    "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png",
  bio: "Car enthusiast and professional modifier. Passionate about creating unique and high-performance vehicles.",
  followers: 1250,
  following: 340,
};
