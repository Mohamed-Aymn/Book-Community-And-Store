import create from "zustand";

export const layoutStore = create((set) => ({
    isDisplayingBookDetails: false,
    isDisplayingHeroSection: false,

    displayedBookId: null,
    setDisplayedBookId: (id: any) => {
        set(() => ({
            displayedBookId: id,
        }));
    },

    id: "newId",
    theme: "light",
    isNavbarMenu: false,
    modal: false,
    searchResult: null,
    searchPagination: 1,
    mainSearch: "",
    // it should be (search, intitle, inauthor or genre)
    searchQuery: "search",
    searchFilters: {
        lang: "en",
    },

    setSearchFilters: (newValue: any) => {
        set(() => ({ searchFilters: newValue }));
    },
    setSearchQuery: (newValue: any) => {
        set(() => ({ searchQuery: newValue }));
    },

    setMainSearch: (newValue: any) => {
        set(() => ({ mainSearch: newValue }));
    },
    setSearchPagination: (pageNumber: any) => {
        set(() => ({ searchPagination: pageNumber }));
    },
    setSearchResult: (data: any) => {
        set(() => ({ searchResult: data }));
    },

    closeNavbarMenu: () => {
        set(() => ({ isNavbarMenu: false }));
    },
    openNavbarMenu: () => {
        set(() => ({ isNavbarMenu: true }));
    },

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

    setDisplayingBookDetails: (value: any) => {
        set(() => ({
            isDisplayingBookDetails: value,
        }));
        value
            ? (document.body.style.overflowY = "hidden")
            : (document.body.style.overflowY = "scroll");
    },

    // globalSearchQueryFunction: null,
    // setGlobalSearchQueryFunction: (fun: () => void) => {
    //     set(()=> ({
    //         globalSearchQueryFunction: fun,
    //     }))
    // },
}));
