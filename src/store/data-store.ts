
import { create } from 'zustand';
import {
    hotCollections as mockHotCollections,
    regularCollections as mockRegularCollections,
    ongoingService as mockOngoingService,
    mockBuilds,
    staticServices,
    activeServices as mockActiveServices,
    mockUserVehicles,
    type HotCollection,
    type RegularCollection,
    type Build,
    type Service,
    type ActiveService,
    type UserVehicle,
} from '@/lib/constants';

type NewVehicle = Omit<UserVehicle, 'id'>;

interface DataState {
    hotCollections: HotCollection[];
    regularCollections: RegularCollection[];
    ongoingService: typeof mockOngoingService;
    builds: Build[];
    services: Service[];
    activeServices: ActiveService[];
    userVehicles: UserVehicle[];
    isLoading: boolean;
    isLoadingVehicles: boolean;
    fetchDashboardData: () => Promise<void>;
    fetchBuilds: () => Promise<void>;
    fetchServices: () => Promise<void>;
    fetchUserVehicles: () => Promise<void>;
    getBuildById: (id: string) => Build | undefined;
    getActiveServiceById: (id: string) => ActiveService | undefined;
    saveBuild: (build: Omit<Build, 'createdAt'> & { createdAt?: string }) => Promise<void>;
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
    isLoadingVehicles: true,

    fetchDashboardData: async () => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        set({
            hotCollections: mockHotCollections,
            regularCollections: mockRegularCollections,
            isLoading: false,
        });
    },
    
    fetchBuilds: async () => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 500));
        set({ builds: mockBuilds, isLoading: false });
    },

    fetchServices: async () => {
        set({ isLoading: true });
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
        await new Promise(resolve => setTimeout(resolve, 500));
        set({ userVehicles: mockUserVehicles, isLoadingVehicles: false });
    },
    
    addVehicle: async (vehicle) => {
        set({ isLoadingVehicles: true });
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
        const newVehicle = { ...vehicle, id: `v${Date.now()}` };
        set(state => ({
            userVehicles: [...state.userVehicles, newVehicle],
            isLoadingVehicles: false
        }));
    },


    getBuildById: (id: string) => {
        return get().builds.find(build => build._id === id);
    },
    
    getActiveServiceById: (id: string) => {
        return get().activeServices.find(service => service.id === id);
    },
    
    saveBuild: async (buildToSave) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
        
        set(state => {
            const existingBuildIndex = state.builds.findIndex(b => b._id === buildToSave._id);
            let updatedBuilds = [...state.builds];
            
            const finalBuild: Build = {
                ...buildToSave,
                createdAt: buildToSave.createdAt || new Date().toISOString()
            }

            if (existingBuildIndex > -1) {
                // Update existing build
                updatedBuilds[existingBuildIndex] = finalBuild;
            } else {
                // Add new build
                updatedBuilds.push(finalBuild);
            }
            // In a real app, you might re-fetch or just update the state
            return { builds: updatedBuilds, isLoading: false };
        });
    }

}));

export { useDataStore, type NewVehicle };

