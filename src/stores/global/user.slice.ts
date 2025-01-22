import { StateCreator } from "zustand";


import { UserLogin, UserType } from "../../types/user.type";
import { UserService } from "../../lib/services";

export interface UserState {
  user: UserType | null;
  loadingUser: boolean;
  userLoaded: boolean;
  errorUser: boolean;
}

export interface UserActions {
  registerUser: (user: UserType) => Promise<void>;
  loginUser: (user: UserLogin) => Promise<void>;
  setErrorCargaDatos: (val: boolean) => void;
  resetCargaDatosState: () => void;
}

export type UserSlice = UserState & UserActions;

const initialState: UserState = {
  user: null,
  loadingUser: false,
  userLoaded: false,
  errorUser: false,
};

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  ...initialState,
  resetCargaDatosState: () => set({ ...initialState }),
  setErrorCargaDatos: (errorUser: boolean) => set({ errorUser }),
  registerUser: async (user: UserType) => {
    set({ loadingUser: true });
    try {
      const { data }: { data: UserType } = await UserService.registerUser(user);
      set({
        user: data,
        userLoaded: true,
      });
    } catch (error) {
      set({ errorUser: true });
    } finally {
      set({ loadingUser: false });
    }
  },
  loginUser: async (user: UserLogin) => {
    set({ loadingUser: true });
    try {
      const { data }: { data: UserType } = await UserService.loginUser(user);
      set({
        user: data,
        userLoaded: true,
      });
    } catch (error) {
      set({ errorUser: true });
    //   if (error instanceof PersonaError) {
    //     navigate("/error-persona", { replace: true });
    //   } else {
    //     navigate("/error-tecnico", { replace: true });
    //   }
    } finally {
      set({ loadingUser: false });
    }
  },
});
