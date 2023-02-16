import create from "zustand";

interface ILayoutStore {
    isNavbarMenu: boolean;
    theme: "light" | "dark";
    openNavbarMenu: () => void;
    closeNavbarMenu: () => void;
    toggleTheme: () => void;
}

const useLayoutStore = create<ILayoutStore>((set) => ({
    isNavbarMenu: false,
    theme: "light",

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
}));

export default useLayoutStore;
