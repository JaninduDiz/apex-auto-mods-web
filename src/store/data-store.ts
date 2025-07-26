import { create } from 'zustand';
import {
    hotCollections as mockHotCollections,
    regularCollections as mockRegularCollections,
    ongoingService as mockOngoingService,
    staticServices,
    activeServices as mockActiveServices,
    type HotCollection,
    type RegularCollection,
    type Build,
    type Service,
    type ActiveService,
    type UserVehicle,
} from '@/lib/constants';
import { api } from '@/lib/api';

type NewVehicle = Omit<UserVehicle, 'id' | 'userId'>;
type NewBuild = Omit<Build, '_id' | 'createdAt' | 'userId'>;


interface DataState {
    hotCollections: HotCollection[];
    regularCollections: RegularCollection[];
    ongoingService: typeof mockOngoingService;
    builds: Build[];
    services: Service[];
    activeServices: ActiveService[];
    userVehicles: UserVehicle[];
    isLoading: boolean;
    isLoadingBuilds: boolean;
    isLoadingVehicles: boolean;
    fetchDashboardData: () => Promise<void>;
    fetchBuilds: () => Promise<void>;
    fetchServices: () => Promise<void>;
    fetchUserVehicles: () => Promise<void>;
    getBuildById: (id: string) => Build | undefined;
    getActiveServiceById: (id: string) => ActiveService | undefined;
    saveBuild: (build: NewBuild, buildId?: string) => Promise<void>;
    addVehicle: (vehicle: NewVehicle) => Promise<void>;
}

const useDataStore = create<DataState>((set, get) => ({
    hotCollections: [],
    regularCollections: [],
    ongoingService: { isSerivceInProgress: false, id: '', carModel: '', service: '', progress: 0, image: '' },
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
        await new Promise(resolve => setTimeout(resolve, 500));
        set({
            hotCollections: mockHotCollections,
            regularCollections: mockRegularCollections,
            isLoading: false,
        });
    },
    
    fetchBuilds: async () => {
        set({ isLoadingBuilds: true });
        try {
            const response = await api.get('/builds/user');
            set({ builds: response.data, isLoadingBuilds: false });
        } catch (error) {
            console.error("Failed to fetch builds:", error);
            set({ isLoadingBuilds: false });
        }
    },

    fetchServices: async () => {
        set({ isLoading: true });
        // This data remains mocked as per requirements
        await new Promise(resolve => setTimeout(resolve, 500));
        set({ 
            services: staticServices, 
            activeServices: mockActiveServices, 
            ongoingService: mockOngoingService,
            isLoading: false 
        });
    },

    fetchUserVehicles: async () => {
        set({ isLoadingVehicles: true });
        try {
            const response = await api.get('/vehicles/user');
            set({ userVehicles: response.data, isLoadingVehicles: false });
        } catch (error) {
            console.error("Failed to fetch user vehicles:", error);
            set({ isLoadingVehicles: false });
        }
    },
    
    addVehicle: async (vehicle) => {
        try {
            const response = await api.post('/vehicles', vehicle);
            const newVehicle = response.data.vehicle;
            set(state => ({
                userVehicles: [...state.userVehicles, newVehicle],
            }));
        } catch (error) {
            console.error("Failed to add vehicle", error);
            throw error;
        }
    },

    getBuildById: (id: string) => {
        return get().builds.find(build => build._id === id);
    },
    
    getActiveServiceById: (id: string) => {
        return get().activeServices.find(service => service.id === id);
    },
    
    saveBuild: async (buildToSave, buildId) => {
        if (buildId && buildId !== 'new') {
            // Update existing build
            const response = await api.put(`/builds/${buildId}`, buildToSave);
            const updatedBuild = response.data.build;
            set(state => ({
                builds: state.builds.map(b => b._id === buildId ? updatedBuild : b),
            }));
        } else {
            // Create new build
            const response = await api.post('/builds', buildToSave);
            const newBuild = response.data.build;
            set(state => ({
                builds: [...state.builds, newBuild],
            }));
        }
    }

}));

export { useDataStore, type NewVehicle };
