import { create } from "zustand";
import {
  hotCollections as mockHotCollections,
  regularCollections as mockRegularCollections,
  ongoingService as mockOngoingService,
  activeServices as mockActiveServices,
  type HotCollection,
  type RegularCollection,
  type Service,
  type ActiveService,
} from "@/lib/constants";
import { api } from "@/lib/api";
import type {
  ApiResponse,
  ApiVehicle,
  ApiBuild,
  ApiService,
  CreateVehicleRequest,
  UpdateVehicleRequest,
  CreateBuildRequest,
  UpdateBuildRequest,
  Vehicle,
  Build,
} from "@/types/api";
import {
  mapApiVehicleToVehicle,
  mapApiBuildToBuild,
  mapApiServiceToService,
} from "@/types/api";

type NewVehicle = CreateVehicleRequest;
type NewBuild = CreateBuildRequest;

interface DataState {
  hotCollections: HotCollection[];
  regularCollections: RegularCollection[];
  ongoingService: typeof mockOngoingService;
  builds: Build[];
  services: Service[];
  activeServices: ActiveService[];
  userVehicles: Vehicle[];
  pendingBookings: any[];
  isLoading: boolean;
  isLoadingBuilds: boolean;
  isLoadingVehicles: boolean;
  fetchDashboardData: () => Promise<void>;
  fetchBuilds: () => Promise<void>;
  fetchServices: () => Promise<void>;
  fetchUserVehicles: () => Promise<void>;
  getBuildById: (id: string) => Build | undefined;
  getVehicleById: (id: string) => Vehicle | undefined;
  getActiveServiceById: (id: string) => ActiveService | undefined;
  saveBuild: (build: NewBuild, buildId?: string) => Promise<void>;
  deleteBuild: (buildId: string) => Promise<void>;
  addVehicle: (vehicle: NewVehicle) => Promise<void>;
  updateVehicle: (
    vehicleId: string,
    vehicle: Partial<NewVehicle>
  ) => Promise<void>;
  deleteVehicle: (vehicleId: string) => Promise<void>;
  addServiceBooking: (booking: any) => void;
  clearUserData: () => void;
}

const useDataStore = create<DataState>((set, get) => ({
  hotCollections: [],
  regularCollections: [],
  ongoingService: {
    isSerivceInProgress: false,
    id: "",
    carModel: "",
    service: "",
    progress: 0,
    image: "",
  },
  builds: [],
  services: [],
  activeServices: [],
  userVehicles: [],
  pendingBookings: [],
  isLoading: false,
  isLoadingBuilds: false,
  isLoadingVehicles: false,

  fetchDashboardData: async () => {
    set({ isLoading: true });
    // This data remains mocked
    await new Promise((resolve) => setTimeout(resolve, 500));
    set({
      hotCollections: mockHotCollections,
      regularCollections: mockRegularCollections,
      isLoading: false,
    });
  },

  fetchBuilds: async () => {
    set({ isLoadingBuilds: true });
    try {
      // Get current user ID for client-side filtering
      const { useUserStore } = await import("./user-store");
      const currentUser = useUserStore.getState().user;

      const response = await api.get<ApiResponse<ApiBuild[]>>("/builds");
      const apiBuilds = response.data.data;
      const builds = apiBuilds.map(mapApiBuildToBuild);

      // Filter builds by current user ID as an additional safeguard
      const userBuilds = currentUser
        ? builds.filter((build) => build.userId === currentUser._id)
        : [];

      set({ builds: userBuilds, isLoadingBuilds: false });
    } catch (error) {
      console.error("Failed to fetch builds:", error);
      set({ builds: [], isLoadingBuilds: false });
    }
  },

  fetchServices: async () => {
    set({ isLoading: true });
    try {
      // Fetch services from API using the configured api instance with proper typing
      const response = await api.get<ApiResponse<ApiService[]>>("/services");
      const apiServices = response.data.data || response.data || [];

      // Ensure we have an array
      if (!Array.isArray(apiServices)) {
        throw new Error("API response is not an array");
      }

      // Map API services to frontend Service type using the mapper
      const services = apiServices.map(mapApiServiceToService);

      set({
        services,
        activeServices: mockActiveServices, // Keep mocked for now
        ongoingService: mockOngoingService, // Keep mocked for now
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch services from API:", error);
      // Fallback to empty array on error - services will be loaded from API
      set({
        services: [],
        activeServices: mockActiveServices,
        ongoingService: mockOngoingService,
        isLoading: false,
      });
    }
  },

  fetchUserVehicles: async () => {
    set({ isLoadingVehicles: true });
    try {
      // Get current user ID for client-side filtering
      const { useUserStore } = await import("./user-store");
      const currentUser = useUserStore.getState().user;

      const response = await api.get<ApiResponse<ApiVehicle[]>>("/vehicles");
      const apiVehicles = response.data.data;
      const vehicles = apiVehicles.map(mapApiVehicleToVehicle);

      // Filter vehicles by current user ID as an additional safeguard
      const userVehicles = currentUser
        ? vehicles.filter((vehicle) => vehicle.userId === currentUser._id)
        : [];

      set({ userVehicles, isLoadingVehicles: false });
    } catch (error) {
      console.error("Failed to fetch user vehicles:", error);
      set({ userVehicles: [], isLoadingVehicles: false });
    }
  },

  addVehicle: async (vehicle) => {
    try {
      const response = await api.post<ApiResponse<ApiVehicle>>(
        "/vehicles",
        vehicle
      );
      const apiVehicle = response.data.data;
      const newVehicle = mapApiVehicleToVehicle(apiVehicle);
      set((state) => ({
        userVehicles: [...state.userVehicles, newVehicle],
      }));
    } catch (error) {
      console.error("Failed to add vehicle", error);
      throw error;
    }
  },

  getBuildById: (id: string) => {
    return get().builds.find((build) => build._id === id);
  },

  getVehicleById: (id: string) => {
    return get().userVehicles.find((vehicle) => vehicle.id === id);
  },

  getActiveServiceById: (id: string) => {
    return get().activeServices.find((service) => service.id === id);
  },

  saveBuild: async (buildToSave, buildId) => {
    if (buildId && buildId !== "new") {
      // Update existing build
      const response = await api.put<ApiResponse<ApiBuild>>(
        `/builds/${buildId}`,
        buildToSave
      );
      const apiUpdatedBuild = response.data.data;
      const updatedBuild = mapApiBuildToBuild(apiUpdatedBuild);
      set((state) => ({
        builds: state.builds.map((b) => (b._id === buildId ? updatedBuild : b)),
      }));
    } else {
      // Create new build
      const response = await api.post<ApiResponse<ApiBuild>>(
        "/builds",
        buildToSave
      );
      const apiNewBuild = response.data.data;
      const newBuild = mapApiBuildToBuild(apiNewBuild);
      set((state) => ({
        builds: [...state.builds, newBuild],
      }));
    }
  },

  deleteBuild: async (buildId) => {
    try {
      await api.delete(`/builds/${buildId}`);
      set((state) => ({
        builds: state.builds.filter((b) => b._id !== buildId),
      }));
    } catch (error) {
      console.error("Failed to delete build:", error);
      throw error;
    }
  },

  updateVehicle: async (vehicleId, vehicleUpdate) => {
    try {
      const response = await api.put<ApiResponse<ApiVehicle>>(
        `/vehicles/${vehicleId}`,
        vehicleUpdate
      );
      const apiUpdatedVehicle = response.data.data;
      const updatedVehicle = mapApiVehicleToVehicle(apiUpdatedVehicle);
      set((state) => ({
        userVehicles: state.userVehicles.map((v) =>
          v.id === vehicleId ? updatedVehicle : v
        ),
      }));
    } catch (error) {
      console.error("Failed to update vehicle:", error);
      throw error;
    }
  },

  deleteVehicle: async (vehicleId) => {
    try {
      await api.delete(`/vehicles/${vehicleId}`);
      set((state) => ({
        userVehicles: state.userVehicles.filter((v) => v.id !== vehicleId),
      }));
    } catch (error) {
      console.error("Failed to delete vehicle:", error);
      throw error;
    }
  },

  addServiceBooking: (booking) => {
    set((state) => ({
      pendingBookings: [...state.pendingBookings, booking],
    }));
    // Also store in localStorage as backup
    const existingBookings = JSON.parse(
      localStorage.getItem("serviceBookings") || "[]"
    );
    existingBookings.push(booking);
    localStorage.setItem("serviceBookings", JSON.stringify(existingBookings));
  },

  clearUserData: () => {
    set({
      builds: [],
      userVehicles: [],
      pendingBookings: [],
      hotCollections: [],
      regularCollections: [],
      ongoingService: {
        isSerivceInProgress: false,
        id: "",
        carModel: "",
        service: "",
        progress: 0,
        image: "",
      },
    });
  },
}));

export { useDataStore, type NewVehicle };
