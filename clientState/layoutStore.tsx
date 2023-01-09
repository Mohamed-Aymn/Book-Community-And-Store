import create from "zustand";

export const layoutStore = create((set) => ({
    isDisplayingBookDetails: false,
    bookDetails: null,
    id: "newId",
    theme: "light",

    toggleTheme: (theme: string) => {
        theme === "light"
            ? set(() => ({
                  theme: "dark",
              }))
            : set(() => ({
                  theme: "light",
              }));
    },
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
