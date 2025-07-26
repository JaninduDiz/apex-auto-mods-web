// API Response Types based on Mongoose schemas

// Base API Response structure
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  count?: number;
}

export interface ApiError {
  success: false;
  message: string;
  error: string;
}

// User Types (from userSchema)
export interface ApiUser {
  _id: string;
  username: string;
  email: string;
  // password is never returned in API responses
  __v?: number;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

// Vehicle Types (from vehicleSchema)
export interface ApiVehicle {
  _id: string;
  userId: string;
  make: string;
  carModel: string;
  color: string;
  year: number;
  odoRead: string;
  __v?: number;
}

export interface CreateVehicleRequest {
  make: string;
  carModel: string;
  color: string;
  year: number;
  odoRead: string;
}

export interface UpdateVehicleRequest extends Partial<CreateVehicleRequest> {}

// Build Types (from buildSchema)
export interface ApiBuild {
  _id: string;
  userId: string;
  carModel: string;
  color: string;
  selectedParts: string[];
  createdAt: string;
  __v?: number;
}

export interface CreateBuildRequest {
  carModel: string;
  color: string;
  selectedParts: string[];
}

export interface UpdateBuildRequest extends Partial<CreateBuildRequest> {}

// Service Types (from serviceSchema)
export interface ApiService {
  _id: string;
  name: string;
  description?: string;
  price: number;
  iconName?: string;
  createdAt: string;
  __v?: number;
}

export interface CreateServiceRequest {
  name: string;
  description?: string;
  price: number;
}

export interface UpdateServiceRequest extends Partial<CreateServiceRequest> {}

// Frontend Domain Types (what the UI uses - mapped from API types)
export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  followers?: number;
  following?: number;
}

export interface Vehicle {
  id: string;
  userId: string;
  make: string;
  carModel: string;
  color: string;
  year: number;
  odoRead: string;
}

export interface Build {
  _id: string;
  userId: string;
  carModel: string;
  color: string;
  selectedParts: string[];
  createdAt: string;
}

// Mapper functions to convert API types to Frontend types
export const mapApiUserToUser = (apiUser: ApiUser): User => ({
  _id: apiUser._id,
  name: apiUser.username,
  email: apiUser.email,
  avatarUrl: "/user-profile.png",
  bio: "Car enthusiast and professional modifier. Passionate about creating unique and high-performance vehicles.",
  followers: 0,
  following: 0,
});

export const mapApiVehicleToVehicle = (apiVehicle: ApiVehicle): Vehicle => ({
  id: apiVehicle._id,
  userId: apiVehicle.userId,
  make: apiVehicle.make,
  carModel: apiVehicle.carModel,
  color: apiVehicle.color,
  year: apiVehicle.year,
  odoRead: apiVehicle.odoRead,
});

export const mapApiBuildToBuild = (apiBuild: ApiBuild): Build => ({
  _id: apiBuild._id,
  userId: apiBuild.userId,
  carModel: apiBuild.carModel,
  color: apiBuild.color,
  selectedParts: apiBuild.selectedParts,
  createdAt: apiBuild.createdAt,
});

// Helper function to map icon names to components (for services)
import { Wrench, Car, ShieldCheck } from "lucide-react";

const getIconFromName = (iconName?: string) => {
  switch (iconName) {
    case "Car":
      return Car;
    case "ShieldCheck":
      return ShieldCheck;
    case "Wrench":
    default:
      return Wrench;
  }
};

export const mapApiServiceToService = (
  apiService: ApiService
): import("@/lib/constants").Service => ({
  id: apiService._id,
  name: apiService.name,
  description: apiService.description || "",
  price: `Starting from $${apiService.price}`,
  icon: getIconFromName(apiService.iconName),
});
