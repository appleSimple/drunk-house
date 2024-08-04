import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type UserStore = State & Action;

type State = {
  id: number;
  nick: string;
  gender: string;
  birth: string;
  userName: string;
  password: string;
}

type Action = {
  updateUserInfo: (state: State) => void;
  reset: () => void;
}

const initailState: State = {
  id: -1,
  nick: '',
  gender: '',
  birth: '',
  userName: '',
  password: '',
}

// Create your store, which includes both state and (optionally) actions
export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...initailState,
      updateUserInfo: (state: State) => set(state),
      reset: (() => set(initailState)),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)