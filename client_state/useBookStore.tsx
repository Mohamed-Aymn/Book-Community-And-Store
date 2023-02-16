import create from "zustand";

interface IBookStore {
    id: any;
    modal: boolean;
    searchResult: any;
    searchPagination: number;
    mainSearch: string;
    searchQuery: "search" | "intitle" | "inauthor";
    searchFilters: any;
    isDisplayingBookDetails: boolean;
    displayedBookId: any;

    setSearchFilters: (newValue: any) => void;
    setSearchQuery: (newValue: "search" | "intitle" | "inauthor") => void;
    setMainSearch: (newValue: string) => void;
    setSearchPagination: (pageNumber: number) => void;
    setSearchResult: (data: any) => void;
    setId: (newId: any) => void;
    setDisplayedBookId: (id: any) => void;
    setDisplayingBookDetails: (newValue: boolean) => void;
}

const useBookStore = create<IBookStore>()((set) => ({
    id: "newId",
    modal: false,
    searchResult: null,
    searchPagination: 1,
    mainSearch: "",
    // it should be (search, intitle, inauthor or genre)
    searchQuery: "search",
    searchFilters: {
        lang: "en",
    },
    isDisplayingBookDetails: false,
    displayedBookId: null,

    // actions
    setSearchFilters: (newValue) => {
        set(() => ({ searchFilters: newValue }));
    },
    setSearchQuery: (newValue) => {
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
    setId: (newId: any) => {
        set(() => ({
            id: newId,
        }));
    },
    setDisplayedBookId: (id: any) => {
        set(() => ({
            displayedBookId: id,
        }));
    },
    setDisplayingBookDetails: (newValue: any) => {
        set(() => ({
            isDisplayingBookDetails: newValue,
        }));
        newValue
            ? (document.body.style.overflowY = "hidden")
            : (document.body.style.overflowY = "scroll");
    },
}));

export default useBookStore;
