import create from "zustand";

export const layoutStore = create((set) => ({
    isDisplayingBookDetails: false,

    switchDisplayingBookDetails: (isDisplayingBookDetails: any) => {
        set((state: any) => ({
            isDisplayingBookDetails: !state.isDisplayingBookDetails,
        }));
        isDisplayingBookDetails
            ? (document.body.style.overflowY = "scroll")
            : (document.body.style.overflow = "hidden");
    },
}));
