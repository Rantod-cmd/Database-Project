import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Hospital {
    id: string;
    name: string;
    provinceId: string;
  }
  
interface AuthState {
    token: string | null;
    hospital: Hospital | null;
    login: (token: string, hospital: Hospital) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set)=>({
            token:null,
            hospital:null,

            login:(token,hospital) => {
                set({ token, hospital });
            },
            logout: () => {
                set({ token: null, hospital: null });
            },
        }),
            {
                name: 'auth-storage',
            }
    )
)

