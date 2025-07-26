import { create } from "zustand";
import {
  hotCollections as mockHotCollections,
  regularCollections as mockRegularCollections,
  ongoingService as mockOngoingService,
  staticServices,
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
  CreateVehicleRequest,
  UpdateVehicleRequest,
  CreateBuildRequest,
  UpdateBuildRequest,
  Vehicle,
  Build,
} from "@/types/api";
import { mapApiVehicleToVehicle, mapApiBuildToBuild } from "@/types/api";

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
  isLoading: true,
  isLoadingBuilds: true,
  isLoadingVehicles: true,

  fetchDashboardData: async () => {
    set({ isLoading: true });
    // This data remains mocked as per requirements
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
      const response = await api.get<ApiResponse<ApiBuild[]>>("/builds");
      const apiBuilds = response.data.data;
      const builds = apiBuilds.map(mapApiBuildToBuild);
      set({ builds, isLoadingBuilds: false });
    } catch (error) {
      console.error("Failed to fetch builds:", error);
      set({ builds: [], isLoadingBuilds: false });
    }
  },

  fetchServices: async () => {
    set({ isLoading: true });
    // This data remains mocked as per requirements
    await new Promise((resolve) => setTimeout(resolve, 500));
    set({
      services: staticServices,
      activeServices: mockActiveServices,
      ongoingService: mockOngoingService,
      isLoading: false,
    });
  },

  fetchUserVehicles: async () => {
    set({ isLoadingVehicles: true });
    try {
      const response = await api.get<ApiResponse<ApiVehicle[]>>("/vehicles");
      const apiVehicles = response.data.data;
      const vehicles = apiVehicles.map(mapApiVehicleToVehicle);
      set({ userVehicles: vehicles, isLoadingVehicles: false });
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
}));

export { useDataStore, type NewVehicle };
