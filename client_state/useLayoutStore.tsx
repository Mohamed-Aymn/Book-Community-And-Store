import create from "zustand";

interface ILayoutStore {
    isNavbarMenu: boolean;
    theme: "light" | "dark";
    isChangingRoute: boolean;
    openNavbarMenu: () => void;
    closeNavbarMenu: () => void;
    toggleTheme: () => void;
    toggleChangingRoute: () => void;
}

const useLayoutStore = create<ILayoutStore>((set) => ({
    isNavbarMenu: false,
    theme: "light",
    isChangingRoute: false,

    // actions
    closeNavbarMenu: () => {
        // type conditions here to check if there is not suggestions and etc
        set(() => ({ isNavbarMenu: false }));
    },
    openNavbarMenu: () => {
        set(() => ({ isNavbarMenu: true }));
    },
    toggleTheme: () => {
        set((state) =>
            state.theme === "light" ? { theme: "dark" } : { theme: "light" }
        );
    },
    toggleChangingRoute: () => {
        set((state) =>
            state.isChangingRoute
                ? { isChangingRoute: false }
                : { isChangingRoute: true }
        );
    },
}));

export default useLayoutStore;
