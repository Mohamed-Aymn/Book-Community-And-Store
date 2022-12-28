import create from "zustand";

export const layoutStore = create((set) => ({
    isDisplayingBookDetails: false,
    bookDetails: null,
    id: "newId",

    setId: (newId: any) => {
        set(() => ({
            id: newId,
        }));
    },
    setBookDetials: (props: any) => {
        set(() => ({
            bookDetails: props,
        }));
    },
    setDisplayingBookDetails: (value: any) => {
        set(() => ({
            isDisplayingBookDetails: value,
        }));
        value
            ? (document.body.style.overflowY = "hidden")
            : (document.body.style.overflowY = "scroll");
    },
}));
